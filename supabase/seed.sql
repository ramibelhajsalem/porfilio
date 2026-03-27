-- ============================================================
-- PORTFOLIO CMS — Seed Data
-- Populates tables with current portfolio content.
-- Run after 001_initial_schema.sql
-- ============================================================

-- ─── Personal Info ─────────────────────────────────────────
insert into personal_info (name, first_name, title, subtitle, bio, bio_extended, email, location, location_detail, availability, timezone, response_time)
values (
  'Albert',
  'Albert',
  'Front-End Developer',
  'Front-End-Developer-Code',
  'I am a creative front-end developer with a strong focus on motion and interaction.',
  'An adept of Scandinavian culture and lifestyle. He draws daily inspiration from their minimalist philosophy and has developed a refined visual language that pairs well with technical precision.',
  'info@albert.com',
  'Eindhoven, The Netherlands',
  'Open to remote worldwide',
  true,
  'Europe/Amsterdam',
  '24 hours'
)
on conflict do nothing;

-- ─── Social Links ──────────────────────────────────────────
insert into social_links (platform, url, icon, label, order_index, is_active) values
  ('twitter',   '#', 'Twitter',   'Twitter',   0, true),
  ('linkedin',  '#', 'Linkedin',  'LinkedIn',  1, true),
  ('instagram', '#', 'Instagram', 'Instagram', 2, true),
  ('facebook',  '#', 'Facebook',  'Facebook',  3, true)
on conflict do nothing;

-- ─── Nav Links ─────────────────────────────────────────────
insert into nav_links (label, href, order_index, is_active) values
  ('Works',       '/works',        0, true),
  ('About',       '#about',        1, true),
  ('Testimonial', '#testimonials', 2, true),
  ('Contact',     '/contact',      3, true)
on conflict do nothing;

-- ─── Projects ──────────────────────────────────────────────
insert into projects (title, year, category, description, image_url, tags, gradient, accent, label, is_featured, is_hidden, order_index) values
(
  'Reality Affodils', '2024', 'Web App',
  'An immersive 3D product experience built with Three.js and Vue, exploring augmented reality shopping concepts.',
  'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=700&fit=crop',
  array['Vue.js', '3D', 'WebGL'],
  'from-[#2d7a4f] to-[#1a5c3a]', 'rgba(184,240,42,0.8)', 'REALITY', true, false, 0
),
(
  'Airma Consult', '2024', 'Branding',
  'Brand identity and digital platform for a consulting firm — blending editorial design with functional clarity.',
  'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=800&fit=crop',
  array['React', 'Branding', 'Motion'],
  'from-[#333] to-[#111]', 'rgba(184,240,42,0.8)', 'AIRMA', true, false, 1
),
(
  'Tradicional Jardin', '2023', 'E-Commerce',
  'A premium garden e-commerce experience with scroll-driven animations and custom product configurators.',
  'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&h=800&fit=crop',
  array['Shopify', 'CSS', 'Animation'],
  'from-[#7a4f2d] to-[#5c3a1a]', 'rgba(255,200,80,0.9)', 'JARDIN', true, false, 2
),
(
  'CandidatApp', '2024', 'SaaS',
  'Full-stack recruitment platform with real-time features, Cloudinary uploads, and a sophisticated Pinia store architecture.',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=800&fit=crop',
  array['Vue 3', 'ASP.NET', 'Pinia'],
  'from-[#2d4f7a] to-[#1a3a5c]', 'rgba(100,180,255,0.9)', 'CANDIDAT', true, false, 3
),
(
  'MindMap AI', '2024', 'Mobile',
  'Cross-platform AI-powered note-taking app with CRDT sync strategy, MVI architecture, and a bold VOID GRAPH visual theme.',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop',
  array['Kotlin', 'KMM', 'AI'],
  'from-[#4f7a2d] to-[#3a5c1a]', 'rgba(150,255,100,0.9)', 'MINDMAP', true, false, 4
),
(
  'AI Agent Studio', '2024', 'Experiment',
  'A ReAct-pattern AI agent with short-term, long-term, and episodic memory types — built as a single-file Java implementation.',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=800&fit=crop',
  array['Java', 'ReAct', 'LLM'],
  'from-[#7a2d4f] to-[#5c1a3a]', 'rgba(255,150,200,0.9)', 'AGENT', true, false, 5
);

-- ─── Testimonials ──────────────────────────────────────────
insert into testimonials (quote, client_name, client_role, client_company, is_active, order_index) values
(
  'Thanks to the efforts Albert, your successfully exceeded the client''s business goals. The end client commended the eye-catching and functional website positively. Although your works remotely, the evidently established effective communication.',
  'Leslie Alexander', 'Founder & CEO', 'OPE Studio', true, 0
),
(
  'The site improved our digital presence exponentially. The team''s approach to design was effective, quick & delivered outstanding results.',
  'Esther Howard', 'Digital Marketing Manager', null, true, 1
);

