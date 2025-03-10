/**
 * Theme Color Palette
 */
export const colors = {
  teal: {
    50: "#f0faf5",
    100: "#d1f0e0",
    200: "#a3e1c1",
    300: "#6ecf9e",
    400: "#3fb87a",
    500: "#2a9d61",
    600: "#1f7d4d",
    700: "#1B4D3E",
    800: "#164032",
    900: "#0F3D2E",
  },
  cream: {
    50: "#e9e5dd",
    100: "#e3dfd7",
    200: "#ddd9d1",
    300: "#d7d3cb",
    400: "#d9d2c8",
    500: "#cfc7bd",
    600: "#c5bfb3",
    700: "#bbb3a9",
    800: "#b1a99f",
    900: "#a79f95",
  },
  dark: {
    900: "#0f172a",
    800: "#1e293b",
  },
};

/**
 * Site Configuration
 */
export const siteConfig = {
  name: "Albert",
  description: "Frontend Developer Portfolio",
  author: "Albert",
  email: "info@albert.com",
  social: {
    facebook: "#",
    instagram: "#",
    twitter: "#",
    linkedin: "#",
  },
};

/**
 * Navigation Links
 */
export const navLinks = [
  { label: "Works", href: "#works" },
  { label: "About", href: "#about" },
  { label: "Testimonial", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks = [
  { name: "Facebook", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "Twitter", href: "#" },
  { name: "LinkedIn", href: "#" },
];

export const projects = [
  {
    id: 1,
    title: "Reality Affodils",
    year: "2024",
    category: "Web App",
    description:
      "An immersive 3D product experience built with Three.js and Vue, exploring augmented reality shopping concepts.",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=700&fit=crop",
    tags: ["Vue.js", "3D", "WebGL"],
    gradient: "from-[#2d7a4f] to-[#1a5c3a]",
    accent: "rgba(184,240,42,0.8)",
    label: "REALITY",
  },
  {
    id: 2,
    title: "Airma Consult",
    year: "2024",
    category: "Branding",
    description:
      "Brand identity and digital platform for a consulting firm — blending editorial design with functional clarity.",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=800&fit=crop",
    tags: ["React", "Branding", "Motion"],
    gradient: "from-[#333] to-[#111]",
    accent: "rgba(184,240,42,0.8)",
    label: "AIRMA",
  },
  {
    id: 3,
    title: "Tradicional Jardin",
    year: "2023",
    category: "E-Commerce",
    description:
      "A premium garden e-commerce experience with scroll-driven animations and custom product configurators.",
    image:
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&h=800&fit=crop",
    tags: ["Shopify", "CSS", "Animation"],
    gradient: "from-[#7a4f2d] to-[#5c3a1a]",
    accent: "rgba(255,200,80,0.9)",
    label: "JARDIN",
  },
  {
    id: 4,
    title: "CandidatApp",
    year: "2024",
    category: "SaaS",
    description:
      "Full-stack recruitment platform with real-time features, Cloudinary uploads, and a sophisticated Pinia store architecture.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=800&fit=crop",
    tags: ["Vue 3", "ASP.NET", "Pinia"],
    gradient: "from-[#2d4f7a] to-[#1a3a5c]",
    accent: "rgba(100,180,255,0.9)",
    label: "CANDIDAT",
  },
  {
    id: 5,
    title: "MindMap AI",
    year: "2024",
    category: "Mobile",
    description:
      "Cross-platform AI-powered note-taking app with CRDT sync strategy, MVI architecture, and a bold VOID GRAPH visual theme.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop",
    tags: ["Kotlin", "KMM", "AI"],
    gradient: "from-[#4f7a2d] to-[#3a5c1a]",
    accent: "rgba(150,255,100,0.9)",
    label: "MINDMAP",
  },
  {
    id: 6,
    title: "AI Agent Studio",
    year: "2024",
    category: "Experiment",
    description:
      "A ReAct-pattern AI agent with short-term, long-term, and episodic memory types — built as a single-file Java implementation.",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=800&fit=crop",
    tags: ["Java", "ReAct", "LLM"],
    gradient: "from-[#7a2d4f] to-[#5c1a3a]",
    accent: "rgba(255,150,200,0.9)",
    label: "AGENT",
  },
];

export const workExperience = [
  {
    title: "Work Experience",
    description:
      "This is a student in interactive development at Gobelins and is currently doing his apprenticeship.",
  },
];

export const testimonials = [
  {
    name: "Leslie Alexander",
    role: "Founder & CEO OPE Studio",
    quote:
      "Thanks to the efforts Albert, your successfully exceeded the client's business goals. The end client commended the eye-catching and functional website positively. Although your works remotely, the evidently established effective communication.",
  },
  {
    name: "Esther Howard",
    role: "Digital Marketing Manager",
    quote:
      "The site improved our digital presence exponentially. The team's approach to design was effective, quick & delivered outstanding results.",
  },
];

export const footerLinks = {
  quickLinks: [
    { label: "Works", href: "#works" },
    { label: "About Me", href: "#about" },
    { label: "Testimonial", href: "#testimonials" },
  ],
  address: {
    street: "Spaansekal 14, 3rd Floor",
    city: "1411 AI Eindhoven",
    country: "The Netherlands",
  },
  social: [
    { name: "Facebook", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "Twitter", href: "#" },
  ],
};

/**
 * Transition Timing
 */
export const transitions = {
  fast: "150ms",
  base: "300ms",
  slow: "500ms",
};
