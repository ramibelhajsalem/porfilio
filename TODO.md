# Portfolio Admin Dashboard — TODO

## Phase 1: Supabase Foundation
- [ ] Install `@supabase/supabase-js` and `@supabase/ssr`
- [ ] Create `.env.local` with Supabase credentials
- [ ] Create `supabase/migrations/001_create_tables.sql` (site_config, social_links, address, projects, testimonials, page_contents, hero_section, navigation_items)
- [ ] Create `supabase/migrations/002_create_storage_buckets.sql` (project-images, avatars, profile)
- [ ] Create `supabase/migrations/003_create_rls_policies.sql` (public read, admin write)
- [ ] Create `supabase/migrations/004_seed_data.sql` (migrate all hardcoded content)
- [ ] Create `scripts/create-admin.ts` (admin user creation script)

## Phase 2: Supabase Client Setup
- [ ] Create `src/lib/supabase/client.ts` (browser client)
- [ ] Create `src/lib/supabase/server.ts` (server client)
- [ ] Create `src/lib/supabase/types.ts` (TypeScript interfaces for all tables)
- [ ] Create `src/lib/supabase/queries.ts` (server-side data fetching)
- [ ] Create `src/lib/supabase/mutations.ts` (client-side mutation helpers)
- [ ] Create `src/lib/supabase/storage.ts` (image upload/delete helpers)
- [ ] Update `next.config.ts` (add Supabase storage hostname)

## Phase 3: Authentication
- [ ] Create `src/middleware.ts` (protect /admin routes, refresh session)
- [ ] Create `src/app/admin/login/page.tsx` (login form)

## Phase 4: Admin Layout & Dashboard
- [ ] Install shadcn components (sidebar, input, textarea, card, table, dialog, tabs, badge, dropdown-menu, avatar, label, select, separator, skeleton, sonner)
- [ ] Create `src/app/admin/layout.tsx` (sidebar shell + auth check)
- [ ] Create `src/app/admin/page.tsx` (dashboard overview with stats)

## Phase 5: Admin Feature Pages
- [ ] Create `src/components/admin/image-upload.tsx` (reusable image uploader)
- [ ] Create `src/app/admin/projects/page.tsx` (project list table)
- [ ] Create `src/components/admin/project-form.tsx` (project create/edit form)
- [ ] Create `src/app/admin/projects/new/page.tsx` (new project page)
- [ ] Create `src/app/admin/projects/[id]/page.tsx` (edit project page)
- [ ] Create `src/app/admin/testimonials/page.tsx` (testimonials CRUD)
- [ ] Create `src/app/admin/hero/page.tsx` (hero section editor)
- [ ] Create `src/app/admin/settings/page.tsx` (site config, social links, address, navigation — tabbed)
- [ ] Create `src/app/admin/pages/page.tsx` (page list)
- [ ] Create `src/app/admin/pages/[slug]/page.tsx` (page content editor with live preview)
- [ ] Create `src/components/admin/page-preview.tsx` (live preview renderer)

## Phase 6: Refactor Public Pages
- [ ] Modify `src/app/(public)/layout.tsx` (fetch shared data from Supabase)
- [ ] Modify `src/app/(public)/page.tsx` (async server component, fetch all home data)
- [ ] Modify `src/app/(public)/works/page.tsx` (fetch projects from Supabase)
- [ ] Modify `src/app/(public)/contact/page.tsx` (fetch siteConfig, socialLinks, pageContents)
- [ ] Refactor `src/components/sections/navbar.tsx` (accept props)
- [ ] Refactor `src/components/sections/hero.tsx` (accept props)
- [ ] Refactor `src/components/sections/works.tsx` (accept props)
- [ ] Refactor `src/components/sections/about.tsx` (accept props)
- [ ] Refactor `src/components/sections/testimonials.tsx` (accept props)
- [ ] Refactor `src/components/sections/workstation.tsx` (accept props)
- [ ] Refactor `src/components/sections/contact-cta.tsx` (accept props)
- [ ] Refactor `src/components/sections/footer.tsx` (accept props)
- [ ] Reduce `src/lib/constants.ts` (keep only colors + transitions)

## Phase 7: Cache Revalidation
- [ ] Create `src/app/api/revalidate/route.ts` (POST endpoint to bust public page cache)
- [ ] Wire admin mutations to trigger revalidation after saves
