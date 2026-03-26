-- ============================================
-- 003: Row Level Security policies
-- ============================================

-- Enable RLS on all tables
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE address ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;

-- ────────────────────────────────────────────
-- PUBLIC READ policies (anyone can read)
-- ────────────────────────────────────────────
CREATE POLICY "public_read" ON site_config FOR SELECT USING (true);
CREATE POLICY "public_read" ON social_links FOR SELECT USING (true);
CREATE POLICY "public_read" ON address FOR SELECT USING (true);
CREATE POLICY "public_read" ON projects FOR SELECT USING (true);
CREATE POLICY "public_read" ON testimonials FOR SELECT USING (true);
CREATE POLICY "public_read" ON page_contents FOR SELECT USING (true);
CREATE POLICY "public_read" ON hero_section FOR SELECT USING (true);
CREATE POLICY "public_read" ON navigation_items FOR SELECT USING (true);

-- ────────────────────────────────────────────
-- ADMIN WRITE policies (only admin can insert/update/delete)
-- ────────────────────────────────────────────
CREATE POLICY "admin_insert" ON site_config FOR INSERT
  WITH CHECK (auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com');
CREATE POLICY "admin_update" ON site_config FOR UPDATE
  USING (auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com');
CREATE POLICY "admin_delete" ON site_config FOR DELETE
  USING (auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com');

CREATE POLICY "admin_insert" ON social_links FOR INSERT
  WITH CHECK (auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com');
CREATE POLICY "admin_update" ON social_links FOR UPDATE
  USING (auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com');
CREATE POLICY "admin_delete" ON social_links FOR DELETE
  USING (auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com');

CREATE POLICY "admin_insert" ON address FOR INSERT
  WITH CHECK (auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com');
CREATE POLICY "admin_update" ON address FOR UPDATE
  USING (auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com');
CREATE POLICY "admin_delete" ON address FOR DELETE
  USING (auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com');

CREATE POLICY "admin_insert" ON projects FOR INSERT
  WITH CHECK (auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com');
CREATE POLICY "admin_update" ON projects FOR UPDATE
  USING (auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com');
CREATE POLICY "admin_delete" ON projects FOR DELETE
  USING (auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com');

CREATE POLICY "admin_insert" ON testimonials FOR INSERT
  WITH CHECK (auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com');
CREATE POLICY "admin_update" ON testimonials FOR UPDATE
  USING (auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com');
CREATE POLICY "admin_delete" ON testimonials FOR DELETE
  USING (auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com');

CREATE POLICY "admin_insert" ON page_contents FOR INSERT
  WITH CHECK (auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com');
CREATE POLICY "admin_update" ON page_contents FOR UPDATE
  USING (auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com');
CREATE POLICY "admin_delete" ON page_contents FOR DELETE
  USING (auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com');

CREATE POLICY "admin_insert" ON hero_section FOR INSERT
  WITH CHECK (auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com');
CREATE POLICY "admin_update" ON hero_section FOR UPDATE
  USING (auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com');
CREATE POLICY "admin_delete" ON hero_section FOR DELETE
  USING (auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com');

CREATE POLICY "admin_insert" ON navigation_items FOR INSERT
  WITH CHECK (auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com');
CREATE POLICY "admin_update" ON navigation_items FOR UPDATE
  USING (auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com');
CREATE POLICY "admin_delete" ON navigation_items FOR DELETE
  USING (auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com');

-- ────────────────────────────────────────────
-- STORAGE policies
-- ────────────────────────────────────────────

-- Public read for all buckets
CREATE POLICY "public_read_project_images" ON storage.objects
  FOR SELECT USING (bucket_id = 'project-images');
CREATE POLICY "public_read_avatars" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "public_read_profile" ON storage.objects
  FOR SELECT USING (bucket_id = 'profile');

-- Admin upload/update/delete for all buckets
CREATE POLICY "admin_upload_project_images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'project-images'
    AND auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com'
  );
CREATE POLICY "admin_update_project_images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'project-images'
    AND auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com'
  );
CREATE POLICY "admin_delete_project_images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'project-images'
    AND auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com'
  );

CREATE POLICY "admin_upload_avatars" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'avatars'
    AND auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com'
  );
CREATE POLICY "admin_update_avatars" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'avatars'
    AND auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com'
  );
CREATE POLICY "admin_delete_avatars" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'avatars'
    AND auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com'
  );

CREATE POLICY "admin_upload_profile" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'profile'
    AND auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com'
  );
CREATE POLICY "admin_update_profile" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'profile'
    AND auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com'
  );
CREATE POLICY "admin_delete_profile" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'profile'
    AND auth.jwt() ->> 'email' = 'ramibelhadjsalam@gmail.com'
  );
