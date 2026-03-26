"use client";

import { useState, useTransition, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { upsertPersonalInfo } from "@/lib/supabase/actions";
import {
  Field,
  Input,
  Textarea,
  Toggle,
  SaveBar,
  PageHeader,
  Card,
} from "@/components/admin/form-field";
import type { PersonalInfo } from "@/lib/supabase/types";

export default function PersonalInfoPage() {
  const [info, setInfo] = useState<Partial<PersonalInfo>>({});
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("personal_info")
      .select("*")
      .single()
      .then(({ data }) => {
        if (data) setInfo(data);
        setLoading(false);
      });
  }, []);

  function set(key: keyof PersonalInfo, value: string | boolean) {
    setInfo((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(false);
    setError(null);
    startTransition(async () => {
      const result = await upsertPersonalInfo(info);
      if (result?.error) {
        setError(result.error);
      } else {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    });
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-64">
        <span className="w-6 h-6 border-2 border-teal-500/30 border-t-teal-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <PageHeader
        title="Personal Info"
        description="Edit your name, bio, contact details, and availability."
      />

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        {/* Identity */}
        <Card>
          <h2 className="text-white font-semibold text-sm mb-5">Identity</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Full Name" required>
                <Input
                  value={info.name ?? ""}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Albert"
                  required
                />
              </Field>
              <Field label="First Name">
                <Input
                  value={info.first_name ?? ""}
                  onChange={(e) => set("first_name", e.target.value)}
                  placeholder="Albert"
                />
              </Field>
            </div>
            <Field label="Title" required hint="Shown in the hero section">
              <Input
                value={info.title ?? ""}
                onChange={(e) => set("title", e.target.value)}
                placeholder="Front-End Developer"
                required
              />
            </Field>
            <Field label="Subtitle" hint="The animated hero text (e.g. Front-End-Developer-Code)">
              <Input
                value={info.subtitle ?? ""}
                onChange={(e) => set("subtitle", e.target.value)}
                placeholder="Front-End-Developer-Code"
              />
            </Field>
          </div>
        </Card>

        {/* Bio */}
        <Card>
          <h2 className="text-white font-semibold text-sm mb-5">Bio</h2>
          <div className="space-y-4">
            <Field label="Short Bio" hint="Shown in the hero section">
              <Textarea
                value={info.bio ?? ""}
                onChange={(e) => set("bio", e.target.value)}
                placeholder="I am a creative front-end developer…"
                rows={3}
              />
            </Field>
            <Field label="Extended Bio" hint="Shown in the About section">
              <Textarea
                value={info.bio_extended ?? ""}
                onChange={(e) => set("bio_extended", e.target.value)}
                placeholder="An adept of Scandinavian culture…"
                rows={4}
              />
            </Field>
          </div>
        </Card>

        {/* Contact */}
        <Card>
          <h2 className="text-white font-semibold text-sm mb-5">Contact & Location</h2>
          <div className="space-y-4">
            <Field label="Email" required>
              <Input
                type="email"
                value={info.email ?? ""}
                onChange={(e) => set("email", e.target.value)}
                placeholder="info@albert.com"
                required
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Location">
                <Input
                  value={info.location ?? ""}
                  onChange={(e) => set("location", e.target.value)}
                  placeholder="Eindhoven, The Netherlands"
                />
              </Field>
              <Field label="Location Detail">
                <Input
                  value={info.location_detail ?? ""}
                  onChange={(e) => set("location_detail", e.target.value)}
                  placeholder="Open to remote worldwide"
                />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Timezone">
                <Input
                  value={info.timezone ?? ""}
                  onChange={(e) => set("timezone", e.target.value)}
                  placeholder="Europe/Amsterdam"
                />
              </Field>
              <Field label="Response Time">
                <Input
                  value={info.response_time ?? ""}
                  onChange={(e) => set("response_time", e.target.value)}
                  placeholder="24 hours"
                />
              </Field>
            </div>
          </div>
        </Card>

        {/* Photo */}
        <Card>
          <h2 className="text-white font-semibold text-sm mb-5">Profile Photo</h2>
          <Field label="Avatar URL" hint="URL to your profile photo. Upload via Images section and paste the URL here.">
            <Input
              value={info.avatar_url ?? ""}
              onChange={(e) => set("avatar_url", e.target.value)}
              placeholder="/images/user1.png or https://…"
            />
          </Field>
          {info.avatar_url && (
            <div className="mt-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={info.avatar_url}
                alt="Preview"
                className="w-24 h-24 rounded-2xl object-cover border border-white/10"
              />
            </div>
          )}
        </Card>

        {/* Availability */}
        <Card>
          <h2 className="text-white font-semibold text-sm mb-5">Availability</h2>
          <Toggle
            checked={info.availability ?? true}
            onChange={(v) => set("availability", v)}
            label="Available for new projects"
            description="Shows a green pulsing indicator on the contact page"
          />
        </Card>

        <SaveBar isPending={isPending} saved={saved} error={error} />
      </form>
    </div>
  );
}
