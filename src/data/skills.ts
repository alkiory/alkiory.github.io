/**
 * Skill data for the About page.
 *
 * - `techSkills` is grouped by domain so the page can render each category
 *   with a label (translated via i18n) instead of dumping a flat list of words.
 * - `softSkills` carries an `id` (matched against an i18n entry) AND an `icon`
 *   so each card can render with the same icon-stage pattern used in
 *   `src/components/Skills.astro` on the home page.
 * - `education` is rich enough to render as a real entry (degree, dates,
 *   focus) — about.html used to show only the institution name.
 * - `languages` is `Array<{ language, level }>` so the level is rendered
 *   as a typographic fragment, not glued to the language string.
 */

import type { iconPaths } from "../components/ui/icon-path";

type IconName = keyof typeof iconPaths;

/**
 * The set of category `keys` used by both `techSkills` and the
 * `about.techSkillCategories` translations. Iterating this list
 * (instead of `Object.entries(techSkills)`) keeps the i18n lookup
 * strictly typed and avoids string-key casts on the hot path.
 */
export const techSkillKeys = [
  "frontend",
  "backend",
  "testing",
  "devops",
  "design",
  "tools",
  "intelligenceArtificial",
] as const;

export type TechSkillKey = (typeof techSkillKeys)[number];

export const techSkills: Record<TechSkillKey, string[]> = {
  frontend: [
    "TypeScript",
    "React",
    "Angular",
    "Redux",
    "Next.js",
    "Astro",
    "React Query",
    "React Native",
  ],
  backend: ["Node.js", "NestJS", "Python", "SQL", "NoSQL", "REST", "GraphQL"],
  testing: ["Jest", "Playwright", "React Testing Library"],
  devops: ["GitHub Actions", "Google Cloud", "AWS", "Firebase", "Docker"],
  design: ["Figma"],
  tools: ["Git", "GitHub", "VS Code", "Postman", "Bruno", "Antigravity", "Jira", "Slack", "Trello", "Confluence"],
  intelligenceArtificial: ["Github Copilot", "ChatGPT", "Gemini", "Claude", "DeepSeek", "LLaMA"],
};

export const softSkills: Array<{ id: string; icon: IconName }> = [
  { id: "leadership", icon: "trophy" },
  { id: "collaboration", icon: "users" },
  { id: "communication", icon: "paper-plane-tilt" },
  { id: "initiative", icon: "rocket-launch" },
  { id: "activeListening", icon: "microphone-stage" },
  { id: "empathy", icon: "heart" },
];

export const languages = [
  { language: "English", level: "B2" },
  { language: "Spanish", level: "Native" },
];

export const certifications = [
  {
    name: "Liderazgo para el desarrollo de proyectos de software",
    web: "https://www.linkedin.com/learning/certificates/fdc291aa371b819963965130d2e1babbba62b3601acb0d2bb3c00ef1f938d6a9",
  },
  {
    name: "Software Architecture: Domain Driven Design",
    web: "https://www.linkedin.com/learning/certificates/1d9a4306ed5ea970ebd5819b0ccc7f26704b94bbb50f371caaf7c1982e583b6b?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BIQut0IYCSf%2BiguDpES9cdQ%3D%3D",
  },
  {
    name: "English B2",
    web: "https://cert.efset.org/Dbe3Y5",
  },
  {
    name: "Fundamentos de Ingeniería de Software",
    web: "https://platzi.com/p/iamsergiocampbell/curso/1195-fundamentos-appsco/diploma/detalle/",
  },
];

export const education: Array<{
  id: string;
  degree: Record<"es" | "en", string>;
  institution: Record<"es" | "en", string>;
  dates: string;
  focus: Record<"es" | "en", string>;
}> = [
    {
      id: "politecnico",
      degree: { es: "Tecnologo en Desarrollo de Software", en: "Software Development Technologist" },
      institution: {
        es: "Universidad Politécnico de la Costa Atlántica",
        en: "Universidad Politécnico de la Costa Atlántica",
      },
      dates: "2014 — 2020",
      focus: {
        es: "Arquitectura de software, sistemas distribuidos e ingeniería web.",
        en: "Software architecture, distributed systems, and web engineering.",
      },
    },
    {
      id: "sena",
      degree: {
        es: "Técnico en Desarrollo de Software",
        en: "Software Development Technician",
      },
      institution: {
        es: "SENA Colombo Alemán",
        en: "SENA Colombo Alemán",
      },
      dates: "2011 — 2013",
      focus: {
        es: "Fundamentos backend, bases de datos y prácticas ágiles.",
        en: "Backend foundations, databases, and agile practices.",
      },
    },
  ];
