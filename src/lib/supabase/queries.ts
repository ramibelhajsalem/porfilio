/**
 * Data access layer — all Supabase reads for the public portfolio.
 * Falls back to static constants when Supabase is not configured.
 */

import {
  projects as staticProjects,
  testimonials as staticTestimonials,
  navLinks as staticNavLinks,
  socialLinks as staticSocialLinks,
  siteConfig as staticSiteConfig,
} from "@/lib/constants";
import type {
  Project,
  PersonalInfo,
  SocialLink,
  NavLink,
  Testimonial,
  PageSection,
  HeroSectionContent,
  AboutSectionContent,
  WorkstationSectionContent,
  ContactSectionContent,
} from "./types";

function isSupabaseConfigured() {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "YOUR_SUPABASE_URL"
  );
}

// ─── Personal Info ─────────────────────────────────────────────
export async function getPersonalInfo(): Promise<PersonalInfo> {
  if (!isSupabaseConfigured()) return staticPersonalInfo;

  const { createClient } = await import("./server");
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("personal_info")
    .select("*")
    .single();

  if (error || !data) return staticPersonalInfo;
  return data;
}

// ─── Projects ──────────────────────────────────────────────────
export async function getProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured()) return staticProjects.map(projectFromStatic);

  const { createClient } = await import("./server");
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_hidden", false)
    .order("order_index");

  if (error || !data?.length) return staticProjects.map(projectFromStatic);
  return data;
}

export async function getAllProjects(): Promise<Project[]> {
  const { createClient } = await import("./server");
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("order_index");
  return data ?? [];
}

// ─── Testimonials ──────────────────────────────────────────────
export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured())
    return staticTestimonials.map(testimonialFromStatic);

  const { createClient } = await import("./server");
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_active", true)
    .order("order_index");

  if (error || !data?.length)
    return staticTestimonials.map(testimonialFromStatic);
  return data;
}

// ─── Nav Links ─────────────────────────────────────────────────
export async function getNavLinks(): Promise<NavLink[]> {
  if (!isSupabaseConfigured()) return staticNavLinks.map(navLinkFromStatic);

  const { createClient } = await import("./server");
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("nav_links")
    .select("*")
    .eq("is_active", true)
    .order("order_index");

  if (error || !data?.length) return staticNavLinks.map(navLinkFromStatic);
  return data;
}

// ─── Social Links ──────────────────────────────────────────────
export async function getSocialLinks(): Promise<SocialLink[]> {
  if (!isSupabaseConfigured())
    return staticSocialLinks.map(socialLinkFromStatic);

  const { createClient } = await import("./server");
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("social_links")
    .select("*")
    .eq("is_active", true)
    .order("order_index");

  if (error || !data?.length)
    return staticSocialLinks.map(socialLinkFromStatic);
  return data;
}

// ─── Page Sections ─────────────────────────────────────────────
export async function getPageSection(
  page: string,
  section: string
): Promise<PageSection | null> {
  if (!isSupabaseConfigured()) return null;

  const { createClient } = await import("./server");
  const supabase = await createClient();
  const { data } = await supabase
    .from("page_sections")
    .select("*")
    .eq("page", page)
    .eq("section", section)
    .single();

  return data;
}

export async function getHeroContent(): Promise<HeroSectionContent> {
  const section = await getPageSection("home", "hero");
  if (!section) return defaultHeroContent;
  return section.content as HeroSectionContent;
}

export async function getAboutContent(): Promise<AboutSectionContent> {
  const section = await getPageSection("home", "about");
  if (!section) return defaultAboutContent;
  return section.content as AboutSectionContent;
}

export async function getWorkstationContent(): Promise<WorkstationSectionContent> {
  const section = await getPageSection("home", "workstation");
  if (!section) return defaultWorkstationContent;
  return section.content as WorkstationSectionContent;
}

export async function getContactContent(): Promise<ContactSectionContent> {
  const section = await getPageSection("contact", "hero");
  if (!section) return defaultContactContent;
  return section.content as ContactSectionContent;
}

// ─── Site Config ───────────────────────────────────────────────
export async function getSiteConfig(
  key: string
): Promise<string | null> {
  if (!isSupabaseConfigured()) return null;

  const { createClient } = await import("./server");
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_config")
    .select("value")
    .eq("key", key)
    .single();

  return data?.value ?? null;
}

