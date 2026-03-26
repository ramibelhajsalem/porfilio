-- ============================================
-- 004: Seed data (migrated from constants.ts)
-- ============================================

-- ── Site Config ──
INSERT INTO site_config (key, value) VALUES
  ('site_name', 'Albert'),
  ('description', 'Frontend Developer Portfolio'),
  ('author', 'Albert'),
  ('email', 'info@albert.com')
ON CONFLICT (key) DO NOTHING;

-- ── Social Links ──
INSERT INTO social_links (platform, url, "order") VALUES
  ('Facebook', '#', 0),
  ('Instagram', '#', 1),
  ('Twitter', '#', 2),
  ('LinkedIn', '#', 3)
ON CONFLICT DO NOTHING;

-- ── Address ──
INSERT INTO address (street, city, country) VALUES
  ('Spaansekal 14, 3rd Floor', '1411 AI Eindhoven', 'The Netherlands');

-- ── Navigation Items ──
INSERT INTO navigation_items (label, href, "order") VALUES
  ('Works', '/works', 0),
  ('About', '#about', 1),
  ('Testimonial', '#testimonials', 2),
  ('Contact', '/contact', 3)
ON CONFLICT DO NOTHING;

-- ── Projects ──
INSERT INTO projects (title, slug, year, category, description, image_url, tags, technologies, gradient, accent_color, label, "order") VALUES
  (
    'Reality Affodils',
    'reality-affodils',
    '2024',
    'Web App',
    'An immersive 3D product experience built with Three.js and Vue, exploring augmented reality shopping concepts.',
    'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=700&fit=crop',
    ARRAY['Vue.js', '3D', 'WebGL'],
    ARRAY['Vue.js', '3D', 'WebGL'],
    'from-[#2d7a4f] to-[#1a5c3a]',
    'rgba(184,240,42,0.8)',
    'REALITY',
    0
  ),
  (
    'Airma Consult',
    'airma-consult',
    '2024',
    'Branding',
    'Brand identity and digital platform for a consulting firm — blending editorial design with functional clarity.',
    'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=800&fit=crop',
    ARRAY['React', 'Branding', 'Motion'],
    ARRAY['React', 'Branding', 'Motion'],
    'from-[#333] to-[#111]',
    'rgba(184,240,42,0.8)',
    'AIRMA',
    1
  ),
  (
    'Tradicional Jardin',
    'tradicional-jardin',
    '2023',
    'E-Commerce',
    'A premium garden e-commerce experience with scroll-driven animations and custom product configurators.',
    'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&h=800&fit=crop',
    ARRAY['Shopify', 'CSS', 'Animation'],
    ARRAY['Shopify', 'CSS', 'Animation'],
    'from-[#7a4f2d] to-[#5c3a1a]',
    'rgba(255,200,80,0.9)',
    'JARDIN',
    2
  ),
  (
    'CandidatApp',
    'candidatapp',
    '2024',
    'SaaS',
    'Full-stack recruitment platform with real-time features, Cloudinary uploads, and a sophisticated Pinia store architecture.',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=800&fit=crop',
    ARRAY['Vue 3', 'ASP.NET', 'Pinia'],
    ARRAY['Vue 3', 'ASP.NET', 'Pinia'],
    'from-[#2d4f7a] to-[#1a3a5c]',
    'rgba(100,180,255,0.9)',
    'CANDIDAT',
    3
  ),
  (
    'MindMap AI',
    'mindmap-ai',
    '2024',
    'Mobile',
    'Cross-platform AI-powered note-taking app with CRDT sync strategy, MVI architecture, and a bold VOID GRAPH visual theme.',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop',
    ARRAY['Kotlin', 'KMM', 'AI'],
    ARRAY['Kotlin', 'KMM', 'AI'],
    'from-[#4f7a2d] to-[#3a5c1a]',
    'rgba(150,255,100,0.9)',
    'MINDMAP',
    4
  ),
  (
    'AI Agent Studio',
    'ai-agent-studio',
    '2024',
    'Experiment',
    'A ReAct-pattern AI agent with short-term, long-term, and episodic memory types — built as a single-file Java implementation.',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=800&fit=crop',
    ARRAY['Java', 'ReAct', 'LLM'],
    ARRAY['Java', 'ReAct', 'LLM'],
    'from-[#7a2d4f] to-[#5c1a3a]',
    'rgba(255,150,200,0.9)',
    'AGENT',
    5
  )
