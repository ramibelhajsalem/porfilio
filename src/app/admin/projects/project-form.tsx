"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createProject, updateProject } from "@/lib/supabase/actions";
import {
  Field,
  Input,
  Textarea,
  Toggle,
  SaveBar,
  Card,
} from "@/components/admin/form-field";
import { UrlUploadInput } from "@/components/admin/url-upload-input";
import type { Project } from "@/lib/supabase/types";
import Image from "next/image";
import { X, Plus } from "lucide-react";

type ProjectFormData = Omit<Project, "id" | "created_at" | "updated_at">;

const GRADIENTS = [
  { label: "Teal",   value: "from-[#2d7a4f] to-[#1a5c3a]" },
  { label: "Dark",   value: "from-[#333] to-[#111]" },
  { label: "Amber",  value: "from-[#7a4f2d] to-[#5c3a1a]" },
  { label: "Blue",   value: "from-[#2d4f7a] to-[#1a3a5c]" },
  { label: "Green",  value: "from-[#4f7a2d] to-[#3a5c1a]" },
  { label: "Rose",   value: "from-[#7a2d4f] to-[#5c1a3a]" },
];

const CATEGORIES = ["Web App", "Branding", "E-Commerce", "SaaS", "Mobile", "Experiment", "Other"];

export default function ProjectForm({
  project,
  mode,
}: {
  project?: Project;
  mode: "create" | "edit";
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");

  const [form, setForm] = useState<ProjectFormData>({
    title: project?.title ?? "",
    year: project?.year ?? String(new Date().getFullYear()),
    category: project?.category ?? "Web App",
    description: project?.description ?? "",
    image_url: project?.image_url ?? "",
    project_url: project?.project_url ?? "",
    tags: project?.tags ?? [],
    gradient: project?.gradient ?? GRADIENTS[0].value,
    accent: project?.accent ?? "rgba(184,240,42,0.8)",
    label: project?.label ?? "",
    is_featured: project?.is_featured ?? true,
    is_hidden: project?.is_hidden ?? false,
    order_index: project?.order_index ?? 0,
  });

  function set<K extends keyof ProjectFormData>(key: K, value: ProjectFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function addTag() {
    const tag = tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      set("tags", [...form.tags, tag]);
    }
    setTagInput("");
  }

  function removeTag(tag: string) {
    set("tags", form.tags.filter((t) => t !== tag));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(false);
    setError(null);
    startTransition(async () => {
      let result;
      if (mode === "create") {
        result = await createProject(form);
      } else {
        result = await updateProject(project!.id, form);
      }
      if (result?.error) {
        setError(result.error);
      } else {
        setSaved(true);
        setTimeout(() => {
          router.push("/admin/projects");
        }, 800);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {/* Basic Info */}
      <Card>
        <h2 className="text-white font-semibold text-sm mb-5">Basic Info</h2>
        <div className="space-y-4">
          <Field label="Title" required>
            <Input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Reality Affodils"
              required
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Year" required>
              <Input
                value={form.year}
                onChange={(e) => set("year", e.target.value)}
                placeholder="2024"
                required
              />
            </Field>
            <Field label="Category" required>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-teal-500/60 transition appearance-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-[#0f172a]">
                    {c}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Short Label" hint="Uppercase label shown on the card (e.g. REALITY)">
            <Input
              value={form.label ?? ""}
              onChange={(e) => set("label", e.target.value)}
              placeholder="REALITY"
            />
          </Field>
          <Field label="Description" required>
            <Textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="An immersive 3D product experience…"
              rows={3}
              required
            />
          </Field>
        </div>
      </Card>

      {/* Media */}
      <Card>
        <h2 className="text-white font-semibold text-sm mb-5">Media & Links</h2>
        <div className="space-y-4">
          <Field label="Cover Image URL" hint="Use the Images section to upload, then paste the URL">
            <UrlUploadInput
              value={form.image_url ?? ""}
              onChange={(value) => set("image_url", value)}
              placeholder="https://images.unsplash.com/…"
              initialSection="project"
              accept="image/*"
              dialogTitle="Select a project cover"
              alt={form.title || "Project cover image"}
            />
          </Field>
          {form.image_url && (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-white/5">
              <Image
                src={form.image_url}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
          )}
          <Field label="Project URL" hint="Link to live project or case study">
            <Input
              value={form.project_url ?? ""}
              onChange={(e) => set("project_url", e.target.value)}
              placeholder="https://…"
            />
          </Field>
        </div>
      </Card>

      {/* Tags */}
      <Card>
        <h2 className="text-white font-semibold text-sm mb-5">Tags</h2>
        <div className="flex flex-wrap gap-2 mb-3">
          {form.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1.5 px-3 py-1 bg-teal-500/10 text-teal-400 rounded-full text-xs"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:text-white transition"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
            placeholder="Add a tag…"
            className="flex-1"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </Card>

      {/* Style */}
      <Card>
        <h2 className="text-white font-semibold text-sm mb-5">Card Style</h2>
        <div className="space-y-4">
          <Field label="Gradient">
            <div className="grid grid-cols-3 gap-2">
              {GRADIENTS.map(({ label, value }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => set("gradient", value)}
                  className={`h-12 rounded-xl bg-linear-to-br ${value} transition border-2 ${
                    form.gradient === value
                      ? "border-teal-400"
                      : "border-transparent"
                  }`}
                >
                  <span className="sr-only">{label}</span>
                </button>
              ))}
            </div>
          </Field>
          <Field label="Accent Color" hint="Used for highlights on the card">
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={form.accent?.replace(/rgba?\(.*/, "") ?? "#b8f02a"}
                onChange={(e) => set("accent", e.target.value)}
                className="w-10 h-10 rounded-lg border border-white/10 bg-transparent cursor-pointer"
              />
              <Input
                value={form.accent ?? ""}
                onChange={(e) => set("accent", e.target.value)}
                placeholder="rgba(184,240,42,0.8)"
                className="flex-1"
              />
            </div>
          </Field>
        </div>
      </Card>

      {/* Visibility */}
      <Card>
        <h2 className="text-white font-semibold text-sm mb-5">Visibility & Display</h2>
        <div className="space-y-4">
          <Toggle
            checked={form.is_featured}
            onChange={(v) => set("is_featured", v)}
            label="Featured project"
            description="Featured projects are highlighted in the portfolio"
          />
          <Toggle
            checked={form.is_hidden}
            onChange={(v) => set("is_hidden", v)}
            label="Hidden"
            description="Hidden projects are not shown to visitors"
          />
        </div>
      </Card>

      <SaveBar isPending={isPending} saved={saved} error={error} />
    </form>
  );
}
