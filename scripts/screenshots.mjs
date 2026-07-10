#!/usr/bin/env node
/**
 * Regenerate template-banner screenshots for the README and the
 * astro.build/templates listing.
 *
 * Pipeline:
 *   1. `astro build` to produce ./dist (already runs in CI; we redo
 *      here to keep the script self-contained).
 *   2. `astro preview` on a local port so we can hit the static site.
 *   3. Launch Chromium with Playwright against the three EN pages.
 *   4. Save 1200x630 PNGs as sibling files (`home.png`, `blog.png`,
 *      `portfolio.png`) next to the SVG mockups in
 *      `public/screenshots/`.
 *
 * Requirements:
 *   - `playwright` listed as a devDependency (see package.json)
 *   - `npx playwright install chromium` once before the first run
 *
 * Usage:
 *   pnpm screenshots                # default: en pages, light + dark
 *   pnpm screenshots -- --locale=es # switch locale
 *   pnpm screenshots -- --theme=dark
 *
 * The script exits non-zero on any navigation/screenshot error so it
 * can be wired into CI as a guard for the README's image links.
 */
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(repoRoot, "dist");
const outDir = path.join(repoRoot, "public", "screenshots");

// CLI flag parsing (no extra deps)
const args = process.argv.slice(2);
const getFlag = (name, defaultValue) => {
  const match = args.find((a) => a.startsWith(`--${name}=`));
  return match ? match.split("=").slice(1).join("=") : defaultValue;
};
const locale = getFlag("locale", "en");
const theme = getFlag("theme", "light");
const viewport = { width: 1200, height: 630 };

const pages = [
  { src: "home.svg", path: `/${locale}/` },
  { src: "blog.svg", path: `/${locale}/blog/` },
  { src: "portfolio.svg", path: `/${locale}/portfolio/` },
];

/** `astro build` then `astro preview` on a fixed port so we don't have to
 *  scan for free ports.  We don't error if dist already exists: build
 *  is fast and re-running picks up content edits. */
function build() {
  return new Promise((resolve, reject) => {
    const child = spawn("pnpm", ["run", "build"], {
      cwd: repoRoot,
      stdio: "inherit",
      shell: true,
    });
    child.on("exit", (code) =>
      code === 0
        ? resolve()
        : reject(new Error(`astro build exited with code ${code}`))
    );
  });
}

function preview() {
  return new Promise((resolve, reject) => {
    const child = spawn("pnpm", ["exec", "astro", "preview", "--port", "4322"], {
      cwd: repoRoot,
      stdio: ["ignore", "pipe", "pipe"],
      shell: true,
    });
    // astro preview is ready when its first "Local" line prints.
    const onLine = (chunk) => {
      const s = chunk.toString();
      process.stdout.write(`[preview] ${s}`);
      if (s.includes("http://localhost:4322")) {
        child.stdout.off("data", onLine);
        resolve(child);
      }
    };
    child.stdout.on("data", onLine);
    child.stderr.on("data", (c) => process.stderr.write(`[preview] ${c}`));
    child.on("exit", (code) =>
      code !== 0 && code !== null
        ? reject(new Error(`astro preview exited early with code ${code}`))
        : undefined
    );
  });
}

async function capture() {
  await fs.mkdir(outDir, { recursive: true });
  const browser = await chromium.launch();
  try {
    for (const page of pages) {
      const url = `http://localhost:4322${page.path}`;
      const ctx = await browser.newContext({
        viewport,
        colorScheme: theme,
        // Astro uses `prefers-color-scheme` + `localStorage` to resolve
        // the theme. Setting both keeps the first paint consistent
        // with what real users see.
        deviceScaleFactor: 1,
      });
      // Force the chosen theme on the very first paint.
      await ctx.addInitScript((t) => {
        try {
          localStorage.setItem("theme", t);
        } catch {}
      }, theme);
      const tab = await ctx.newPage();
      await tab.goto(url, { waitUntil: "networkidle" });
      // Give the JS that paints the nav/theme + lazy-loaded bg one beat.
      await tab.waitForTimeout(400);

      const target = path.join(outDir, page.src.replace(/\.svg$/, ".png"));
      await tab.screenshot({ path: target, fullPage: false });
      console.log(`✓ ${page.src.replace(/\.svg$/, ".png")} ← ${url}`);
      await ctx.close();
    }
  } finally {
    await browser.close();
  }
}

(async () => {
  await build();
  const server = await preview();
  try {
    await capture();
  } finally {
    server.kill("SIGTERM");
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
