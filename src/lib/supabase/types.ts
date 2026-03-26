// ============================================================
// Supabase Database Types — auto-derived from schema
// ============================================================

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      personal_info: {
        Row: PersonalInfo;
        Insert: Omit<PersonalInfo, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<PersonalInfo, "id" | "created_at">>;
      };
      social_links: {
        Row: SocialLink;
        Insert: Omit<SocialLink, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<SocialLink, "id" | "created_at">>;
      };
      nav_links: {
        Row: NavLink;
        Insert: Omit<NavLink, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<NavLink, "id" | "created_at">>;
      };
      projects: {
        Row: Project;
        Insert: Omit<Project, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Project, "id" | "created_at">>;
      };
      testimonials: {
        Row: Testimonial;
        Insert: Omit<Testimonial, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Testimonial, "id" | "created_at">>;
      };
      page_sections: {
        Row: PageSection;
        Insert: Omit<PageSection, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<PageSection, "id" | "created_at">>;
      };
      site_config: {
        Row: SiteConfig;
        Insert: Omit<SiteConfig, "id" | "updated_at">;
        Update: Partial<Omit<SiteConfig, "id">>;
      };
      images: {
        Row: PortfolioImage;
        Insert: Omit<PortfolioImage, "id" | "created_at">;
        Update: Partial<Omit<PortfolioImage, "id" | "created_at">>;
      };
      contact_submissions: {
        Row: ContactSubmission;
        Insert: Omit<ContactSubmission, "id" | "created_at">;
        Update: Partial<Omit<ContactSubmission, "id" | "created_at">>;
      };
    };
  };
}

// ─── Row types ───────────────────────────────────────────────

export interface PersonalInfo {
  id: string;
  name: string;
  first_name: string;
  title: string;
  subtitle: string | null;
  bio: string | null;
  bio_extended: string | null;
  email: string;
  location: string | null;
  location_detail: string | null;
  availability: boolean;
  avatar_url: string | null;
  timezone: string | null;
  response_time: string | null;
  created_at: string;
  updated_at: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string | null;
  label: string | null;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
  order_index: number;
  is_active: boolean;
  open_new_tab: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  year: string;
  category: string;
  description: string;
  image_url: string | null;
  project_url: string | null;
  tags: string[];
  gradient: string | null;
  accent: string | null;
  label: string | null;
  is_featured: boolean;
  is_hidden: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  client_name: string;
  client_role: string;
  client_company: string | null;
  avatar_url: string | null;
  is_active: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface PageSection {
  id: string;
  page: string;
  section: string;
  content: Json;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteConfig {
  id: string;
  key: string;
  value: string | null;
  type: "text" | "json" | "boolean" | "color";
  label: string | null;
  group_name: string | null;
  updated_at: string;
}

export interface PortfolioImage {
  id: string;
  name: string;
  url: string;
  storage_path: string | null;
  alt: string | null;
  width: number | null;
  height: number | null;
  section: string | null;
  mime_type: string | null;
  size_bytes: number | null;
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string | null;
  project_type: string | null;
  budget: string | null;
  message: string;
  is_read: boolean;
  is_archived: boolean;
  created_at: string;
}

// ─── Section Content shapes ───────────────────────────────────

export interface HeroSectionContent {
  greeting: string;
  name: string;
  title_word1: string;
  title_word2: string;
  title_word3: string;
  bio: string;
  photo_url: string;
  photo_alt: string;
}

export interface AboutSectionContent {
  headline1: string;
  headline2: string;
  passion_description: string;
  work_experience_title: string;
  work_experience_text: string;
  about_description: string;
  inline_image_url: string;
  grid_image1_url: string;
  grid_image2_url: string;
}

export interface WorkstationSectionContent {
  heading: string;
  description: string;
  images: Array<{ url: string; alt: string }>;
}

export interface ContactSectionContent {
  headline: string;
  marquee_text: string;
  availability_text: string;
  form_heading: string;
  project_types: string[];
  budget_options: string[];
}
