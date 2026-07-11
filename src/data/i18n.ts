export const translations = {
  es: {
    navbar: {
      home: 'Inicio',
      blog: 'Blog',
      portfolio: 'Portafolio',
      about: 'Sobre Mí',
      contact: 'Contacto',
      language: 'Idioma',
    },
    footer: {
      sign: 'Hecho con ❤️ y ☕ por Alkiory | Construido con',
    },
    home: {
      statusBadge: 'Disponible para proyectos',
      viewDetails: 'Ver detalles',
      welcome: '¡Bienvenido a mi Portafolio!',
      intro: 'Construyo, aprendo y comparto — conoce mis proyectos y artículos recientes.',
      selectedWorks: 'Proyectos destacados',
      selectedWorksDesc: 'Aquí tienes algunos de mis proyectos recientes.',
      viewAll: 'Ver todo',
      lastBlog: 'Artículos recientes',
      lastBlogDesc: 'Algunos de los artículos que he escrito recientemente.',
      skills: 'Habilidades',
      fullstack: 'Fullstack',
      fullstackDesc: 'Me adapto con agilidad a cualquier reto tecnológico apoyándome en bases sólidas. Exprimo la documentación al máximo, y si no existe, la construyo sobre la marcha para que el progreso del proyecto nunca se detenga.',
      fullstackTooltip: 'Adaptabilidad',
      teamLeader: 'Líder de equipo',
      teamLeaderDesc: 'Creo firmemente que los grandes proyectos nacen de grandes equipos. Promuevo un entorno de colaboración genuina, listos para construir desde cero cualquier arquitectura que el producto necesite.',
      teamLeaderTooltip: 'Colaboración',
      strategy: 'Mente estratégica',
      strategyDesc: 'Afronto los desafíos con visión global, pero siempre compartiendo los descubrimientos. Concibo y diseño soluciones bajo la mentalidad de "todos para uno y uno para todos", multiplicando el impacto de cada compañero.',
      strategyTooltip: 'Estrategia compartida',
      interested: '¿Te interesa trabajar conmigo?',
      workExperience: 'Experiencia laboral',
      workExperienceDesc: 'Un vistazo a mis roles recientes. Conoce más sobre mi trayectoria.',
      contact: 'Contacto',
      yearsOfExperienceDesc: 'años escribiendo código en producción.',
      projectsCompletedDesc: 'proyectos entregados y mantenidos, del boceto al deploy.',
    },
    blog: {
      title: 'Mi Blog Personal',
      description: 'Artículos sobre software, diseño y la construcción de los proyectos.',
      readMore: 'Leer más',
    },
    about: {
      title: 'Sobre Mí',
      description: 'Desarrollador de software construyendo soluciones web escalables junto a equipos. Aprendo con la comunidad y comparto lo que descubro — este blog es una forma de devolver lo aprendido.',
      introParagraph1: 'Soy Sergio Campbell (Alkiory), desarrollador de software que construye soluciones web escalables centradas en las personas. Trabajo principalmente con React, Angular y TypeScript, y estoy tan cómodo adoptando cualquier herramienta que el equipo necesite como manteniendo las que ya dominamos — rendimiento, accesibilidad, usabilidad y SEO siempre están sobre la mesa. Me desenvolví bien en metodologías ágiles y entornos colaborativos, y diseño arquitecturas que ayudan al equipo a entregar su mejor versión. A lo largo de los años he liderado plataformas complejas junto a equipos grandes y pequeños, donde la innovación y la mejora continua han sido siempre un esfuerzo compartido.',
      introParagraph2: 'En este portafolio te comparto algunos de mis proyectos destacados y artículos recientes — adquiere los que te llamen la atención y descubre lo que he ido aprendiendo en el camino.',
      introParagraph3: 'Si tienes alguna pregunta o quieres colaborar, no dudes en contactarme. Estoy siempre abierto a nuevas oportunidades y desafíos.',
      introParagraph4: 'Gracias por pasar por aquí — espero que encuentres algo que te resuene.',
      experience: 'Experiencia laboral',
      experienceDesc: 'Mi trayectoria profesional completa, de la más reciente a la primera.',
      introParagraph5: 'También escribo en el blog por una razón simple: cada artículo es una conversación que me habría gustado leer antes de empezar un proyecto. Si te resuena, acompáñame.',
      education: 'Educación',
      techSkills: 'Habilidades Tecnológicas',
      softSkills: 'Habilidades Blandas',
      languages: 'Idiomas',
      certifications: 'Certificaciones',
      // Sub-headings + descriptions for the soft-skill cards. Each entry
      // matches a `softSkill.id` in src/data/skills.ts so the page can
      // map over the data and pick the right translation by id.
      softSkillItems: {
        leadership: {
          title: 'Liderazgo cercano',
          desc: 'Guío al equipo hacia soluciones técnicas robustas y arquitecturas escalables, sin perder de vista a las personas. Prefiero preguntar antes de imponer y celebrar los avances pequeños tanto como los grandes.',
        },
        collaboration: {
          title: 'Colaboración genuina',
          desc: 'Creo firmemente que los grandes productos nacen de grandes equipos. Promuevo un entorno donde construir juntos es la norma — desde la primera arquitectura hasta la última línea de código.',
        },
        communication: {
          title: 'Comunicación clara',
          desc: 'Pregunto antes de asumir, documento lo que descubro y traduzco la complejidad técnica en conversaciones accionables. Una decisión bien explicada vale más que una decisión rápida y oscura.',
        },
        initiative: {
          title: 'Iniciativa con propósito',
          desc: 'Veo huecos que mejorar, los nombro y propongo un camino. Mantengo al equipo alineado mientras avanzo, y reconozco cuando conviene pausar para recalibrar.',
        },
        activeListening: {
          title: 'Escucha activa',
          desc: 'Escuchar antes de hablar no es solo cortesía: es la mejor forma de entender restricciones reales, riesgos que no están en el tablero y necesidades que muchas veces no se piden en voz alta.',
        },
        empathy: {
          title: 'Empatía en el día a día',
          desc: 'El software es para personas. Trato a compañeros y usuarios con la misma curiosidad y respeto, y devuelvo feedback con cuidado aunque sea incómodo. Un equipo amable construye productos mejores.',
        },
      },
      // Category labels for the categorized tech-skills grid.
      techSkillCategories: {
        frontend: 'Frontend',
        backend: 'Backend',
        testing: 'Testing & QA',
        devops: 'DevOps & Cloud',
        design: 'Diseño',
        tools: 'Herramientas',
        intelligenceArtificial: 'Inteligencia Artificial',
      },
    },
    contact: {
      title: 'Contacto',
      description: 'Si deseas ponerte en contacto conmigo, puedes escribirme o seguirme en mis redes sociales.',
      findMeOn: 'Encuéntrame en',
      // Contact form (no backend — submit opens the user's email client
      // with the data pre-filled). Strings mirror the form layout so a
      // non-Spanish speaker can still understand the resulting email.
      formTitle: 'Envíame un mensaje',
      formName: 'Tu nombre',
      formNamePlaceholder: 'Sergio Pérez',
      formBudget: 'Presupuesto estimado',
      formBudgetOptions: [
        { value: '<5k USD', label: 'Menos de 5.000 USD' },
        { value: '5k–10k USD', label: '5.000 – 10.000 USD' },
        { value: '10k–25k USD', label: '10.000 – 25.000 USD' },
        { value: '25k–50k USD', label: '25.000 – 50.000 USD' },
        { value: '50k+ USD', label: 'Más de 50.000 USD' },
        { value: 'Por definir', label: 'Por definir' },
      ],
      formBudgetPlaceholder: 'Elige un rango',
      formDescription: 'Cuéntame sobre tu proyecto',
      formDescriptionPlaceholder:
        'Necesito un sitio web moderno, accesible y rápido para mi negocio…',
      formSubmit: 'Enviar mensaje',
      formSubjectPrefix: '[Consulta Portafolio]',
      formBodyName: 'Nombre',
      formBodyBudget: 'Presupuesto',
      formBodyDescription: 'Descripción del proyecto',
      // Honeypot label — only visible to bots/screen-reader nav-tree
      // crawlers (real users can't see the input via CSS hiding).
      formHoneypotLabel: 'Compañía (no rellenar)',
      // Post-submit thank-you panel — shown in place of the form once
      // the mailto opens, with a fallback hint nudged at the email
      // link below.
      formThanksTitle: '¡Gracias por contactarme!',
      formThanksMessage:
        'He abierto tu cliente de correo con un mensaje pre-llenado. Si no se abrió, escríbeme directamente usando el botón de abajo.',
    },
    portfolio: {
      title: 'Portafolio',
      description: 'Aquí están algunos de mis proyectos destacados.',
      project1: 'Proyecto 1',
      project2: 'Proyecto 2',
      project3: 'Proyecto 3',
    },
    notFound: {
      title: 'Página No Encontrada',
      description: 'Lo sentimos, la página que buscas no existe o se ha movido.',
      homeLinkText: 'Volver al Inicio',
    },
  },
  en: {
    navbar: {
      home: 'Home',
      blog: 'Blog',
      portfolio: 'Portfolio',
      about: 'About Me',
      contact: 'Contact',
      language: 'Language',
    },
    footer: {
      sign: 'Made with ❤️ and ☕ by Alkiory | Built with',
    },
    home: {
      statusBadge: 'Available for projects',
      viewDetails: 'View details',
      welcome: 'Welcome to my Portfolio!',
      intro: 'Build, learn, share. Explore my latest projects and articles.',
      selectedWorks: 'Featured Projects',
      selectedWorksDesc: 'Here are some projects I’ve worked on recently.',
      viewAll: 'View All',
      lastBlog: 'Recent Articles',
      lastBlogDesc: 'Here are some articles I’ve written recently.',
      skills: 'Skills',
      fullstack: 'Fullstack',
      fullstackDesc: 'I seamlessly adapt to any tech challenge by relying on strong fundamentals. I dive deep into documentation—and if it’s missing, I write it on the fly so progress never stops.',
      fullstackTooltip: 'Adaptability',
      teamLeader: 'Team Leader',
      teamLeaderDesc: 'Great projects are driven by great teams. I foster a collaborative environment where we can build whatever architecture the product demands from the ground up.',
      teamLeaderTooltip: 'Collaboration',
      strategy: 'Strategy Minded',
      strategyDesc: 'I approach challenges with a big-picture focus, but always by sharing knowledge. I design solutions with an "all for one and one for all" mindset, multiplying the whole team’s impact.',
      strategyTooltip: 'Shared strategy',
      interested: 'Interested in working with me?',
      workExperience: 'Work Experience',
      workExperienceDesc: 'A glance at my recent roles. Discover more about my journey.',
      yearsOfExperienceDesc: 'years writing code in production.',
      projectsCompletedDesc: 'projects delivered and maintained, from concept to deployment.'
    },
    blog: {
      title: 'My Personal Blog',
      description: 'Articles about software, design and the work behind the projects.',
      readMore: 'Read more',
    },
    about: {
      title: "About Me",
      description: "Software developer building scalable web solutions alongside teams. I learn with the community and share what I discover — this blog is one of those ways to give back.",
      introParagraph1: "I'm Sergio Campbell (Alkiory), a software developer who builds scalable, people-centered web solutions. I work mostly with React, Angular, and TypeScript — but I'm equally at home adopting whatever tool the team needs, as long as performance, accessibility, usability, and SEO keep their seat at the table. I thrive in agile, collaborative environments, and I design architectures that help the team ship their best work. Over the years I've led complex platforms alongside teams of all sizes, where innovation and continuous improvement have always been a shared effort.",
      introParagraph2: "In this portfolio I share some of my featured projects and recent articles — pick whatever catches your eye and discover what I've been learning along the way.",
      introParagraph3: "If you have any questions or want to collaborate, feel free to get in touch. I'm always open to new opportunities and challenges.",
      introParagraph4: "Thanks for stopping by — I hope you find something that resonates.",
      experience: "Work Experience",
      experienceDesc: "My full professional journey, from the most recent to the first.",
      introParagraph5: "I also write on this blog for a simple reason: every post is a conversation I wish I had read before starting projects. If that resonates, come along for the ride.",
      education: "Education",
      techSkills: "Technical Skills",
      softSkills: "Soft Skills",
      languages: "Languages",
      certifications: "Certifications",
      softSkillItems: {
        leadership: {
          title: "Hands-on leadership",
          desc: "I guide teams toward robust technical solutions and scalable architectures without losing sight of the people. I ask before I impose, and I celebrate small wins as much as big ones.",
        },
        collaboration: {
          title: "Genuine collaboration",
          desc: "Great products are born from great teams. I foster an environment where building together is the norm — from the first architecture sketch to the last line of code.",
        },
        communication: {
          title: "Clear communication",
          desc: "I ask before I assume, document what I discover, and translate technical complexity into actionable conversations. A well-explained decision is worth more than a fast, opaque one.",
        },
        initiative: {
          title: "Initiative with purpose",
          desc: "I see gaps to improve, I name them, and I propose a path. I keep the team aligned as I move forward, and I recognize when it's worth pausing to recalibrate.",
        },
        activeListening: {
          title: "Active listening",
          desc: "Listening before speaking isn't just manners — it's how I uncover real constraints, unspoken risks, and needs that often don't make it onto the board.",
        },
        empathy: {
          title: "Everyday empathy",
          desc: "Software is for people. I treat teammates and users with the same curiosity and respect, and I give feedback carefully even when it's uncomfortable. A kind team builds better products.",
        },
      },
      techSkillCategories: {
        frontend: "Frontend",
        backend: "Backend",
        testing: "Testing & QA",
        devops: "DevOps & Cloud",
        design: "Design",
        tools: "Tools",
        intelligenceArtificial: "Intelligence Artificial",
      },
    },
    contact: {
      title: 'Contact',
      description: 'If you want to get in touch with me, feel free to drop me an email or follow me on social media.',
      findMeOn: 'Find me on',
      // Contact form (no backend — submit opens the user's email client
      // with the data pre-filled).
      formTitle: 'Send me a message',
      formName: 'Your name',
      formNamePlaceholder: 'Jane Doe',
      formBudget: 'Estimated budget',
      formBudgetOptions: [
        { value: '<5k USD', label: 'Under 5,000 USD' },
        { value: '5k–10k USD', label: '5,000 – 10,000 USD' },
        { value: '10k–25k USD', label: '10,000 – 25,000 USD' },
        { value: '25k–50k USD', label: '25,000 – 50,000 USD' },
        { value: '50k+ USD', label: 'Over 50,000 USD' },
        { value: 'Por definir', label: 'To be defined' },
      ],
      formBudgetPlaceholder: 'Pick a range',
      formDescription: 'Tell me about your project',
      formDescriptionPlaceholder:
        'I need a modern, accessible, fast website for my business…',
      formSubmit: 'Send message',
      formSubjectPrefix: '[Portfolio Inquiry]',
      formBodyName: 'Name',
      formBodyBudget: 'Budget',
      formBodyDescription: 'Project description',
      // Honeypot label — only visible to bots/screen-reader nav-tree
      // crawlers (real users can't see the input via CSS hiding).
      formHoneypotLabel: 'Company (do not fill)',
      // Post-submit thank-you panel.
      formThanksTitle: 'Thanks for reaching out!',
      formThanksMessage:
        "I've opened your email client with a pre-filled message. If it didn't open, just write to me directly using the button below.",
    },
    portfolio: {
      title: 'Portfolio',
      description: 'Here are some of my featured projects.',
      project1: 'Project 1',
      project2: 'Project 2',
      project3: 'Project 3',
    },
    notFound: {
      title: 'Page Not Found',
      description: 'Sorry, the page you are looking for does not exist or has been moved.',
      homeLinkText: 'Back to Home',
    },
  },
};

export type Lang = keyof typeof translations; // 'es' | 'en'

export const getTranslations = (lang: Lang) => {
  return translations[lang];
};

export const getLangFromUrl = (url: URL): Lang | undefined => {
  const lang = url.pathname.split("/")[1];
  if (lang === "es" || lang === "en") return lang as Lang;
  return undefined;
};