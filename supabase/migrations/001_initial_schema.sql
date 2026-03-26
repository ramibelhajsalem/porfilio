-- ============================================================
-- PORTFOLIO CMS — Initial Schema
-- Run this against your Supabase project to bootstrap the DB.
-- ============================================================

-- ─── Extensions ────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─── Helpers ───────────────────────────────────────────────
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ═══════════════════════════════════════════════════════════
-- 1. PERSONAL INFO
-- ═══════════════════════════════════════════════════════════
create table if not exists personal_info (
  id              uuid primary key default uuid_generate_v4(),
  name            text not null default 'Albert',
  first_name      text not null default 'Albert',
  title           text not null default 'Front-End Developer',
  subtitle        text default 'Front-End-Developer-Code',
  bio             text default 'I am a creative front-end developer with a strong focus on motion and interaction.',
  bio_extended    text default 'An adept of Scandinavian culture and lifestyle. He draws daily inspiration from their minimalist philosophy.',
  email           text not null default 'info@albert.com',
  location        text default 'Eindhoven, The Netherlands',
  location_detail text default 'Open to remote worldwide',
  availability    boolean not null default true,
  avatar_url      text,
  timezone        text default 'Europe/Amsterdam',
  response_time   text default '24 hours',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create trigger trg_personal_info_updated_at
  before update on personal_info
  for each row execute function set_updated_at();

-- Only one row allowed
create unique index if not exists personal_info_single_row on personal_info ((true));

-- ═══════════════════════════════════════════════════════════
-- 2. SOCIAL LINKS
-- ═══════════════════════════════════════════════════════════
create table if not exists social_links (
  id          uuid primary key default uuid_generate_v4(),
  platform    text not null,               -- twitter, linkedin, instagram, facebook, github...
  url         text not null default '#',
  icon        text,                         -- lucide icon name
  label       text,                         -- display label
  order_index integer not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create trigger trg_social_links_updated_at
  before update on social_links
  for each row execute function set_updated_at();

-- ═══════════════════════════════════════════════════════════
-- 3. NAV LINKS
-- ═══════════════════════════════════════════════════════════
create table if not exists nav_links (
  id          uuid primary key default uuid_generate_v4(),
  label       text not null,
  href        text not null,
  order_index integer not null default 0,
  is_active   boolean not null default true,
  open_new_tab boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create trigger trg_nav_links_updated_at
  before update on nav_links
  for each row execute function set_updated_at();

-- ═══════════════════════════════════════════════════════════
-- 4. PROJECTS
-- ═══════════════════════════════════════════════════════════
create table if not exists projects (
  id              uuid primary key default uuid_generate_v4(),
  title           text not null,
  year            text not null,
  category        text not null,
  description     text not null,
  image_url       text,
  project_url     text,
  tags            text[] not null default '{}',
  gradient        text default 'from-[#2d7a4f] to-[#1a5c3a]',
  accent          text default 'rgba(184,240,42,0.8)',
  label           text,
  is_featured     boolean not null default true,
  is_hidden       boolean not null default false,
  order_index     integer not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create trigger trg_projects_updated_at
  before update on projects
  for each row execute function set_updated_at();

-- ═══════════════════════════════════════════════════════════
-- 5. TESTIMONIALS
-- ═══════════════════════════════════════════════════════════
create table if not exists testimonials (
  id           uuid primary key default uuid_generate_v4(),
  quote        text not null,
  client_name  text not null,
  client_role  text not null,
  client_company text,
  avatar_url   text,
  is_active    boolean not null default true,
  order_index  integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create trigger trg_testimonials_updated_at
  before update on testimonials
  for each row execute function set_updated_at();

-- ═══════════════════════════════════════════════════════════
-- 6. PAGE SECTIONS
-- Stores per-section editable content as JSON.
-- page: home | works | contact
-- section: hero | about | workstation | contact_hero | cta | footer
-- ═══════════════════════════════════════════════════════════
create table if not exists page_sections (
  id           uuid primary key default uuid_generate_v4(),
  page         text not null,
  section      text not null,
  content      jsonb not null default '{}',
  is_active    boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (page, section)
);

create trigger trg_page_sections_updated_at
  before update on page_sections
  for each row execute function set_updated_at();

-- ═══════════════════════════════════════════════════════════
-- 7. SITE CONFIG  (key → value store)
-- ═══════════════════════════════════════════════════════════
create table if not exists site_config (
  id         uuid primary key default uuid_generate_v4(),
  key        text not null unique,
  value      text,
  type       text not null default 'text',  -- text | json | boolean | color
  label      text,
  group_name text,
  updated_at timestamptz not null default now()
);

create trigger trg_site_config_updated_at
  before update on site_config
  for each row execute function set_updated_at();

-- ═══════════════════════════════════════════════════════════
-- 8. IMAGES  (registry of all uploaded assets)
-- ═══════════════════════════════════════════════════════════
create table if not exists images (
  id           uuid primary key default uuid_generate_v4(),
  name         text not null,
  url          text not null,
  storage_path text,
  alt          text,
  width        integer,
  height       integer,
  section      text,   -- hero | about | workstation | project | testimonial | general
  mime_type    text,
  size_bytes   bigint,
  created_at   timestamptz not null default now()
);

-- ═══════════════════════════════════════════════════════════
-- 9. CONTACT SUBMISSIONS
-- ═══════════════════════════════════════════════════════════
create table if not exists contact_submissions (
  id           uuid primary key default uuid_generate_v4(),
  name         text not null,
  email        text not null,
  company      text,
  project_type text,
  budget       text,
  message      text not null,
  is_read      boolean not null default false,
  is_archived  boolean not null default false,
  created_at   timestamptz not null default now()
);

-- ═══════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════════════════

-- Enable RLS on all tables
alter table personal_info       enable row level security;
alter table social_links        enable row level security;
alter table nav_links           enable row level security;
alter table projects            enable row level security;
alter table testimonials        enable row level security;
alter table page_sections       enable row level security;
alter table site_config         enable row level security;
alter table images              enable row level security;
alter table contact_submissions enable row level security;

-- PUBLIC READ policies (portfolio visitors can read non-hidden content)
create policy "public_read_personal_info"       on personal_info       for select using (true);
create policy "public_read_social_links"        on social_links        for select using (is_active = true);
create policy "public_read_nav_links"           on nav_links           for select using (is_active = true);
create policy "public_read_projects"            on projects            for select using (is_hidden = false);
create policy "public_read_testimonials"        on testimonials        for select using (is_active = true);
create policy "public_read_page_sections"       on page_sections       for select using (is_active = true);
create policy "public_read_site_config"         on site_config         for select using (true);
create policy "public_read_images"              on images              for select using (true);

-- PUBLIC INSERT for contact form
create policy "public_insert_contact"          on contact_submissions  for insert with check (true);

-- AUTHENTICATED (admin) can do everything
create policy "admin_all_personal_info"       on personal_info       for all using (auth.role() = 'authenticated');
create policy "admin_all_social_links"        on social_links        for all using (auth.role() = 'authenticated');
create policy "admin_all_nav_links"           on nav_links           for all using (auth.role() = 'authenticated');
create policy "admin_all_projects"            on projects            for all using (auth.role() = 'authenticated');
create policy "admin_all_testimonials"        on testimonials        for all using (auth.role() = 'authenticated');
create policy "admin_all_page_sections"       on page_sections       for all using (auth.role() = 'authenticated');
create policy "admin_all_site_config"         on site_config         for all using (auth.role() = 'authenticated');
create policy "admin_all_images"              on images              for all using (auth.role() = 'authenticated');
create policy "admin_all_contact"             on contact_submissions for all using (auth.role() = 'authenticated');

-- ═══════════════════════════════════════════════════════════
-- STORAGE BUCKETS
-- Run these via Supabase Dashboard → Storage, or via the JS client.
-- They are listed here for documentation.
-- ═══════════════════════════════════════════════════════════
-- insert into storage.buckets (id, name, public) values ('portfolio-images', 'portfolio-images', true);
-- insert into storage.buckets (id, name, public) values ('portfolio-avatars', 'portfolio-avatars', true);
-- Storage policies: authenticated can upload; public can read.
