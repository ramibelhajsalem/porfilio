"use client";

import { useState, useTransition, useRef } from "react";
import { uploadImage, deleteImage } from "@/lib/supabase/actions";
import type { PortfolioImage } from "@/lib/supabase/types";
import Image from "next/image";
import {
  Upload,
  Trash2,
  Copy,
  Check,
  CloudUpload,
  ImageIcon,
} from "lucide-react";
import { Field, Input, Card } from "@/components/admin/form-field";

const SECTIONS = [
  { value: "general",     label: "General" },
  { value: "hero",        label: "Hero" },
  { value: "about",       label: "About" },
  { value: "workstation", label: "Workstation" },
  { value: "project",     label: "Project" },
  { value: "testimonial", label: "Testimonial" },
];

export default function ImagesClient({ images: initial }: { images: PortfolioImage[] }) {
  const [images, setImages] = useState(initial);
  const [isPending, startTransition] = useTransition();
  const [uploadSection, setUploadSection] = useState("general");
  const [uploadAlt, setUploadAlt] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    setUploadError(null);
    const file = files[0];
    const fd = new FormData();
    fd.append("file", file);
    fd.append("section", uploadSection);
    fd.append("alt", uploadAlt || file.name);
    startTransition(async () => {
      const result = await uploadImage(fd);
      if (result?.error) {
        setUploadError(result.error);
      } else if (result?.image) {
        setImages((prev) => [result.image!, ...prev]);
        setUploadAlt("");
      }
    });
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  }

  function handleDelete(id: string, storagePath: string | null) {
    if (!confirm("Delete this image? This cannot be undone.")) return;
    setImages((prev) => prev.filter((img) => img.id !== id));
    startTransition(() => deleteImage(id, storagePath));
  }

  const filtered =
    filter === "all" ? images : images.filter((img) => img.section === filter);

  return (
    <div className="space-y-6">
      {/* Upload area */}
      <Card>
        <h2 className="text-white font-semibold text-sm mb-5">Upload Image</h2>
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onClick={() => fileRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition ${
            dragActive
              ? "border-teal-500 bg-teal-500/5"
              : "border-white/10 hover:border-white/20 hover:bg-white/5"
          }`}
        >
          {isPending ? (
            <div className="flex flex-col items-center gap-3">
              <span className="w-8 h-8 border-2 border-teal-500/30 border-t-teal-500 rounded-full animate-spin" />
              <p className="text-white/50 text-sm">Uploading…</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <CloudUpload className="w-10 h-10 text-white/20" />
              <p className="text-white/60 text-sm font-medium">
                Drop image here or <span className="text-teal-400">click to browse</span>
              </p>
              <p className="text-white/30 text-xs">PNG, JPG, GIF, WebP up to 10MB</p>
            </div>
          )}
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="grid grid-cols-2 gap-4 mt-4">
          <Field label="Section">
            <select
              value={uploadSection}
              onChange={(e) => setUploadSection(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-teal-500/60 transition appearance-none"
            >
              {SECTIONS.map((s) => (
                <option key={s.value} value={s.value} className="bg-[#0f172a]">
                  {s.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Alt Text">
            <Input
              value={uploadAlt}
              onChange={(e) => setUploadAlt(e.target.value)}
              placeholder="Descriptive alt text…"
            />
          </Field>
        </div>

        {uploadError && (
          <p className="mt-3 text-red-400 text-sm">{uploadError}</p>
        )}
      </Card>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 text-xs rounded-xl transition ${
            filter === "all"
              ? "bg-teal-700 text-white"
              : "bg-white/5 text-white/40 hover:text-white hover:bg-white/10"
          }`}
        >
          All ({images.length})
        </button>
        {SECTIONS.map((s) => {
          const count = images.filter((img) => img.section === s.value).length;
          if (!count) return null;
          return (
            <button
              key={s.value}
              onClick={() => setFilter(s.value)}
              className={`px-3 py-1.5 text-xs rounded-xl transition ${
                filter === s.value
                  ? "bg-teal-700 text-white"
                  : "bg-white/5 text-white/40 hover:text-white hover:bg-white/10"
              }`}
            >
              {s.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-white/30">
          <ImageIcon className="w-8 h-8 mx-auto mb-3 opacity-30" />
          <p>No images uploaded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((img) => (
            <div
              key={img.id}
              className="group relative bg-white/5 border border-white/8 rounded-2xl overflow-hidden hover:border-white/15 transition"
            >
              {/* Image */}
              <div className="relative aspect-square bg-white/5">
                <Image
                  src={img.url}
                  alt={img.alt ?? img.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>

              {/* Info */}
              <div className="p-3">
                <p className="text-white text-xs font-medium truncate mb-0.5">
                  {img.name}
                </p>
                <p className="text-white/30 text-[10px] truncate">{img.alt}</p>
                {img.section && (
                  <span className="mt-1.5 inline-block px-2 py-0.5 text-[10px] bg-teal-500/10 text-teal-400/80 rounded-full">
                    {img.section}
                  </span>
                )}
              </div>

              {/* Hover actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                <button
                  onClick={() => copyUrl(img.url)}
                  title="Copy URL"
                  className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-white transition"
                >
                  {copied === img.url ? (
                    <Check className="w-4 h-4 text-teal-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => handleDelete(img.id, img.storage_path)}
                  title="Delete"
                  className="p-2.5 bg-red-500/20 hover:bg-red-500/40 rounded-xl text-red-400 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
