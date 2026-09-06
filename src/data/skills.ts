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

// Certification entry — supports optional badge SVG, issuer, date, and
// a `featured` flag so the home page can single out the primary
// IBM Systems & Solutions Architect certificate.
export type Certification = {
  name: string;
  web: string;
  badge?: string;     // optional SVG badge path
  issuer?: string;
  date?: string;
  featured?: boolean;
};

export const certifications: Certification[] = [
  // IBM Systems and Solutions Architect Professional Certificate — the main one
  {
    name: "IBM Systems and Solutions Architect Professional Certificate",
    web: "https://www.coursera.org/account/accomplishments/professional-cert/TXAU4QH2YPA8",
    badge: "/assets/badges/ibm-logo.svg",
    issuer: "IBM",
    date: "Sept. 2026",
    featured: true,
  },
  // Credly badges
  {
    name: "Cloud Native, Microservices, Containers, DevOps, and Agile",
    web: "https://www.credly.com/badges/a6335c91-df87-4ea9-afc7-e021464b82c6",
    badge: "/assets/badges/cloud-native-devops.png",
    issuer: "IBM",
    date: "Sept. 2026",
  },
  {
    name: "Introduction to Systems Architecture",
    web: "https://www.credly.com/badges/018035dc-1402-455b-8e8d-e6a1c6210135",
    badge: "/assets/badges/intro-systems-architecture.png",
    issuer: "IBM",
    date: "Aug. 2026",
  },
  {
    name: "Software Systems: Testing, Deployment, and Maintenance (V2)",
    web: "https://www.credly.com/badges/8c78a312-44be-4541-8102-8e88c38124bf",
    badge: "/assets/badges/software-systems-testing.png",
    issuer: "IBM",
    date: "Sept. 2026",
  },
  // Coursera / SkillUp Online (IBM is partner, use IBM logo)
  {
    name: "Business Process Modeling, Analysis, and Improvement",
    web: "https://coursera.org/share/9b22e18c35620224d9685b0ba05cb05f",
    badge: "/assets/badges/ibm-logo.svg",
    issuer: "SkillUp Online",
    date: "Sept. 2026",
  },
  {
    name: "IT Systems Design and Analysis",
    web: "https://coursera.org/share/8d00378a220aa349fd5f5963fb014a18",
    badge: "/assets/badges/ibm-logo.svg",
    issuer: "SkillUp Online",
    date: "Aug. 2026",
  },
  // University of Alberta
  {
    name: "Software Processes and Agile Practices",
    web: "https://coursera.org/share/c42432aa370e50eb5448c6cf75b3d024",
    badge: "/assets/badges/ualberta.png",
    issuer: "University of Alberta",
    date: "Sept. 2026",
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