-- ─── Page Sections ─────────────────────────────────────────
insert into page_sections (page, section, content) values
('home', 'hero', '{
  "greeting": "Hi there, I''m Albert 👋",
  "name": "Albert",
  "title_word1": "Front",
  "title_word2": "End",
  "title_word3": "Developer",
  "bio": "I am a creative front-end developer with a strong focus on motion and interaction.",
  "photo_url": "/images/user1.png",
  "photo_alt": "Albert - Front-End Developer"
}'::jsonb),

('home', 'about', '{
  "headline1": "Passionate",
  "headline2": "About Development",
  "passion_description": "Innovation and storytelling. Interested about conception and creating interactive experiences.",
  "work_experience_title": "Work Experience",
  "work_experience_text": "Theo is a student in interactive development at Goblins and is currently doing his apprenticeship",
  "about_description": "An adept of Scandinavian culture and lifestyle. He draws daily inspiration from their minimalist philosophy and has developed",
  "inline_image_url": "https://images.unsplash.com/photo-1685062428479-e310b7851de5?w=300&h=300",
  "grid_image1_url": "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&h=500&fit=crop",
  "grid_image2_url": "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=400&h=500&fit=crop"
}'::jsonb),

('home', 'workstation', '{
  "heading": "My Workstation",
  "description": "Where ideas come to life",
  "images": [
    {"url": "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=600&fit=crop", "alt": "Workspace setup"},
    {"url": "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&h=600&fit=crop", "alt": "Coding session"},
    {"url": "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?w=800&h=600&fit=crop", "alt": "Multiple screens"},
    {"url": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=600&fit=crop", "alt": "Devices"}
  ]
}'::jsonb),

('home', 'cta', '{
  "heading": "Have An Idea?",
  "subheading": "Tell Me About It",
  "button_text": "Get In Touch",
  "button_href": "/contact"
}'::jsonb),

('contact', 'hero', '{
  "headline": "Let''s work together.",
  "marquee_text": "Available for freelance  •  Open to collaboration  •  Let''s build something great",
  "availability_text": "Available for new projects",
  "form_heading": "Tell me about your project",
  "project_types": ["Web App", "E-Commerce", "Branding", "Mobile App", "Other"],
  "budget_options": ["< $5k", "$5k – $10k", "$10k – $25k", "$25k+"]
}'::jsonb),

('works', 'hero', '{
  "headline": "I BUILD DIGITAL WORLDS",
  "tag": "Frontend Developer",
  "description": "A creative front-end developer with a strong focus on motion and interaction — turning ideas into unforgettable web experiences.",
  "cta_text": "View Works",
  "cta_href": "#works"
}'::jsonb)

on conflict (page, section) do nothing;

-- ─── Site Config ───────────────────────────────────────────
insert into site_config (key, value, type, label, group_name) values
('site_title',        'Albert | Frontend Developer',          'text',  'Site Title',        'seo'),
('site_description',  'Frontend Developer Portfolio',         'text',  'Site Description',  'seo'),
('site_author',       'Albert',                               'text',  'Author Name',       'seo'),
('site_keywords',     '["Frontend Developer","React","Next.js","Portfolio"]', 'json', 'Keywords', 'seo'),
('site_url',          '',                                     'text',  'Canonical Site URL','seo'),
('og_image_url',      '',                                     'text',  'Open Graph Image URL', 'seo'),
('site_locale',       'en_US',                                'text',  'Locale',            'seo'),
('site_robots',       'index, follow',                        'text',  'Robots',            'seo'),
('twitter_handle',    '',                                     'text',  'Twitter / X Handle','seo'),
('theme_primary_color', '#1B4D3E',                            'color', 'Primary Color',     'theme'),
('theme_accent_color',  '#b8f02a',                            'color', 'Accent Color',      'theme'),
('theme_background_color', '#0f172a',                         'color', 'Background Color',  'theme'),
('theme_surface_color',    '#172033',                         'color', 'Surface Color',     'theme'),
('theme_foreground_color', '#f8fafc',                         'color', 'Foreground Color',  'theme'),
('theme_muted_color',      '#94a3b8',                         'color', 'Muted Text Color',  'theme'),
('works_section_subtitle', 'During his professional experiences, Albert had the opportunity to work on a wide variety of projects.', 'text', 'Works Section Subtitle', 'content'),
('footer_address',    'Spaansekal 14, 3rd Floor, 1411 AI Eindhoven, The Netherlands', 'text', 'Footer Address', 'content'),
('support_email',     'info@albert.com',                      'text',  'Support Email',     'integrations'),
('google_analytics_id', '',                                   'text',  'Google Analytics ID', 'integrations'),
('plausible_domain',  '',                                     'text',  'Plausible Domain',  'integrations'),
('ai_providers',      '[]',                                   'json',  'AI Providers',      'ai'),
('ai_models',         '[]',                                   'json',  'AI Models',         'ai')
on conflict (key) do nothing;
