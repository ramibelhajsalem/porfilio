import type { PortfolioContent } from "./portfolio.types";

export const portfolio = {
  // Main site metadata used in <head>, footer, and contact links.
  site: {
    name: "Nidhal", // Main brand name shown in the navbar logo.
    title: "Nidhal | Mobile Apps Engenier",
    description:
      "Frontend developer portfolio focused on polished interfaces, motion, and creative web experiences.",
    author: "Nidhal",
    url: "https://yourdomain.com",
    locale: "en_US",
    robots: "index, follow",
    keywords: ["Frontend Developer", "React", "Next.js", "Portfolio"],
    email: "hello@nidhalkh.com",
    supportEmail: "hello@nidhalkh.com",
    ogImage: "/images/og-cover.png",
    twitterHandle: "@nidhaldev",
  },

  // Theme tokens wired into CSS variables in src/app/layout.tsx.
  theme: {
    primaryColor: "#1B4D3E",
    accentColor: "#b8f02a",
    backgroundColor: "#ffffff",
    surfaceColor: "#f8fafc",
    foregroundColor: "#0f172a",
    mutedColor: "#64748b",
  },

  // Personal information reused across hero, contact, and footer sections.
  personalInfo: {
    firstName: "Ahmed",
    fullName: "Nidhal Kh",
    title: "Front-End Developer",
    subtitle: "Front-End-Developer-Code",
    bio: "I build modern interfaces with strong motion, sharp typography, and clean product thinking.",
    bioExtended:
      "I enjoy crafting digital experiences that feel intentional, technical, and memorable. My work blends UI systems, interaction design, and solid implementation details.",
    avatarUrl: "/images/user1.png",
    avatarAlt: "Nidhal portrait",
    email: "hello@nidhalkh.com",
    location: "Tunis, Tunisia",
    locationDetail: "Available for remote collaborations worldwide",
    timezone: "Africa/Tunis",
    responseTime: "24 hours",
    availability: true,
  },

  // Navigation links used in the main navbar and footer quick links.
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

  // Social links shown in the navbar, footer, and contact page.
  socialLinks: [
    { platform: "linkedin", label: "LinkedIn", href: "https://linkedin.com", isActive: true },
    { platform: "github", label: "GitHub", href: "https://github.com", isActive: true },
    { platform: "instagram", label: "Instagram", href: "https://instagram.com", isActive: true },
    { platform: "x", label: "Twitter", href: "https://x.com", isActive: true },
  ],

  footer: {
    emailLabel: "Email me for quick conversation",
    quickLinksTitle: "Quick Links",
    addressTitle: "Address",
    followTitle: "Follow",
    copyrightName: "Nidhal",
    address: {
      street: "Lac 2, Office 14",
      city: "Tunis 1053",
      country: "Tunisia",
    },
  },

  homePage: {
    hero: {
      greeting: "Hi there, I'm Nidhal",
      titleWords: ["Front", "End", "Developer"],
      bio: "I design and build elegant interfaces with motion, structure, and a strong attention to detail.",
      photoUrl: "/images/user1.png",
      photoAlt: "Nidhal profile photo",
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
        "I work across portfolio sites, SaaS products, dashboards, and brand-forward digital experiences.",
      aboutDescription:
        "I care about clean systems, motion that feels purposeful, and interfaces that leave a strong impression without becoming noisy.",
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

  // Change only these fields if you want to update the texts on /works.
  worksPage: {
    hero: {
      backToHomeLabel: "Back to home",
      roleLabel: "Mobile Apps Developer",
      headingLine1: "I BUILD",
      headingLine2: "DIGITAL",
      headingLine3: "WORLDS",
      description:
        "A creative front-end developer with a strong focus on motion and interaction - turning ideas into unforgettable web experiences.",
      primaryCtaLabel: "View Works",
      primaryCtaHref: "#works",
      secondaryCtaLabel: "Let's Talk",
      secondaryCtaHref: "#cta",
      scrollHintLabel: "Scroll to explore",
      panelLine1: "FRONT",
      panelLine2: "END",
      panelLine3: "DEV",
      availabilityBadge: "Open to work",
    },
    marqueeSkills: [
      "Vue.js",
      "React",
      "TypeScript",
      "ASP.NET Core",
      "Motion Design",
      "UI/UX",
      "Tailwind CSS",
      "Kotlin",
    ],
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
      headingLine1: "CREATIVE",
      headingLine2: "DEVELOPER",
      headingLine3: "BY NATURE",
      description:
        "I'm a full-stack developer obsessed with the intersection of design and engineering. From Vue 3 SPAs to Kotlin Multiplatform apps, I build things that move, feel alive, and solve real problems. Currently exploring AI-powered applications and real-time collaborative experiences.",
      imageLabel: "ALBERT",
      stats: [
        { num: "5+", label: "Years crafting" },
        { num: "20+", label: "Projects shipped" },
        { num: "∞", label: "Curiosity level" },
        { num: "01", label: "Focused vision" },
      ],
    },
  },

  contactPage: {
    rotatingBadgeWords: ["GET IN TOUCH", "LET'S TALK", "SAY HELLO"],
    marqueeItems: ["Available for freelance", "Open to collaboration", "Let's build something great"],
    eyebrow: "Have a project in mind?",
    headingLine1: "Let's work",
    headingLine2: "together.",
    description:
      "I am always open to new collaborations, product ideas, redesigns, and ambitious front-end builds.",
    emailLabel: "Email",
    locationLabel: "Based in",
    followLabel: "Follow me",
    availabilityText: "Available for new projects",
    projectDetailsLabel: "Project details",
    secureFormLabel: "Direct contact",
    responseTimeText: "I typically respond within 24 hours",
    copyEmailLabel: "Copy email",
    copiedEmailLabel: "Copied!",
    form: {
      nameLabel: "Your name",
      emailLabel: "Email address",
      companyLabel: "Company / Organization",
      projectTypeLabel: "Project type (e.g. Web App, Branding, Mobile)",
      messageLabel: "Tell me about your project",
      budgetLabel: "Project budget",
      budgetOptions: ["< $5k", "$5k - $10k", "$10k - $25k", "$25k+"],
      submitLabel: "Send message",
      sendingLabel: "Opening email...",
      successMessage: "Your email client should open with the project details ready to send.",
      subjectPrefix: "Project inquiry",
    },
  },

  // Toggle isHidden to true if you want a project to disappear from the site.
  projects: [
    {
      id: "reality-affodils",
      title: "Reality Affodils",
      year: "2024",
      category: "Web App",
      description:
        "An immersive 3D product experience built with Three.js and Vue, exploring augmented reality shopping concepts.",
      imageUrl: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=700&fit=crop",
      projectUrl: "https://example.com/reality-affodils",
      tags: ["Vue.js", "3D", "WebGL"],
      gradient: "from-[#2d7a4f] to-[#1a5c3a]",
      accent: "rgba(184,240,42,0.8)",
      label: "REALITY",
      isFeatured: true,
      isHidden: false,
      orderIndex: 0,
    },
    {
      id: "airma-consult",
      title: "Airma Consult",
      year: "2024",
      category: "Branding",
      description:
        "Brand identity and digital platform for a consulting firm blending editorial rhythm with functional clarity.",
      imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=800&fit=crop",
      projectUrl: "https://example.com/airma-consult",
      tags: ["React", "Branding", "Motion"],
      gradient: "from-[#333] to-[#111]",
      accent: "rgba(184,240,42,0.8)",
      label: "AIRMA",
      isFeatured: true,
      isHidden: false,
      orderIndex: 1,
    },
    {
      id: "tradicional-jardin",
      title: "Tradicional Jardin",
      year: "2023",
      category: "E-Commerce",
      description:
        "A premium garden commerce experience with scroll-driven animation and custom product configuration.",
      imageUrl: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&h=800&fit=crop",
      projectUrl: "https://example.com/tradicional-jardin",
      tags: ["Shopify", "CSS", "Animation"],
      gradient: "from-[#7a4f2d] to-[#5c3a1a]",
      accent: "rgba(255,200,80,0.9)",
      label: "JARDIN",
      isFeatured: true,
      isHidden: false,
      orderIndex: 2,
    },
    {
      id: "candidatapp",
      title: "CandidatApp",
      year: "2024",
      category: "SaaS",
      description:
        "A recruitment platform with real-time features, internal tooling, and a strong product UX foundation.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=800&fit=crop",
      projectUrl: "https://example.com/candidatapp",
      tags: ["Vue 3", "ASP.NET", "Pinia"],
      gradient: "from-[#2d4f7a] to-[#1a3a5c]",
      accent: "rgba(100,180,255,0.9)",
      label: "CANDIDAT",
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
