import type { PortfolioContent } from "./portfolio.types";

export const portfolio = {
  // Core person/profile data. Update identity, bio, email, socials, and location here.
  profile: {
    identity: {
      firstName: "Nidhal",
      lastName: "Belhaj Salem",
      displayName: "Nidhal",
      fullName: "Nidhal Belhaj Salem",
      headline: "Ingénieur R&D Mobile Android",
      subtitle: "Mobile-Android-Developer",
      avatar: {
        url: "/images/user1.png",
        alt: "Nidhal portrait",
      },
    },

    summary: {
      short: "Android R&D engineer with 6+ years of experience building modern, optimized mobile applications.",
      long:
        "Ingénieur étude & développement mobile Android avec plus de 6 ans d'expérience dans l'ingénierie des applications mobiles en cycle V et Agile. Passionné par l'innovation technologique et la R&D, je suis à la recherche d'opportunités dans le domaine numérique, avec une expertise dans la conception et le développement d'applications Android modernes et optimisées.",
    },

    contact: {
      email: "nidhal.belhadjsalem@gmail.com",
      supportEmail: "nidhal.belhadjsalem@gmail.com",
      phone: "+212 707747725",
      website: "https://porfilio-hazel.vercel.app",
      location: {
        label: "Casablanca, Maroc",
        detail: "Available for remote collaborations worldwide",
        city: "Casablanca",
        country: "Maroc",
        timezone: "Africa/Casablanca",
      },
      responseTime: "24 hours",
    },

    availability: {
      openToWork: true,
      statusText: "Available for new projects",
    },

    socials: [
      { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/nidhal-belhajsalem/", isActive: true },
      { platform: "github", label: "GitHub", href: "https://github.com", isActive: true },
      { platform: "instagram", label: "Instagram", href: "https://instagram.com", isActive: true },
      { platform: "x", label: "Twitter", href: "https://x.com", isActive: true },
    ],
  },

  // CV/resume-style data. Safe place for work history, education, and skills.
  resume: {
    experience: [
      {
        id: "exp-attijariwafa",
        role: "Ingénieur R&D Mobile Android",
        company: "Attijariwafa Bank – Babel",
        employmentType: "Full-time",
        start: "2024-03",
        end: "Present",
        location: "Casablanca, Maroc",
        summary:
          "Refonte de l'application Attijari Particulier. Développement des interfaces Android avec les nouvelles technologies Android, intégration d'APIs et gestion des notifications.",
        achievements: [
          "Refonte de l'application Attijari Particulier.",
          "Développement des interfaces Android en utilisant Kotlin et Jetpack Compose.",
          "Intégration des web services et APIs (Retrofit, Coroutines).",
          "Gestion des notifications et intégration des services Google Play.",
          "Participation aux cérémonies agiles (Scrum) et revue de code.",
        ],
        technologies: ["Kotlin", "Jetpack Compose", "Retrofit", "Coroutines", "MVVM", "Dagger/Hilt", "Firebase Crashlytics", "JUnit"],
      },
      {
        id: "exp-daralamane",
        role: "Ingénieur R&D Mobile Android",
        company: "Dar Al Amane – Babel",
        employmentType: "Full-time",
        start: "2022-06",
        end: "2024-03",
        location: "Casablanca, Maroc",
        summary:
          "Refonte complète de l'application mobile de Dar Al Amane. Conception des interfaces utilisateur, intégration des services API Google Map et collaboration avec l'équipe Scrum.",
        achievements: [
          "Refonte complète de l'application mobile de Dar Al Amane.",
          "Conception des interfaces utilisateur en Kotlin et Jetpack.",
          "Intégration des services API Google Map.",
          "Collaboration avec l'équipe Scrum et revue des user stories.",
          "Tests unitaires et correction des bugs signalés par l'équipe QA.",
        ],
        technologies: ["Kotlin", "Jetpack", "MVVM", "Retrofit", "Coroutines", "Koin", "JUnit"],
      },
      {
        id: "exp-cbao",
        role: "Ingénieur R&D Mobile Android",
        company: "ADRIA BUSINESS & TECHNOLOGY – CBAO Groupe Attijariwafa Bank",
        employmentType: "Full-time",
        start: "2022-04",
        end: "2022-06",
        location: "Casablanca, Maroc",
        summary:
          "Evolution de l'application mobile CBAO. Développement des UI Android, intégration des web services et participation à l'élaboration de l'architecture mobile.",
        achievements: [
          "Evolution de l'application mobile CBAO.",
          "Développement des UI Android et intégration des web services.",
          "Participation à l'élaboration de l'architecture mobile.",
        ],
        technologies: ["Kotlin", "MVVM", "RxJava", "Retrofit", "Git"],
      },
      {
        id: "exp-inwi",
        role: "Ingénieur R&D Mobile Android",
        company: "Mobiblanc – Inwi",
        employmentType: "Full-time",
        start: "2021-09",
        end: "2022-04",
        location: "Casablanca, Maroc",
        summary:
          "Participation à la refonte de l'application MyInwi, avec un focus sur l'amélioration des performances et de l'expérience utilisateur.",
        achievements: [
          "Participation à la refonte de l'application MyInwi.",
          "Développement des interfaces en suivant les règles Material Design.",
          "Intégration de services Google Play pour les notifications et la gestion des abonnements.",
          "Optimisation de l'architecture MVVM en utilisant RxJava pour la gestion asynchrone.",
          "Collaboration avec les équipes produit et backend pour intégrer de nouvelles APIs via Retrofit.",
        ],
        technologies: ["Kotlin", "MVVM", "Jetpack", "Retrofit", "Dagger", "RxJava", "Firebase Crashlytics"],
      },
      {
        id: "exp-showroomz",
        role: "Ingénieur R&D Mobile Android",
        company: "SHOWROOMZ",
        employmentType: "Full-time",
        start: "2020-03",
        end: "2021-09",
        location: "Tunisie",
        summary:
          "Amélioration et maintenance de l'application mobile SHOWROOMZ, géolocalisation via Google Maps, et adoption de l'architecture MVVM avec les composants Jetpack.",
        achievements: [
          "Amélioration et maintenance de l'application mobile SHOWROOMZ.",
          "Développement de la géolocalisation des showrooms via l'API Google Maps.",
          "Intégration des services Google Play pour les notifications en temps réel.",
          "Utilisation de Realm pour une gestion efficace des données locales.",
          "Adoption de l'architecture MVVM avec les composants Jetpack pour une meilleure modularité.",
        ],
        technologies: ["Kotlin", "Jetpack", "MVVM", "Retrofit", "Realm", "RxJava", "Google Maps API"],
      },
      {
        id: "exp-openbee",
        role: "Ingénieur R&D Mobile Android/React Native",
        company: "Open Bee",
        employmentType: "Full-time",
        start: "2019-03",
        end: "2020-03",
        location: "Tunis, Tunisie",
        summary:
          "Développement de l'application OpenBee Sphère en React Native. Collaboration avec l'équipe pour la revue des User Stories et participation aux cérémonies Agiles.",
        achievements: [
          "Développement de l'application OpenBee Sphère en React Native.",
          "Collaboration avec l'équipe pour la revue des User Stories et des parcours utilisateurs (UX).",
          "Participation aux cérémonies Agiles : Sprint Planning, Retrospective, et Stand-Up meetings.",
          "Intégration des web-services et débogage des anomalies remontées par l'équipe QA.",
          "Tests de performance et support technique pour l'application Open Bee Mobile.",
        ],
        technologies: ["React Native", "Java", "RxJava", "Retrofit", "Realm", "Crashlytics", "Git", "Jira"],
      },
      {
        id: "exp-peak",
        role: "Développeur Android",
        company: "Peak Technologies",
        employmentType: "Full-time",
        start: "2017-12",
        end: "2019-03",
        location: "Sousse, Tunisie",
        summary:
          "Développement de l'application mobile Bounou dans le secteur de la finance. Conception des interfaces, intégration des services Google Play et Google Maps.",
        achievements: [
          "Développement de l'application mobile Bounou dans le secteur de la finance.",
          "Conception des interfaces utilisateurs Android et intégration des services Google Play et Google Maps.",
          "Participation à l'élaboration de l'architecture mobile et des spécifications techniques.",
          "Débogage et gestion des notifications, avec des livraisons hebdomadaires en environnement recette.",
        ],
        technologies: ["Kotlin", "MVVM", "RxJava", "Jetpack", "Retrofit", "Crashlytics", "Git", "Redmine"],
      },
    ],
    education: [
      {
        id: "edu-ingenieur",
        school: "EPI-Sousse",
        degree: "Diplôme d'Ingénieur en Informatique",
        start: "2016",
        end: "2019",
        location: "Sousse, Tunisie",
      },
      {
        id: "edu-licence",
        school: "Institut Supérieur",
        degree: "Licence Appliquée en Informatique",
        start: "2013",
        end: "2016",
        location: "Tunisie",
      },
    ],
    skills: {
      featured: [
        "Kotlin",
        "Jetpack Compose",
        "Android SDK",
        "MVVM",
        "Clean Architecture",
        "Retrofit",
        "Coroutines",
        "Firebase",
      ],
      frontend: ["Jetpack Compose", "Android SDK", "Material Design", "React Native"],
      backend: ["REST", "GraphQL", "Retrofit", "OkHttp", "Firebase Authentication", "Cloud Messaging"],
      mobile: ["Kotlin", "Java", "Android SDK", "Jetpack Compose", "Room", "SQLite", "Firebase Firestore", "Realm"],
      tools: ["Git", "Jenkins", "Firebase App Distribution", "Fastlane", "JIRA", "Trello", "Confluence"],
    },
    certifications: [],
    languages: [
      { name: "Arabic", level: "Native" },
      { name: "French", level: "Fluent" },
      { name: "English", level: "Fluent" },
    ],
  },

  // Site-level settings like SEO, theme, navigation, and footer labels.
  site: {
    seo: {
      // Title: 39 chars — primary keyword first, name last for brand recall
      title: "Android Developer | Nidhal Belhaj Salem",
      // Description: 152 chars — action-oriented, keyword-rich, answers user intent
      description:
        "Android R&D Engineer with 6+ years building high-performance apps using Kotlin & Jetpack Compose. Available for fintech, telecom & SaaS projects.",
      author: "Nidhal Belhaj Salem",
      url: "https://porfilio-hazel.vercel.app",
      locale: "fr_MA",
      robots: "index, follow",
      keywords: [
        // ─── FROM ANSWERTHEPUBLIC (fr-FR, "software freelancer") ───────────────
        // Search Engines cluster — top navigational & informational queries
        "freelance software engineer",
        "software freelancer jobs",
        "software freelancer website",
        "software testing freelancer",
        "software for freelancer",
        "software engineer freelancer salary",
        "software developer freelancer",
        "software developer freelancer website",
        "freelancer software developer",
        "tester jobs freelancer software",
        // Social Media cluster — hashtag & community signals
        "software engineer freelancer",
        "software developer freelancer",
        "#softwarefreelancer",
        "#softwarefreelancers",
        // Shopping cluster — hire-intent queries
        "project management software freelancer",
        // AI Models cluster — emerging intent
        "comment démarrer son activité de développeur freelance",
        "comment trouver des plateformes pour freelance",

        // ─── PRIMARY — high-volume, high-intent ────────────────────────────────
        "Android developer",
        "mobile app developer",
        "Android engineer",
        "freelance Android developer",
        "freelance mobile app developer",

        // ─── TECH-SPECIFIC — searched by CTOs & technical leads ───────────────
        "Kotlin developer",
        "Jetpack Compose developer",
        "MVVM Android",
        "Clean Architecture Android",
        "Modular Architecture Android",
        "Retrofit Coroutines Android",
        "Dagger Hilt Android",
        "Firebase Android developer",
        "React Native developer",
        "Android SDK developer",

        // ─── DOMAIN EXPERTISE — industry & sector signals ─────────────────────
        "Android fintech developer",
        "Android banking app developer",
        "Android telecom app developer",
        "custom Android app development",
        "native Android app development",
        "Android app developer for hire",

        // ─── LONG-TAIL — lower competition, higher conversion ──────────────────
        "Android R&D engineer",
        "senior Android developer Maroc",
        "développeur Android Casablanca",
        "développeur Android freelance",
        "ingénieur mobile Android freelance",
        "Kotlin Jetpack Compose engineer",
        "développeur Kotlin freelance",
        "développeur mobile freelance France",
        "freelance développeur application mobile",
      ],
      ogImage: "/images/user1.png",
      twitterHandle: "@nidhaldev",
    },
    theme: {
      primaryColor: "#1B4D3E",
      accentColor: "#b8f02a",
      backgroundColor: "#ffffff",
      surfaceColor: "#f8fafc",
      foregroundColor: "#0f172a",
      mutedColor: "#64748b",
    },
    navigation: {
      main: [
        { label: "Works", href: "/works", openNewTab: false, isActive: true },
        { label: "About", href: "#about", openNewTab: false, isActive: true },
        { label: "Testimonials", href: "#testimonials", openNewTab: false, isActive: true },
        { label: "Contact", href: "/contact", openNewTab: false, isActive: true },
      ],
      footer: [
        { label: "Works", href: "/works", openNewTab: false, isActive: true },
        { label: "About Me", href: "#about", openNewTab: false, isActive: true },
        { label: "Testimonials", href: "#testimonials", openNewTab: false, isActive: true },
      ],
    },
    footer: {
      emailLabel: "Email me for quick conversation",
      quickLinksTitle: "Quick Links",
      addressTitle: "Address",
      followTitle: "Follow",
      address: {
        street: "Casablanca",
        city: "Casablanca",
        country: "Maroc",
      },
    },
  },

  // Page-specific copy only. Keep labels, headings, CTAs, and section text here.
  pages: {
    home: {
      hero: {
        greetingPrefix: "Hi there, I'm",
        titleWords: ["Mobile", "APPS", "Engineer"],
      },
      works: {
        title: "Works",
        description:
          "A selection of product, branding, and interactive builds shaped around storytelling and usability.",
        viewAllLabel: "View All Projects",
      },
      about: {
        headline1: "Passionate",
        headline2: "About Development",
        passionDescription: "I enjoy blending visual polish with practical product thinking.",
        workExperienceTitle: "Work Experience",
        workExperienceText:
          "6+ years building modern Android applications across fintech, telecom, and SaaS sectors.",
        aboutDescription:
          "Ingénieur R&D Mobile Android avec une expertise dans la conception d'applications Android modernes, les architectures MVVM et Clean Architecture, et les méthodes Agile.",
        inlineImageUrl: "https://images.unsplash.com/photo-1685062428479-e310b7851de5?w=300&h=300",
        inlineImageAlt: "Abstract 3D element",
        gridImage1Url:
          "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&h=500&fit=crop",
        gridImage1Alt: "Colorful 3D shapes",
        gridImage2Url:
          "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=400&h=500&fit=crop",
        gridImage2Alt: "Green glowing cube",
        viewAllLabel: "View All",
        viewAllHref: "/works",
      },
      workstation: {
        sideLabelLeft: "A setup built for focus, iteration, and visual experimentation.",
        sideLabelRight: "Tools matter when speed and clarity both need to stay high.",
        sectionTitle: "Workstation",
        favoriteGearsTitle: "Favourite Gears",
        favoriteGearsDescription:
          "A small set of tools I rely on every day for design reviews, coding, prototyping, and shipping polished interfaces.",
        images: [
          {
            url: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=500&h=350&fit=crop",
            alt: "Workspace with tablet and phone",
          },
          {
            url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=350&fit=crop",
            alt: "Person coding on laptop",
          },
          {
            url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=350&fit=crop",
            alt: "Multiple screens setup",
          },
          {
            url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=350&fit=crop",
            alt: "Watch and phone on desk",
          },
        ],
      },
      testimonials: {
        heading: "What People Say About Me",
      },
      contactCta: {
        headingLine1: "Have An",
        headingLine2: "Idea?",
        detailLine1: "Tell Me",
        detailLine2: "About It",
        description:
          "If you already have a direction in mind, send me the brief and I'll help shape it into something sharp and memorable.",
        buttonLabel: "Send Me A Request",
        buttonHref: "/contact",
      },
    },

    works: {
      hero: {
        backToHomeLabel: "Back to home",
        headingLine1: "I BUILD",
        headingLine2: "DIGITAL",
        headingLine3: "WORLDS",
        description:
          "Android R&D engineer with 6+ years of experience — turning ideas into high-performance, production-ready mobile applications.",
        primaryCtaLabel: "View Works",
        primaryCtaHref: "#works",
        secondaryCtaLabel: "Let's Talk",
        secondaryCtaHref: "#cta",
        scrollHintLabel: "Scroll to explore",
        panelLine1: "MOBILE",
        panelLine2: "ANDROID",
        panelLine3: "DEV",
        availabilityBadge: "Open to work",
      },
      selectedWorks: {
        eyebrow: "Selected Works",
        heading: "PROJECTS",
      },
      gallery: {
        eyebrow: "Featured Gallery",
        headingLine1: "VISUAL",
        headingLine2: "SHOWCASE",
      },
      about: {
        eyebrow: "About Me",
        headingLine1: "ANDROID",
        headingLine2: "ENGINEER",
        headingLine3: "BY NATURE",
        description:
          "Ingénieur R&D Mobile Android avec plus de 6 ans d'expérience dans l'ingénierie des applications mobiles en cycle V et Agile. Passionné par l'innovation technologique et la R&D, avec une expertise dans la conception et le développement d'applications Android modernes et optimisées.",
        stats: [
          { num: "6+", label: "Years of experience" },
          { num: "10+", label: "Apps shipped" },
          { num: "7+", label: "Companies worked with" },
          { num: "01", label: "Focused vision" },
        ],
      },
    },

    contact: {
      backToHomeLabel: "Back to home",
      rotatingBadgeWords: ["GET IN TOUCH", "LET'S TALK", "SAY HELLO"],
      marqueeItems: ["Available for freelance", "Open to collaboration", "Let's build something great"],
      eyebrow: "Have a project in mind?",
      headingLine1: "Let's work",
      headingLine2: "together.",
      description:
        "I am always open to new collaborations, product ideas, and ambitious Android mobile builds.",
      emailLabel: "Email",
      locationLabel: "Based in",
      followLabel: "Follow me",
      availabilityText: "Available for new projects",
      projectDetailsLabel: "Project details",
      secureFormLabel: "Direct contact",
      responseTimeText: "I typically respond within 24 hours",
      copyEmailLabel: "Copy email",
      copiedEmailLabel: "Copied!",
      closingLabel: "Say hello.",
      form: {
        nameLabel: "Your name",
        emailLabel: "Email address",
        companyLabel: "Company / Organization",
        projectTypeLabel: "Project type (e.g. Android App, Mobile UI, Consulting)",
        messageLabel: "Tell me about your project",
        budgetLabel: "Project budget",
        budgetOptions: ["< $5k", "$5k - $10k", "$10k - $25k", "$25k+"],
        submitLabel: "Send message",
        sendingLabel: "Opening email...",
        successMessage: "Your email client should open with the project details ready to send.",
        subjectPrefix: "Project inquiry",
      },
    },
  },

  // Portfolio/case-study entries.
  projects: [
    {
      id: "coffee-shop",
      title: "Coffee Shop",
      year: "2024",
      category: "Mobile App UI",
      description:
        "A polished coffee ordering mobile app concept with product discovery, drink details, delivery flow, and map-based order tracking.",
      imageUrl: "/images/coffee-shop-mockup.png",
      mainImageUrl: "/images/coffee-shop-mockup.png",
      images: [
        {
          url: "/images/coffee-shop-mockup.png",
          alt: "Coffee Shop mobile app mockup screens",
        },
      ],
      projectUrl: "https://github.com/ramibelhajsalem/coffee-shop",
      links: [
        {
          label: "GitHub",
          type: "github",
          url: "https://github.com/ramibelhajsalem/coffee-shop",
        },
      ],
      tags: ["Android", "Ios", "Mobile UI", "Kotlin", "KMM"],
      themes: ["Coffee", "Ordering", "Delivery", "Tracking", "Mobile Commerce"],
      gradient: "from-[#3b2518] to-[#d88a56]",
      accent: "rgba(216,138,86,0.92)",
      label: "COFFEE",
      isFeatured: true,
      isHidden: false,
      orderIndex: 4,
    },
    {
      id: "attijari-particulier",
      title: "Attijari Particulier",
      year: "2024",
      category: "Fintech Mobile App",
      description:
        "Refonte complète de l'application bancaire Attijari Particulier avec Jetpack Compose, intégration d'APIs REST et gestion des notifications Google Play.",
      imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=700&fit=crop",
      projectUrl: "https://example.com/attijari",
      links: [{ label: "Live App", type: "live", url: "https://example.com/attijari" }],
      tags: ["Kotlin", "Jetpack Compose", "MVVM", "Dagger/Hilt"],
      themes: ["Fintech", "Banking", "Android"],
      gradient: "from-[#1a3a5c] to-[#0d2137]",
      accent: "rgba(100,180,255,0.9)",
      label: "ATTIJARI",
      isFeatured: true,
      isHidden: false,
      orderIndex: 0,
    },
    {
      id: "myinwi",
      title: "MyInwi",
      year: "2022",
      category: "Telecom Mobile App",
      description:
        "Refonte de l'application MyInwi avec Material Design, intégration de services Google Play pour les notifications et abonnements, et optimisation des performances MVVM/RxJava.",
      imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=700&fit=crop",
      projectUrl: "https://example.com/myinwi",
      links: [{ label: "Live App", type: "live", url: "https://example.com/myinwi" }],
      tags: ["Kotlin", "MVVM", "RxJava", "Material Design"],
      themes: ["Telecom", "Android", "Performance"],
      gradient: "from-[#2d4f7a] to-[#1a3a5c]",
      accent: "rgba(80,200,180,0.9)",
      label: "INWI",
      isFeatured: true,
      isHidden: false,
      orderIndex: 1,
    },
    {
      id: "showroomz",
      title: "SHOWROOMZ",
      year: "2021",
      category: "Mobile App",
      description:
        "Application mobile de géolocalisation de showrooms avec Google Maps API, notifications en temps réel, et gestion locale des données avec Realm.",
      imageUrl: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=700&fit=crop",
      projectUrl: "https://example.com/showroomz",
      links: [{ label: "Live App", type: "live", url: "https://example.com/showroomz" }],
      tags: ["Kotlin", "Google Maps API", "Realm", "MVVM"],
      themes: ["Geolocation", "Retail", "Android"],
      gradient: "from-[#2d7a4f] to-[#1a5c3a]",
      accent: "rgba(184,240,42,0.8)",
      label: "SHOWROOMZ",
      isFeatured: true,
      isHidden: false,
      orderIndex: 2,
    },
    {
      id: "openbee-sphere",
      title: "OpenBee Sphère",
      year: "2020",
      category: "Cross-Platform App",
      description:
        "Application OpenBee Sphère développée en React Native avec intégration de web-services, tests de performance et participation aux cérémonies Agile.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=800&fit=crop",
      projectUrl: "https://example.com/openbee",
      links: [{ label: "Live App", type: "live", url: "https://example.com/openbee" }],
      tags: ["React Native", "Java", "RxJava", "Agile"],
      themes: ["Cross-Platform", "Enterprise", "Productivity"],
      gradient: "from-[#7a4f2d] to-[#5c3a1a]",
      accent: "rgba(255,200,80,0.9)",
      label: "OPENBEE",
      isFeatured: true,
      isHidden: false,
      orderIndex: 3,
    },
  ],

  testimonials: [
    {
      id: "leslie-alexander",
      quote:
        "The final product looked sharp, felt polished, and clearly reflected both product goals and visual quality.",
      clientName: "Leslie Alexander",
      clientRole: "Founder & CEO",
      clientCompany: "OPE Studio",
      avatarUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=250&fit=crop&crop=faces",
      isActive: true,
      orderIndex: 0,
    },
    {
      id: "courtney-henry",
      quote:
        "Strong communication, thoughtful details, and a clear eye for what makes an interface feel premium.",
      clientName: "Courtney Henry",
      clientRole: "Creative Director",
      clientCompany: "Northstar",
      avatarUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=250&fit=crop&crop=faces",
      isActive: true,
      orderIndex: 1,
    },
    {
      id: "marvin-mckinney",
      quote:
        "He brought order to a messy product phase and still managed to keep the experience expressive and refined.",
      clientName: "Marvin McKinney",
      clientRole: "Product Lead",
      clientCompany: "CandidatApp",
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=250&fit=crop&crop=faces",
      isActive: true,
      orderIndex: 2,
    },
  ],

  integrations: {
    googleAnalyticsId: "",
    plausibleDomain: "",
  },

  ai: {
    providers: [],
    models: [],
  },
} satisfies PortfolioContent;

export default portfolio;