ON CONFLICT (slug) DO NOTHING;

-- ── Testimonials ──
INSERT INTO testimonials (name, role, company, quote, avatar_url, "order") VALUES
  (
    'Leslie Alexander',
    'Founder & CEO',
    'OPE Studio',
    'Thanks to the efforts Albert, your successfully exceeded the client''s business goals. The end client commended the eye-catching and functional website positively. Although your works remotely, the evidently established effective communication.',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    0
  ),
  (
    'Esther Howard',
    'Digital Marketing Manager',
    NULL,
    'The site improved our digital presence exponentially. The team''s approach to design was effective, quick & delivered outstanding results.',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    1
  )
ON CONFLICT DO NOTHING;

-- ── Hero Section ──
INSERT INTO hero_section (greeting, title_lines, bio, profile_image) VALUES
  (
    'Hi there, I''m Albert',
    ARRAY['Front', 'End', 'Developer'],
    'I am a creative front-end developer with a strong focus on motion and interaction.',
    '/images/user1.png'
  );

-- ── Page Contents ──
INSERT INTO page_contents (page_slug, section_key, content) VALUES
  ('home', 'works_title', '{"text": "Works", "type": "heading"}'),
  ('home', 'works_subtitle', '{"text": "During his professional experiences, Albert had the opportunity to work on a wide variety of projects.", "type": "paragraph"}'),
  ('home', 'about_passionate', '{"text": "Passionate", "type": "heading"}'),
  ('home', 'about_passionate_desc', '{"text": "Innovation and storytelling. Interested about conception and creating interactive experiences.", "type": "paragraph"}'),
  ('home', 'about_heading', '{"text": "About Development", "type": "heading"}'),
  ('home', 'about_work_experience', '{"text": "This is a student in interactive development at Gobelins and is currently doing his apprenticeship.", "type": "paragraph"}'),
  ('home', 'about_culture_desc', '{"text": "An adept of Scandinavian culture and lifestyle, lover of music and music festivals.", "type": "paragraph"}'),
  ('home', 'testimonials_title', '{"text": "What People Says About Me", "type": "heading"}'),
  ('home', 'workstation_heading', '{"text": "Workstation", "type": "heading"}'),
  ('home', 'workstation_subheading', '{"text": "Favourite Gears", "type": "heading"}'),
  ('contact', 'hero_subtitle', '{"text": "Have a project in mind?", "type": "heading"}'),
  ('contact', 'hero_heading_1', '{"text": "Let''s work", "type": "heading"}'),
  ('contact', 'hero_heading_2', '{"text": "together.", "type": "heading"}'),
  ('contact', 'subtext', '{"text": "I''m always excited to take on new challenges and bring creative visions to life. Whether it''s a brand-new project or improving an existing one — let''s make it happen.", "type": "paragraph"}'),
  ('contact', 'marquee_1', '{"text": "Available for freelance", "type": "text"}'),
  ('contact', 'marquee_2', '{"text": "Open to collaboration", "type": "text"}'),
  ('contact', 'marquee_3', '{"text": "Let''s build something great", "type": "text"}'),
  ('works', 'hero_tag', '{"text": "Frontend Developer", "type": "text"}'),
  ('works', 'hero_heading', '{"text": "I BUILD DIGITAL WORLDS", "type": "heading"}'),
  ('works', 'hero_description', '{"text": "A creative front-end developer with a strong focus on motion and interaction — turning ideas into unforgettable web experiences.", "type": "paragraph"}'),
  ('home', 'cta_heading_left', '{"text": "Have An Idea?", "type": "heading"}'),
  ('home', 'cta_button_text', '{"text": "Send Me A Request", "type": "text"}'),
  ('home', 'cta_description', '{"text": "I understand that you might be busy, but any assistance you could provide would be greatly appreciated.", "type": "paragraph"}'),
  ('home', 'cta_heading_right', '{"text": "Tell Me About It", "type": "heading"}'),
  ('home', 'footer_email_label', '{"text": "Email me for quick conversation", "type": "text"}')
ON CONFLICT (page_slug, section_key) DO NOTHING;
