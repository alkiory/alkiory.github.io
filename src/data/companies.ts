/**
 * Localized payload for a single Experience entry. Literal shape (not
 * `Record<Lang, …>`) so the compiler forces BOTH locales to be present
 * when an entry is added or edited; a forgotten translation would
 * otherwise render `undefined` at runtime silently.
 */
export interface ExperienceDetails {
  bullets: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  /** One-paragraph card summary, rendered in the closed Timeline card. */
  summary: { es: string; en: string };
  /**
   * Optional long-form bullets, rendered inside a native `<details>`
   * accordion so SEO-rich copy is preserved without bloating the card.
   */
  details?: { es: ExperienceDetails; en: ExperienceDetails };
  link?: string;
}

export const experience: Experience[] = [
  {
    company: "Freelance",
    role: "Senior Fullstack Developer",
    period: "Oct 2018 - Present",
    summary: {
      es: "Desarrollo fullstack independiente con React, Angular y stacks modernos, enfocado en arquitectura escalable, diseño centrado en el usuario e integraciones front-back.",
      en: "Independent fullstack development with React, Angular, and modern stacks, focused on scalable architecture, user-centered design, and front-backend integrations.",
    },
    details: {
      es: {
        bullets: [
          "Contribuí a proyectos impactantes con React, Angular, HTML, CSS, Markdown, Git y GitHub entregando soluciones escalables y usables.",
          "Mejoré la arquitectura de software y diseño garantizando buenas prácticas en todo el ciclo de vida.",
          "Desarrollé interfaces responsivas con React y Redux, con foco en compatibilidad cross-browser y UX fluida.",
          "Actué como puente entre marketing y TI, integrando assets de frontend con sistemas backend.",
          "Apliqué buenas prácticas con Azure DevOps, optimizando la administración en la nube.",
        ],
      },
      en: {
        bullets: [
          "Contributed to impactful projects using React, Angular, HTML, CSS, Markdown, Git and GitHub, delivering scalable and user-friendly solutions.",
          "Improved software architecture and design, ensuring best practices across the full SDLC.",
          "Built responsive web/mobile features with React and Redux, with cross-browser focus.",
          "Acted as a key bridge between marketing and IT, integrating frontend assets with backend systems.",
          "Applied Azure DevOps best practices to optimize cloud administration workflows.",
        ],
      },
    },
    link: "https://alkiory.com",
  },
  {
    company: "CAS Training",
    role: "Senior Frontend Developer",
    period: "Jul 2025 - Jun 2026",
    summary: {
      es: "Frontend corporativo con React, TypeScript y Tailwind sobre monorepos Turborepo; testing con Vitest, validación con Zod y pipelines optimizados.",
      en: "Corporate frontend development with React, TypeScript, and Tailwind on Turborepo monorepos; testing with Vitest, Zod-backed validation, and optimized pipelines.",
    },
    details: {
      es: {
        bullets: [
          "Componentes complejos en React + TypeScript con gestión de estado vía Redux/Hooks para soluciones escalables.",
          "Testing robusto con Vitest, análisis estático y seguridad con SonarQube y Fortify.",
          "Interfaces responsivas con Tailwind, traduciendo prototipos de Figma con alta fidelidad.",
          "Monorepos con Turborepo, PNPM e i18n end-to-end.",
          "Validación de esquemas con Zod asegurando integridad en integraciones backend.",
          "Virtualización y artefactos gestionados con Nexus para optimizar CI/CD.",
        ],
      },
      en: {
        bullets: [
          "Complex React + TypeScript components with state via Redux/Hooks for scalable solutions.",
          "Robust Vitest test suites, static analysis and security with SonarQube and Fortify.",
          "Responsive UIs with Tailwind, translating Figma prototypes with high fidelity.",
          "Monorepos with Turborepo, PNPM, and full i18n.",
          "Zod schema validation ensuring backend integration integrity.",
          "Virtualization and Nexus-managed artifacts for optimized CI/CD.",
        ],
      },
    },
    link: "https://cas-training.com",
  },
  {
    company: "Private Company",
    role: "Senior Frontend Developer",
    period: "Ago 2024 - Feb 2025",
    summary: {
      es: "Frontend React/TypeScript con datos en tiempo real; optimizaciones de +25% en eficiencia con React-Query y mayor confiabilidad con PM2.",
      en: "React/TypeScript frontend with real-time data flows; +25% efficiency wins via React-Query and improved reliability with PM2 process supervision.",
    },
    details: {
      es: {
        bullets: [
          "Frontend con React + TypeScript a partir de diseños en Figma.",
          "Datos en tiempo real con React-Query y useContext: +25% en eficiencia de procesamiento y consultas.",
          "Monitoreo continuo con PM2 para diversificar ambientes y producción con mayor confiabilidad.",
          "Ciclo completo desde planificación hasta deploy, con documentación precisa e iteración continua.",
          "Soluciones escalables y de alto rendimiento optimizando flujos operativos.",
        ],
      },
      en: {
        bullets: [
          "React + TypeScript frontend built from Figma designs.",
          "Real-time data with React-Query and useContext: +25% in processing/query efficiency.",
          "Continuous PM2 monitoring for diversified staging/production and higher reliability.",
          "Full lifecycle ownership from planning to deploy, with crisp docs and iterative improvements.",
          "Scalable, high-performance solutions optimizing operational workflows.",
        ],
      },
    },
  },
  {
    company: "Bchange",
    role: "Senior Frontend Developer",
    period: "Ene 2024 - Jul 2024",
    summary: {
      es: "Liderazgo frontend en React/TypeScript sobre AWS; +15% en satisfacción de usuario y +25% en confiabilidad, con IA generativa para acelerar entregas.",
      en: "Frontend leadership with React/TypeScript on AWS; +15% user satisfaction and +25% reliability gains, leveraging generative AI tooling to ship faster.",
    },
    details: {
      es: {
        bullets: [
          "Coordinación de equipos para entregar software de alta calidad a tiempo.",
          "Frontend con React.js + TypeScript mejorando la interacción de usuario.",
          "Mantenimiento y escalabilidad: +25% en confiabilidad del sistema.",
          "Integración de APIs de terceros optimizando interacciones servidor-aplicación.",
          "Mejoras de UI con HTML/CSS/JS: +15% en satisfacción del usuario.",
          "Despliegues y operaciones con AWS garantizando tiempo de actividad.",
          "Procesos ágiles, control de versiones y documentación clara.",
          "IA generativa para acelerar el desarrollo y mejorar la eficiencia.",
        ],
      },
      en: {
        bullets: [
          "Coordinated dev teams to deliver high-quality software on time.",
          "React.js + TypeScript frontend improvements yielding smoother UX.",
          "Maintenance and scalability: +25% system reliability.",
          "Third-party API integration optimizing server-app interactions.",
          "UI improvements with HTML/CSS/JS: +15% user satisfaction.",
          "AWS deployments/ops with uptime guarantees.",
          "Agile process, version control, and clear documentation.",
          "Generative AI tooling to accelerate dev and improve efficiency.",
        ],
      },
    },
    link: "https://bchange.es",
  },
  {
    company: "Evolution Code",
    role: "Senior Frontend Developer",
    period: "Dic 2022 - Dic 2023",
    summary: {
      es: "Tech lead con React/Next.js/TypeScript; entrega a tiempo, mentoría de equipo y pipelines de commit automatizados que redujeron el ciclo un 20%.",
      en: "Tech lead with React/Next.js/TypeScript; on-time delivery, team mentoring, and automated commit pipelines that cut cycle time by 20%.",
    },
    details: {
      es: {
        bullets: [
          "Gestión de múltiples proyectos como líder de equipo bajo presupuesto y plazos.",
          "Habilidades de comunicación, liderazgo y resolución de problemas.",
          "Apps con React, Redux, Next.js, TypeScript, Husky, Jest, JS, HTML, Git y Terminal.",
          "Pipelines de commit/push con validaciones automáticas: -20% en tiempo de ciclo.",
          "Mejores prácticas de frontend y calidad de código.",
          "Mejoras continuas de procesos y entrega innovadora al cliente.",
        ],
      },
      en: {
        bullets: [
          "Multi-project team leadership within budget and schedule.",
          "Communication, leadership, and problem-solving skills.",
          "Apps with React, Redux, Next.js, TypeScript, Husky, Jest, JS, HTML, Git, Terminal.",
          "Commit/push pipelines with automated checks: -20% cycle time.",
          "Frontend best practices and code quality.",
          "Continuous process improvements and client-driven innovation.",
        ],
      },
    },
    link: "https://evolutioncode.io",
  },
  {
    company: "Zemoga",
    role: "Frontend Developer",
    period: "Jun 2022 - Mar 2023",
    summary: {
      es: "Frontend ágil con Angular/React sobre AWS, traduciendo Figma a interfaces multiplataforma con estándares altos de calidad.",
      en: "Agile frontend work with Angular/React on AWS, translating Figma into cross-platform interfaces under tight delivery deadlines.",
    },
    details: {
      es: {
        bullets: [
          "Validación de propuestas creativas alineadas a mejores prácticas de diseño.",
          "SDLC ágil con iteraciones rápidas y de alta calidad.",
          "Trabajo conjunto con ventas, servicio al cliente y diseño.",
          "Código bien probado y documentado, mayor mantenibilidad.",
          "Features multiplataforma en Angular y React (HTML/CSS/JS).",
          "Traducción de requisitos UX/negocio en soluciones funcionales.",
          "Puente marketing/IT para integración front-back eficiente.",
          "Mejores prácticas en AWS + Node.js para proyectos internos.",
        ],
      },
      en: {
        bullets: [
          "Validated creative proposals against design best practices.",
          "Agile SDLC with fast, high-quality iterations.",
          "Cross-functional work with sales, CX, and design.",
          "Well-tested, documented code for higher maintainability.",
          "Cross-platform features in Angular and React (HTML/CSS/JS).",
          "Translated UX/business requirements into functional solutions.",
          "Marketing/IT bridge for tight front-backend integration.",
          "AWS + Node.js best practices for internal project scalability.",
        ],
      },
    },
    link: "https://zemoga.com",
  },
  {
    company: "Devitech",
    role: "Implementation Leader",
    period: "Feb 2022 - Jun 2022",
    summary: {
      es: "Lider de implementación de servicios Node.js con PM2, gestionando squads fullstack y APIs alineadas a SCRUM.",
      en: "Implementation lead for Node.js services with PM2, managing fullstack squads and APIs aligned with SCRUM.",
    },
    details: {
      es: {
        bullets: [
          "Despliegues modulares con PM2 para servicios backend en Node.js.",
          "Testing exhaustivo de sistemas POS y supervisión de procesos transaccionales.",
          "Gestión de equipos fullstack (Node.js, TS, React, HTML/CSS/JS, Bootstrap, MUI).",
          "Diseño e implementación de rutas y servicios API para integración fluida.",
          "Colaboración SCRUM con clientes en cada sprint.",
        ],
      },
      en: {
        bullets: [
          "Modular Node.js backend deployments with PM2.",
          "Exhaustive POS testing and transactional process supervision.",
          "Fullstack squad management (Node.js, TS, React, HTML/CSS/JS, Bootstrap, MUI).",
          "API routes/services design and implementation for seamless integration.",
          "SCRUM collaboration with clients every sprint.",
        ],
      },
    },
    link: "https://devitech.com.co/home",
  },
  {
    company: "Devitech",
    role: "Fullstack Developer",
    period: "Nov 2021 - Feb 2022",
    summary: {
      es: "Desarrollo fullstack con React/Node.js/TypeScript; refactor de código legacy y reducción de costos operativos un 20%.",
      en: "Fullstack development with React/Node.js/TypeScript; legacy codebase refactor and 20% reduction in operating costs.",
    },
    details: {
      es: {
        bullets: [
          "Definición de hitos ambiciosos pero realistas para entregas puntuales.",
          "Pruebas de campo in-situ validando funcionalidad y rendimiento.",
          "Refactor y modernización de código legacy: -20% en costos operativos.",
          "React, Node.js, TypeScript, HTML5, CSS3, SQL y REST APIs para soluciones escalables.",
        ],
      },
      en: {
        bullets: [
          "Defined ambitious but realistic milestones for on-time delivery.",
          "In-situ field testing validating performance and functionality.",
          "Legacy codebase refactor and modernization: -20% operating costs.",
          "React, Node.js, TypeScript, HTML5, CSS3, SQL, and REST APIs for scalable solutions.",
        ],
      },
    },
    link: "https://devitech.com.co/home",
  },
  {
    company: "ITA SA - Inversiones tecnológicas de América SA",
    role: "Programador Técnico",
    period: "Jul 2017 - Dic 2017",
    summary: {
      es: "Aplicaciones .NET MVC, herramientas de BI y pipelines de CI en entorno enterprise con SQL Server.",
      en: ".NET MVC apps, BI tooling, and CI pipelines in a SQL Server enterprise environment.",
    },
    details: {
      es: {
        bullets: [
          "Diseño y desarrollo de soluciones con el equipo de testing para cumplir requisitos.",
          "Aplicaciones y herramientas de BI para capturar y explotar métricas de negocio.",
          "Testing de código servidor para validar cambios.",
          "Pipelines de integración continua simplificando despliegues.",
          "Apps web sobre SQL Server y sites .NET MVC.",
        ],
      },
      en: {
        bullets: [
          "Designed and developed solutions with the testing team to meet requirements.",
          "BI apps and tooling to capture and exploit business metrics.",
          "Server-side code testing to validate changes.",
          "CI pipelines simplifying deployments.",
          "Web apps on SQL Server and .NET MVC sites.",
        ],
      },
    },
  },
];
