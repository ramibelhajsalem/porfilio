"use client";

import { useState, useTransition, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { upsertPageSection } from "@/lib/supabase/actions";
import {
  Field,
  Input,
  Textarea,
  SaveBar,
  PageHeader,
  Card,
} from "@/components/admin/form-field";
import { ChevronDown, ChevronUp } from "lucide-react";

type SectionKey = "hero" | "about" | "workstation" | "contact" | "cta";

const SECTIONS: { key: SectionKey; page: string; label: string; description: string }[] = [
  { key: "hero",        page: "home",    label: "Hero Section",        description: "Greeting text, title words, bio, and profile photo" },
  { key: "about",       page: "home",    label: "About Section",       description: "Headlines, bio text, and about images" },
  { key: "workstation", page: "home",    label: "Workstation Section", description: "Workspace images and descriptions" },
  { key: "cta",         page: "home",    label: "Call-to-Action",      description: "The section inviting visitors to contact you" },
  { key: "contact",     page: "contact", label: "Contact Page",        description: "Contact page headline, form labels, and availability text" },
];

export default function SectionsPage() {
  const [sectionData, setSectionData] = useState<Record<string, Record<string, string>>>({});
  const [open, setOpen] = useState<SectionKey | null>("hero");
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState<SectionKey | null>(null);
  const [saved, setSaved] = useState<SectionKey | null>(null);
  const [errors, setErrors] = useState<Partial<Record<SectionKey, string>>>({});
  const [, startTransition] = useTransition();

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("page_sections")
      .select("*")
      .then(({ data }) => {
        const map: Record<string, Record<string, string>> = {};
        data?.forEach((row) => {
          map[`${row.page}:${row.section}`] = row.content as Record<string, string>;
        });
        setSectionData(map);
        setLoading(false);
      });
  }, []);

  function getContent(page: string, key: SectionKey) {
    return sectionData[`${page}:${key}`] ?? {};
  }

  function setContent(page: string, key: SectionKey, field: string, value: string) {
    setSectionData((prev) => ({
      ...prev,
      [`${page}:${key}`]: {
        ...(prev[`${page}:${key}`] ?? {}),
        [field]: value,
      },
    }));
  }

  function handleSave(page: string, key: SectionKey) {
    setPending(key);
    setErrors((e) => ({ ...e, [key]: undefined }));
    startTransition(async () => {
      const result = await upsertPageSection(page, key, getContent(page, key));
      if (result?.error) {
        setErrors((e) => ({ ...e, [key]: result.error }));
      } else {
        setSaved(key);
        setTimeout(() => setSaved(null), 3000);
      }
      setPending(null);
    });
  }

  if (loading)
    return (
      <div className="p-8 flex items-center justify-center h-64">
        <span className="w-6 h-6 border-2 border-teal-500/30 border-t-teal-500 rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="p-8 max-w-2xl">
      <PageHeader
        title="Page Sections"
        description="Edit the text and images on each section of your portfolio pages."
      />

      <div className="space-y-4">
        {SECTIONS.map(({ key, page, label, description }) => {
          const content = getContent(page, key);
          const isOpen = open === key;

          return (
            <div
              key={key}
              className="bg-white/5 border border-white/8 rounded-2xl overflow-hidden"
            >
              {/* Section header */}
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : key)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition"
              >
                <div>
                  <p className="text-white font-semibold text-sm">{label}</p>
                  <p className="text-white/30 text-xs mt-0.5">{description}</p>
                </div>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-white/40" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-white/40" />
                )}
              </button>

              {/* Fields */}
              {isOpen && (
                <div className="px-5 pb-5 border-t border-white/5">
                  <div className="pt-5 space-y-4">
                    {key === "hero" && (
                      <HeroFields
                        content={content}
                        set={(f, v) => setContent(page, key, f, v)}
                      />
                    )}
                    {key === "about" && (
                      <AboutFields
                        content={content}
                        set={(f, v) => setContent(page, key, f, v)}
                      />
                    )}
                    {key === "workstation" && (
                      <WorkstationFields
                        content={content}
                        set={(f, v) => setContent(page, key, f, v)}
                      />
                    )}
                    {key === "cta" && (
                      <CtaFields
                        content={content}
                        set={(f, v) => setContent(page, key, f, v)}
                      />
                    )}
                    {key === "contact" && (
                      <ContactFields
                        content={content}
                        set={(f, v) => setContent(page, key, f, v)}
                      />
                    )}

                    <SaveBar
                      isPending={pending === key}
                      saved={saved === key}
                      error={errors[key]}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Per-section field groups ─────────────────────────────────

function HeroFields({
  content,
  set,
}: {
  content: Record<string, string>;
  set: (f: string, v: string) => void;
}) {
  return (
    <>
      <Field label="Greeting Text">
        <Input
          value={content.greeting ?? ""}
          onChange={(e) => set("greeting", e.target.value)}
          placeholder="Hi there, I'm Albert 👋"
        />
      </Field>
      <div className="grid grid-cols-3 gap-3">
        <Field label="Title Word 1">
          <Input
            value={content.title_word1 ?? ""}
            onChange={(e) => set("title_word1", e.target.value)}
            placeholder="Front"
          />
        </Field>
        <Field label="Title Word 2">
          <Input
            value={content.title_word2 ?? ""}
            onChange={(e) => set("title_word2", e.target.value)}
            placeholder="End"
          />
        </Field>
        <Field label="Title Word 3">
          <Input
            value={content.title_word3 ?? ""}
            onChange={(e) => set("title_word3", e.target.value)}
            placeholder="Developer"
          />
        </Field>
      </div>
      <Field label="Short Bio" hint="Shown below the hero title">
        <Textarea
          value={content.bio ?? ""}
          onChange={(e) => set("bio", e.target.value)}
          placeholder="I am a creative front-end developer…"
          rows={2}
        />
      </Field>
      <Field label="Profile Photo URL" hint="Use Images section to upload, then paste URL">
        <Input
          value={content.photo_url ?? ""}
          onChange={(e) => set("photo_url", e.target.value)}
          placeholder="/images/user1.png"
        />
      </Field>
      <Field label="Photo Alt Text">
        <Input
          value={content.photo_alt ?? ""}
          onChange={(e) => set("photo_alt", e.target.value)}
          placeholder="Albert - Front-End Developer"
        />
      </Field>
    </>
  );
}

function AboutFields({
  content,
  set,
}: {
  content: Record<string, string>;
  set: (f: string, v: string) => void;
}) {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Headline 1">
          <Input
            value={content.headline1 ?? ""}
            onChange={(e) => set("headline1", e.target.value)}
            placeholder="Passionate"
          />
        </Field>
        <Field label="Headline 2">
          <Input
            value={content.headline2 ?? ""}
            onChange={(e) => set("headline2", e.target.value)}
            placeholder="About Development"
          />
        </Field>
      </div>
      <Field label="Passion Description">
        <Textarea
          value={content.passion_description ?? ""}
          onChange={(e) => set("passion_description", e.target.value)}
          placeholder="Innovation and storytelling…"
          rows={2}
        />
      </Field>
      <Field label="Work Experience Title">
        <Input
          value={content.work_experience_title ?? ""}
          onChange={(e) => set("work_experience_title", e.target.value)}
          placeholder="Work Experience"
        />
      </Field>
      <Field label="Work Experience Text">
        <Textarea
          value={content.work_experience_text ?? ""}
          onChange={(e) => set("work_experience_text", e.target.value)}
          rows={3}
        />
      </Field>
      <Field label="About Description">
        <Textarea
          value={content.about_description ?? ""}
          onChange={(e) => set("about_description", e.target.value)}
          rows={3}
        />
      </Field>
      <Field label="Inline Image URL">
        <Input
          value={content.inline_image_url ?? ""}
          onChange={(e) => set("inline_image_url", e.target.value)}
        />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Grid Image 1 URL">
          <Input
            value={content.grid_image1_url ?? ""}
            onChange={(e) => set("grid_image1_url", e.target.value)}
          />
        </Field>
        <Field label="Grid Image 2 URL">
          <Input
            value={content.grid_image2_url ?? ""}
            onChange={(e) => set("grid_image2_url", e.target.value)}
          />
        </Field>
      </div>
    </>
  );
}

function WorkstationFields({
  content,
  set,
}: {
  content: Record<string, string>;
  set: (f: string, v: string) => void;
}) {
  const images: Array<{ url: string; alt: string }> = (() => {
    try {
      return JSON.parse(content.images ?? "[]");
    } catch {
      return [{ url: "", alt: "" }, { url: "", alt: "" }, { url: "", alt: "" }, { url: "", alt: "" }];
    }
  })();

  function setImage(i: number, field: "url" | "alt", value: string) {
    const updated = [...images];
    updated[i] = { ...updated[i], [field]: value };
    set("images", JSON.stringify(updated));
  }

  return (
    <>
      <Field label="Heading">
        <Input
          value={content.heading ?? ""}
          onChange={(e) => set("heading", e.target.value)}
          placeholder="My Workstation"
        />
      </Field>
      <Field label="Description">
        <Input
          value={content.description ?? ""}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Where ideas come to life"
        />
      </Field>
      {[0, 1, 2, 3].map((i) => (
        <Card key={i} className="!bg-white/3 !border-white/5">
          <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-3">
            Image {i + 1}
          </p>
          <div className="space-y-2">
            <Field label="URL">
              <Input
                value={images[i]?.url ?? ""}
                onChange={(e) => setImage(i, "url", e.target.value)}
                placeholder="https://…"
              />
            </Field>
            <Field label="Alt text">
              <Input
                value={images[i]?.alt ?? ""}
                onChange={(e) => setImage(i, "alt", e.target.value)}
                placeholder="Workspace setup"
              />
            </Field>
          </div>
        </Card>
      ))}
    </>
  );
}

function CtaFields({
  content,
  set,
}: {
  content: Record<string, string>;
  set: (f: string, v: string) => void;
}) {
  return (
    <>
      <Field label="Heading">
        <Input
          value={content.heading ?? ""}
          onChange={(e) => set("heading", e.target.value)}
          placeholder="Have An Idea?"
        />
      </Field>
      <Field label="Subheading">
        <Input
          value={content.subheading ?? ""}
          onChange={(e) => set("subheading", e.target.value)}
          placeholder="Tell Me About It"
        />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Button Text">
          <Input
            value={content.button_text ?? ""}
            onChange={(e) => set("button_text", e.target.value)}
            placeholder="Get In Touch"
          />
        </Field>
        <Field label="Button Link">
          <Input
            value={content.button_href ?? ""}
            onChange={(e) => set("button_href", e.target.value)}
            placeholder="/contact"
          />
        </Field>
      </div>
    </>
  );
}

function ContactFields({
  content,
  set,
}: {
  content: Record<string, string>;
  set: (f: string, v: string) => void;
}) {
  return (
    <>
      <Field label="Main Headline">
        <Input
          value={content.headline ?? ""}
          onChange={(e) => set("headline", e.target.value)}
          placeholder="Let's work together."
        />
      </Field>
      <Field label="Marquee Text" hint="Scrolling text at the top of the contact page">
        <Textarea
          value={content.marquee_text ?? ""}
          onChange={(e) => set("marquee_text", e.target.value)}
          rows={2}
          placeholder="Available for freelance  •  Open to collaboration"
        />
      </Field>
      <Field label="Availability Badge Text">
        <Input
          value={content.availability_text ?? ""}
          onChange={(e) => set("availability_text", e.target.value)}
          placeholder="Available for new projects"
        />
      </Field>
      <Field label="Form Heading">
        <Input
          value={content.form_heading ?? ""}
          onChange={(e) => set("form_heading", e.target.value)}
          placeholder="Tell me about your project"
        />
      </Field>
    </>
  );
}
