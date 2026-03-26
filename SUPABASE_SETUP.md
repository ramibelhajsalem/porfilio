# Portfolio CMS — Supabase Setup Guide

## Quick Start

### 1. Create a Supabase project

Go to [supabase.com](https://supabase.com) → New Project.

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in your credentials from **Project Settings → API**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...   # keep secret!
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run migrations + seed

**Option A — Automated script (recommended):**
```bash
npm run db:setup
```

**Option B — Manual (paste SQL in Supabase SQL Editor):**
1. Open **SQL Editor** in your Supabase dashboard
2. Paste the contents of `supabase/migrations/001_initial_schema.sql` → Run
3. Paste the contents of `supabase/seed.sql` → Run
4. Go to **Storage** → create two public buckets named:
   - `portfolio-images`
   - `portfolio-avatars`

### 5. Create your admin user

In the Supabase dashboard:
- **Authentication → Users → Add User**
- Enter your email and a strong password
- This is your login for `/admin`

### 6. Start the dev server

```bash
npm run dev
```

Visit `http://localhost:3000/admin` to log in.

---

## Admin Panel Features

| URL | Description |
|-----|-------------|
| `/admin` | Dashboard with stats |
| `/admin/personal` | Edit name, bio, email, location, availability |
| `/admin/projects` | CRUD projects, drag to reorder, hide/show |
| `/admin/projects/new` | Create new project |
| `/admin/testimonials` | Manage client testimonials |
| `/admin/sections` | Edit hero, about, workstation, CTA, and contact page text |
| `/admin/messages` | View contact form submissions |
| `/admin/images` | Upload and manage all images |
| `/admin/config` | SEO metadata, theme colors, integrations |

---

## Database Schema

| Table | Purpose |
|-------|---------|
| `personal_info` | Name, bio, email, location, availability |
| `projects` | Portfolio projects with tags, images, visibility |
| `testimonials` | Client quotes and info |
| `page_sections` | Editable JSON content for each page section |
| `nav_links` | Navigation menu items |
| `social_links` | Social media URLs |
| `site_config` | Global settings (SEO, colors, integrations) |
| `images` | Image registry for uploaded files |
| `contact_submissions` | Contact form submissions |

---

## Deploying a Copy of This Portfolio

When you fork/clone this project for a new portfolio:

1. Create a new Supabase project
2. Set `.env.local` with the new project's credentials
3. Run `npm run db:setup` — this migrates AND seeds from the current portfolio content
4. Log in to `/admin` and customize everything

The portfolio automatically falls back to the static constants in `src/lib/constants.ts` if Supabase is not configured, so it always works out of the box.
