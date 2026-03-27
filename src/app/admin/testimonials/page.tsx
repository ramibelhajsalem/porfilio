"use client";

import { useState, useTransition, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/lib/supabase/actions";
import {
  Field,
  Input,
  Textarea,
  Toggle,
  PageHeader,
  Card,
} from "@/components/admin/form-field";
import { UrlUploadInput } from "@/components/admin/url-upload-input";
import type { Testimonial } from "@/lib/supabase/types";
import { Plus, Pencil, Trash2, X, Check, Quote } from "lucide-react";

const EMPTY: Omit<Testimonial, "id" | "created_at" | "updated_at"> = {
  quote: "",
  client_name: "",
  client_role: "",
  client_company: null,
  avatar_url: null,
  is_active: true,
  order_index: 0,
};

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [form, setForm] = useState<typeof EMPTY>({ ...EMPTY });
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("testimonials")
      .select("*")
      .order("order_index")
      .then(({ data }) => {
        setItems((data ?? []) as Testimonial[]);
        setLoading(false);
      });
  }, []);

  function openNew() {
    setForm({ ...EMPTY, order_index: items.length });
    setEditing("new");
    setError(null);
  }

  function openEdit(t: Testimonial) {
    setForm({
      quote: t.quote,
      client_name: t.client_name,
      client_role: t.client_role,
      client_company: t.client_company,
      avatar_url: t.avatar_url,
      is_active: t.is_active,
      order_index: t.order_index,
    });
    setEditing(t.id);
    setError(null);
  }

  function set<K extends keyof typeof EMPTY>(key: K, value: (typeof EMPTY)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    setError(null);
    startTransition(async () => {
      if (editing === "new") {
        const result = await createTestimonial(form);
        if (result?.error) { setError(result.error); return; }
        setItems((prev) => [...prev, result.testimonial!]);
      } else if (editing) {
        const result = await updateTestimonial(editing, form);
        if (result?.error) { setError(result.error); return; }
        setItems((prev) =>
          prev.map((t) => (t.id === editing ? { ...t, ...form } : t))
        );
      }
      setEditing(null);
    });
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    setItems((prev) => prev.filter((t) => t.id !== id));
    startTransition(async () => {
      await deleteTestimonial(id);
    });
  }

  function toggleActive(t: Testimonial) {
    setItems((prev) =>
      prev.map((x) => (x.id === t.id ? { ...x, is_active: !x.is_active } : x))
    );
    startTransition(async () => {
      await updateTestimonial(t.id, { is_active: !t.is_active });
    });
  }

  if (loading)
    return (
      <div className="p-8 flex items-center justify-center h-64">
        <span className="w-6 h-6 border-2 border-teal-500/30 border-t-teal-500 rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="p-8">
      <PageHeader
        title="Testimonials"
        description="Manage client testimonials shown on your portfolio."
        action={
          <button
            onClick={openNew}
            className="flex items-center gap-2 px-4 py-2.5 bg-teal-700 hover:bg-teal-600 text-white text-sm font-medium rounded-xl transition"
          >
            <Plus className="w-4 h-4" />
            Add Testimonial
          </button>
        }
      />

      {/* Inline editor */}
      {editing && (
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold text-sm">
              {editing === "new" ? "New Testimonial" : "Edit Testimonial"}
            </h2>
            <button
              onClick={() => setEditing(null)}
              className="text-white/30 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            <Field label="Quote" required>
              <Textarea
                value={form.quote}
                onChange={(e) => set("quote", e.target.value)}
                placeholder="Thanks to the efforts…"
                rows={4}
                required
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Client Name" required>
                <Input
                  value={form.client_name}
                  onChange={(e) => set("client_name", e.target.value)}
                  placeholder="Leslie Alexander"
                  required
                />
              </Field>
              <Field label="Role / Title" required>
                <Input
                  value={form.client_role}
                  onChange={(e) => set("client_role", e.target.value)}
                  placeholder="Founder & CEO"
                  required
                />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Company">
                <Input
                  value={form.client_company ?? ""}
                  onChange={(e) => set("client_company", e.target.value || null)}
                  placeholder="OPE Studio"
                />
              </Field>
              <Field label="Avatar URL">
                <UrlUploadInput
                  value={form.avatar_url ?? ""}
                  onChange={(value) => set("avatar_url", value || null)}
                  placeholder="https://…"
                  initialSection="testimonial"
                  accept="image/*"
                  dialogTitle="Select a testimonial avatar"
                  alt={form.client_name ? `${form.client_name} avatar` : "Client avatar"}
                />
              </Field>
            </div>
            <Toggle
              checked={form.is_active}
              onChange={(v) => set("is_active", v)}
              label="Active"
              description="Only active testimonials are shown"
            />

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                disabled={isPending}
                className="flex items-center gap-2 px-5 py-2.5 bg-teal-700 hover:bg-teal-600 disabled:opacity-60 text-white text-sm font-medium rounded-xl transition"
              >
                <Check className="w-4 h-4" />
                {isPending ? "Saving…" : "Save"}
              </button>
              <button
                onClick={() => setEditing(null)}
                className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white/60 text-sm rounded-xl transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* List */}
      <div className="space-y-3">
        {items.map((t) => (
          <div
            key={t.id}
            className={`flex gap-4 bg-white/5 border border-white/8 rounded-2xl p-5 hover:bg-white/8 transition ${
              !t.is_active ? "opacity-50" : ""
            }`}
          >
            <Quote className="w-5 h-5 text-teal-400/40 shrink-0 mt-1" />
            <div className="flex-1 min-w-0">
              <p className="text-white/80 text-sm leading-relaxed mb-3 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="text-white text-xs font-semibold">{t.client_name}</p>
              <p className="text-white/40 text-xs">
                {t.client_role}
                {t.client_company ? ` · ${t.client_company}` : ""}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => toggleActive(t)}
                title={t.is_active ? "Deactivate" : "Activate"}
                className={`px-3 py-1.5 text-xs rounded-xl transition ${
                  t.is_active
                    ? "bg-teal-500/10 text-teal-400 hover:bg-teal-500/20"
                    : "bg-white/5 text-white/30 hover:bg-white/10"
                }`}
              >
                {t.is_active ? "Active" : "Hidden"}
              </button>
              <button
                onClick={() => openEdit(t)}
                className="p-2 rounded-xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(t.id)}
                className="p-2 rounded-xl bg-white/5 text-white/40 hover:text-red-400 hover:bg-red-500/10 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && !editing && (
          <div className="text-center py-16 text-white/30">
            <Quote className="w-8 h-8 mx-auto mb-3 opacity-30" />
            <p>No testimonials yet. Add your first one!</p>
          </div>
        )}
      </div>
    </div>
  );
}
