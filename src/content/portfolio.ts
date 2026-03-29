import type { PortfolioContent } from "./portfolio.types";

export const portfolio = {
  // Core person/profile data. Update identity, bio, email, socials, and location here.
  profile: {
    identity: {
      firstName: "Nidhal",
      lastName: "Belhaj Salem",
      displayName: "Nidhal",
      fullName: "Nidhal Belhaj Salem",
      headline: "Mobile Android R&D Engineer",
      subtitle: "Mobile-Android-Developer",
      avatar: {
        url: "/images/user1.png",
        alt: "Nidhal portrait",
      },
    },

    summary: {
      short: "Android R&D engineer with 6+ years of experience building modern, optimized mobile applications.",
      long:
        "Mobile Android R&D Engineer with over 6 years of experience in mobile application engineering using V-cycle and Agile methodologies. Passionate about technological innovation and R&D, I am seeking opportunities in the digital space, with expertise in designing and developing modern, optimized Android applications.",
    },

    contact: {
      email: "nidhal.belhadjsalem@gmail.com",
      supportEmail: "nidhal.belhadjsalem@gmail.com",
      phone: "+212 707747725",
      website: "https://porfilio-hazel.vercel.app",
      location: {
        label: "Casablanca, Morocco",
        detail: "Available for remote collaborations worldwide",
        city: "Casablanca",
        country: "Morocco",
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
        role: "Mobile Android R&D Engineer",
        company: "Attijariwafa Bank – Babel",
        employmentType: "Full-time",
        start: "2024-03",
        end: "Present",
        location: "Casablanca, Morocco",
        summary:
          "Full redesign of the Attijari Particulier application. Development of Android interfaces using the latest Android technologies, API integration, and notification management.",
        achievements: [
          "Full redesign of the Attijari Particulier application.",
          "Development of Android interfaces using Kotlin and Jetpack Compose.",
          "Integration of web services and APIs (Retrofit, Coroutines).",
          "Notification management and Google Play services integration.",
          "Participation in Agile ceremonies (Scrum) and code reviews.",
        ],
        technologies: ["Kotlin", "Jetpack Compose", "Retrofit", "Coroutines", "MVVM", "Dagger/Hilt", "Firebase Crashlytics", "JUnit"],
      },
      {
        id: "exp-daralamane",
        role: "Mobile Android R&D Engineer",
        company: "Dar Al Amane – Babel",
        employmentType: "Full-time",
        start: "2022-06",
        end: "2024-03",
        location: "Casablanca, Morocco",
        summary:
          "Complete redesign of the Dar Al Amane mobile application. UI design, Google Maps API integration, and collaboration with the Scrum team.",
        achievements: [
          "Complete redesign of the Dar Al Amane mobile application.",
          "User interface design using Kotlin and Jetpack.",
          "Google Maps API service integration.",
          "Collaboration with the Scrum team and user story review.",
          "Unit testing and bug fixing reported by the QA team.",
        ],
        technologies: ["Kotlin", "Jetpack", "MVVM", "Retrofit", "Coroutines", "Koin", "JUnit"],
      },
      {
        id: "exp-cbao",
        role: "Mobile Android R&D Engineer",
        company: "ADRIA BUSINESS & TECHNOLOGY – CBAO Groupe Attijariwafa Bank",
        employmentType: "Full-time",
        start: "2022-04",
        end: "2022-06",
        location: "Casablanca, Morocco",
        summary:
          "Evolution of the CBAO mobile application. Android UI development, web service integration, and participation in mobile architecture design.",
        achievements: [
          "Evolution of the CBAO mobile application.",
          "Android UI development and web service integration.",
          "Participation in mobile architecture design.",
        ],
        technologies: ["Kotlin", "MVVM", "RxJava", "Retrofit", "Git"],
      },
      {
        id: "exp-inwi",
        role: "Mobile Android R&D Engineer",
        company: "Mobiblanc – Inwi",
        employmentType: "Full-time",
        start: "2021-09",
        end: "2022-04",
        location: "Casablanca, Morocco",
        summary:
          "Participated in the redesign of the MyInwi application, with a focus on performance improvements and user experience.",
        achievements: [
          "Participated in the redesign of the MyInwi application.",
          "Interface development following Material Design guidelines.",
          "Integration of Google Play services for notifications and subscription management.",
          "MVVM architecture optimization using RxJava for asynchronous handling.",
          "Collaboration with product and backend teams to integrate new APIs via Retrofit.",
        ],
        technologies: ["Kotlin", "MVVM", "Jetpack", "Retrofit", "Dagger", "RxJava", "Firebase Crashlytics"],
      },
      {
        id: "exp-showroomz",
        role: "Mobile Android R&D Engineer",
        company: "SHOWROOMZ",
        employmentType: "Full-time",
        start: "2020-03",
        end: "2021-09",
        location: "Tunisia",
        summary:
          "Improvement and maintenance of the SHOWROOMZ mobile app, showroom geolocation via Google Maps, and adoption of MVVM architecture with Jetpack components.",
        achievements: [
          "Improvement and maintenance of the SHOWROOMZ mobile application.",
          "Development of showroom geolocation using the Google Maps API.",
          "Integration of Google Play services for real-time notifications.",
          "Use of Realm for efficient local data management.",
          "Adoption of MVVM architecture with Jetpack components for better modularity.",
        ],
        technologies: ["Kotlin", "Jetpack", "MVVM", "Retrofit", "Realm", "RxJava", "Google Maps API"],
      },
      {
        id: "exp-openbee",
        role: "Mobile Android/React Native R&D Engineer",
        company: "Open Bee",
        employmentType: "Full-time",
        start: "2019-03",
        end: "2020-03",
        location: "Tunis, Tunisia",
        summary:
          "Development of the OpenBee Sphère application in React Native. Team collaboration on User Story reviews and participation in Agile ceremonies.",
        achievements: [
          "Development of the OpenBee Sphère application in React Native.",
          "Team collaboration on User Story and UX flow reviews.",
          "Participation in Agile ceremonies: Sprint Planning, Retrospective, and Stand-Up meetings.",
          "Web service integration and debugging of issues reported by the QA team.",
          "Performance testing and technical support for the Open Bee Mobile application.",
        ],
        technologies: ["React Native", "Java", "RxJava", "Retrofit", "Realm", "Crashlytics", "Git", "Jira"],
      },
      {
        id: "exp-peak",
        role: "Android Developer",
        company: "Peak Technologies",
        employmentType: "Full-time",
        start: "2017-12",
        end: "2019-03",
        location: "Sousse, Tunisia",
        summary:
          "Development of the Bounou mobile application in the finance sector. UI design, Google Play and Google Maps service integration.",
        achievements: [
          "Development of the Bounou mobile application in the finance sector.",
          "Android user interface design and Google Play and Google Maps service integration.",
          "Participation in mobile architecture design and technical specifications.",
          "Debugging and notification management, with weekly releases in the staging environment.",
        ],
        technologies: ["Kotlin", "MVVM", "RxJava", "Jetpack", "Retrofit", "Crashlytics", "Git", "Redmine"],
      },
    ],
    education: [
      {
        id: "edu-ingenieur",
        school: "EPI-Sousse",
        degree: "Engineering Degree in Computer Science",
        start: "2016",
        end: "2019",
        location: "Sousse, Tunisia",
      },
      {
        id: "edu-licence",
        school: "Higher Institute",
        degree: "Applied Bachelor's Degree in Computer Science",
        start: "2013",
        end: "2016",
        location: "Tunisia",
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
      title: "Android Developer | Nidhal Belhaj Salem",
      description:
        "Android R&D Engineer with 6+ years building high-performance apps using Kotlin & Jetpack Compose. Available for fintech, telecom & SaaS projects.",
      author: "Nidhal Belhaj Salem",
      url: "https://porfilio-hazel.vercel.app",
      locale: "en_MA",
      robots: "index, follow",
      keywords: [
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
        "software engineer freelancer",
        "software developer freelancer",
        "#softwarefreelancer",
        "#softwarefreelancers",
        "project management software freelancer",
        "how to start a career as a freelance developer",
        "how to find freelance platforms",
        "Android developer",
        "mobile app developer",
        "Android engineer",
        "freelance Android developer",
        "freelance mobile app developer",
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
        "Android fintech developer",
        "Android banking app developer",
        "Android telecom app developer",
        "custom Android app development",
        "native Android app development",
        "Android app developer for hire",
        "Android R&D engineer",
        "senior Android developer Morocco",
        "Android developer Casablanca",
        "freelance Android developer",
        "freelance mobile Android engineer",
        "Kotlin Jetpack Compose engineer",
        "freelance Kotlin developer",
        "freelance mobile developer",
        "freelance mobile app developer",
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
        { label: "About", href: "/about", openNewTab: false, isActive: true },
        { label: "Testimonials", href: "#testimonials", openNewTab: false, isActive: true },
        { label: "Contact", href: "/contact", openNewTab: false, isActive: true },
      ],
      footer: [
        { label: "Works", href: "/works", openNewTab: false, isActive: true },
        { label: "About Me", href: "/about", openNewTab: false, isActive: true },
        { label: "Testimonials", href: "#testimonials", openNewTab: false, isActive: true },
      ],
    },
    footer: {
      emailLabel: "Email me for a quick conversation",
      quickLinksTitle: "Quick Links",
      addressTitle: "Address",
      followTitle: "Follow",
      address: {
        street: "Casablanca",
        city: "Casablanca",
        country: "Morocco",
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
          "Mobile Android R&D Engineer with expertise in designing modern Android applications, MVVM and Clean Architecture patterns, and Agile methodologies.",
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
          "Mobile Android R&D Engineer with over 6 years of experience in mobile application engineering using V-cycle and Agile methodologies. Passionate about technological innovation and R&D, with expertise in designing and developing modern, optimized Android applications.",
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

    about: {
      backToHomeLabel: "Back to home",
      hero: {
        eyebrow: "About Me",
        headingLine1: "BUILDING",
        headingLine2: "MOBILE",
        headingLine3: "EXPERIENCES",
        description:
          "Mobile Android R&D Engineer with over 6 years of experience in mobile application engineering using V-cycle and Agile methodologies. Passionate about technological innovation and R&D, with expertise in designing and developing modern, optimized Android applications.",
        stats: [
          { num: "6+", label: "Years of Experience" },
          { num: "10+", label: "Apps Shipped" },
          { num: "7+", label: "Companies" },
          { num: "3", label: "Languages Spoken" },
        ],
      },
      experience: {
        eyebrow: "Career Path",
        heading: "Experience",
      },
      education: {
        eyebrow: "Academic Background",
        heading: "Education",
      },
      skills: {
        eyebrow: "Technical Arsenal",
        heading: "Skills",
        categories: [
          { key: "featured", label: "Core" },
          { key: "mobile", label: "Mobile" },
          { key: "frontend", label: "Frontend" },
          { key: "backend", label: "Backend & APIs" },
          { key: "tools", label: "Tools & DevOps" },
        ],
      },
      languages: {
        eyebrow: "Communication",
        heading: "Languages",
      },
      cta: {
        heading: "Let's Build Something Together",
        description:
          "Always open to new collaborations, product ideas, and ambitious Android mobile builds.",
        buttonLabel: "Get In Touch",
        buttonHref: "/contact",
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
        "Complete redesign of the Attijari Particulier banking application with Jetpack Compose, REST API integration, and Google Play notification management.",
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
        "Redesign of the MyInwi application with Material Design, Google Play services integration for notifications and subscriptions, and MVVM/RxJava performance optimization.",
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
        "Showroom geolocation mobile application using the Google Maps API, real-time notifications, and local data management with Realm.",
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
        "OpenBee Sphère application built in React Native with web service integration, performance testing, and participation in Agile ceremonies.",
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