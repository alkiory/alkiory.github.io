export const translations = {
  es: {
    navbar: {
      home: 'Inicio',
      blog: 'Blog',
      portfolio: 'Portafolio',
      about: 'Sobre Mi',
      contact: 'Contacto',
      language: 'Idioma',
    },
    footer: {
      sign: 'Hecho con ❤️ y ☕ por Alkiory | Construido con',
    },
    home: {
      welcome: '¡Bienvenido a mi Portafolio!',
      intro: 'Explora mis proyectos y artículos.',
      selectedWorks: 'Trabajos destacados',
      selectedWorksDesc: 'Aqui tienes algunos de mis proyectos destacados.',
      viewAll: 'Ver todo',
      lastBlog: 'Artículos recientes',
      lastBlogDesc: 'Aqui tienes algunos de mis artículos recientes.',
      skills: 'Habilidades',
      fullstack: 'Fullstack',
      fullstackDesc: 'Me gusta saber todas las características de los proyectos y me gusta que esta experiencia sea de cero.',
      teamLeader: 'Lider de equipo',
      teamLeaderDesc: 'Me gusta trabajar en equipo y colaborar con otros desarrolladores.',
      strategy: 'Mente estrategica',
      strategyDesc: 'Me gusta pensar de manera estrategica y crear soluciones innovadoras.',
      interested: '¿Te interesa trabajar conmigo?',
      workExperience: 'Experiencia laboral',
      workExperienceDesc: 'He tenido la suerte de trabajar con estas empresas y mas.',
      contact: 'Contacto',
    },
    blog: {
      title: 'Mi Blog Personal',
      description: 'Aqui tienes algunos de mis proyectos destacados.',
      readMore: 'Leer más',
    },
    about: {
      title: 'Sobre Mí',
      description: 'Soy un desarrollador apasionado por crear soluciones innovadoras.',
      introParagraph1: 'Hola, soy Alkiory, un desarrollador con experiencia en diversas tecnologías.',
      introParagraph2: 'Me encanta aprender y compartir mis conocimientos a través de este blog.',
      introParagraph3: 'En mi tiempo libre, disfruto de la música, la lectura y explorar nuevas ideas.',
      introParagraph4: 'Gracias por visitar mi portafolio, ¡espero que encuentres algo interesante!',
      introParagraph5: 'Si tienes alguna pregunta o quieres colaborar, no dudes en contactarme.',
      introParagraph6: 'Estoy siempre abierto a nuevas oportunidades y desafíos.',
      education: 'Educación',
    },
    contact: {
      title: 'Contacto',
      description: 'Si deseas ponerte en contacto conmigo, puedes enviarme un correo electrónico a:',
      form: {
        name: 'Nombre',
        email: 'Correo electrónica',
        subject: 'Asunto',
        message: 'Mensaje',
        submit: 'Enviar',
      },
      successMessage: 'Mensaje enviado correctamente.',
      errorMessage: 'Ha ocurrido un error al enviar el mensaje.',

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
      welcome: 'Welcome to my Portfolio!',
      intro: 'Explore my projects and articles.',
      selectedWorks: 'Featured Works',
      selectedWorksDesc: 'Here are some of my featured projects.',
      viewAll: 'View All',
      lastBlog: 'Recent Articles',
      lastBlogDesc: 'Here are some of my recent articles.',
      skills: 'Skills',
      fullstack: 'Fullstack',
      fullstackDesc: 'I like to know all the features of the projects and I appreciate if this experience is from zero.',
      teamLeader: 'Team Leader',
      teamLeaderDesc: 'It is important to manage and take control about a project and if the architecture needs we as a team can build it.',
      strategy: 'Strategy Minded',
      strategyDesc: 'I have the ability to take decisions and create strategies to improve the performance of a project.',
      interested: 'Interested in working with me?',
      workExperience: 'Work Experience',
      workExperienceDesc: 'I have been fortunate enough to work with this companies and more.',
    },
    blog: {
      title: 'My Personal Blog',
      description: 'Here are some of my featured projects.',
      readMore: 'Read more',
    },
    about: {
      title: 'About Me',
      description: 'I am a developer passionate about creating innovative solutions.',
      introParagraph1: 'Hello, I am Alkiory, a developer with experience in various technologies.',
      introParagraph2: 'I love learning and sharing my knowledge through this blog.',
      introParagraph3: 'In my free time, I enjoy music, reading, and exploring new ideas.',
      introParagraph4: 'Thank you for visiting my portfolio, I hope you find something interesting!',
      introParagraph5: 'If you have any questions or want to collaborate, feel free to contact me.',
      introParagraph6: 'I am always open to new opportunities and challenges.',
      education: 'Education',
    },
    contact: {
      title: 'Contact',
      description: 'If you want to get in touch with me, you can send me an email at:',
      form: {
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
        submit: 'Submit',
      },
      successMessage: 'Message sent successfully.',
      errorMessage: 'An error occurred while sending the message.',
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

export const getLangFromUrl = (url: URL) => {
  const lang = url.pathname.split('/')[1];
  return lang;
};