// ─── Static fallback shapes ────────────────────────────────────

const staticPersonalInfo: PersonalInfo = {
  id: "static",
  name: staticSiteConfig.name,
  first_name: staticSiteConfig.name,
  title: "Front-End Developer",
  subtitle: "Front-End-Developer-Code",
  bio: "I am a creative front-end developer with a strong focus on motion and interaction.",
  bio_extended:
    "An adept of Scandinavian culture and lifestyle. He draws daily inspiration from their minimalist philosophy and has developed",
  email: staticSiteConfig.email,
  location: "Eindhoven, The Netherlands",
  location_detail: "Open to remote worldwide",
  availability: true,
  avatar_url: "/images/user1.png",
  timezone: "Europe/Amsterdam",
  response_time: "24 hours",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

function projectFromStatic(p: (typeof staticProjects)[number]): Project {
  return {
    id: String(p.id),
    title: p.title,
    year: p.year,
    category: p.category,
    description: p.description,
    image_url: p.image,
    project_url: null,
    tags: p.tags,
    gradient: p.gradient,
    accent: p.accent,
    label: p.label,
    is_featured: true,
    is_hidden: false,
    order_index: p.id - 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

function testimonialFromStatic(
  t: (typeof staticTestimonials)[number],
  i: number
): Testimonial {
  return {
    id: String(i),
    quote: t.quote,
    client_name: t.name,
    client_role: t.role,
    client_company: null,
    avatar_url: null,
    is_active: true,
    order_index: i,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

function navLinkFromStatic(
  n: (typeof staticNavLinks)[number],
  i: number
): NavLink {
  return {
    id: String(i),
    label: n.label,
    href: n.href,
    order_index: i,
    is_active: true,
    open_new_tab: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

function socialLinkFromStatic(
  s: (typeof staticSocialLinks)[number],
  i: number
): SocialLink {
  return {
    id: String(i),
    platform: s.name.toLowerCase(),
    url: s.href,
    icon: s.name,
    label: s.name,
    order_index: i,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

const defaultHeroContent: HeroSectionContent = {
  greeting: "Hi there, I'm Albert 👋",
  name: "Albert",
  title_word1: "Front",
  title_word2: "End",
  title_word3: "Developer",
  bio: "I am a creative front-end developer with a strong focus on motion and interaction.",
  photo_url: "/images/user1.png",
  photo_alt: "Albert - Front-End Developer",
};

const defaultAboutContent: AboutSectionContent = {
  headline1: "Passionate",
  headline2: "About Development",
  passion_description:
    "Innovation and storytelling. Interested about conception and creating interactive experiences.",
  work_experience_title: "Work Experience",
  work_experience_text:
    "Theo is a student in interactive development at Goblins and is currently doing his apprenticeship",
  about_description:
    "An adept of Scandinavian culture and lifestyle. He draws daily inspiration from their minimalist philosophy and has developed",
  inline_image_url:
    "https://images.unsplash.com/photo-1685062428479-e310b7851de5?w=300&h=300",
  grid_image1_url:
    "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&h=500&fit=crop",
  grid_image2_url:
    "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=400&h=500&fit=crop",
};

const defaultWorkstationContent: WorkstationSectionContent = {
  heading: "My Workstation",
  description: "Where ideas come to life",
  images: [
    {
      url: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=600&fit=crop",
      alt: "Workspace setup",
    },
    {
      url: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&h=600&fit=crop",
      alt: "Coding session",
    },
    {
      url: "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?w=800&h=600&fit=crop",
      alt: "Multiple screens",
    },
    {
      url: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=600&fit=crop",
      alt: "Devices",
    },
  ],
};

const defaultContactContent: ContactSectionContent = {
  headline: "Let's work together.",
  marquee_text:
    "Available for freelance  •  Open to collaboration  •  Let's build something great",
  availability_text: "Available for new projects",
  form_heading: "Tell me about your project",
  project_types: ["Web App", "E-Commerce", "Branding", "Mobile App", "Other"],
  budget_options: ["< $5k", "$5k – $10k", "$10k – $25k", "$25k+"],
};
