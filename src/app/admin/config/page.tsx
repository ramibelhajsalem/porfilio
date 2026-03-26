"use client";

import { useState, useTransition, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { updateSiteConfig } from "@/lib/supabase/actions";
import { Field, Input, PageHeader, Card } from "@/components/admin/form-field";
import type { SiteConfig } from "@/lib/supabase/types";
import { Save, Check } from "lucide-react";

export default function SiteConfigPage() {
  const [configs, setConfigs] = useState<SiteConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("site_config")
      .select("*")
      .order("group_name")
      .then(({ data }) => {
        setConfigs(data ?? []);
        setLoading(false);
      });
  }, []);

  function setValue(key: string, value: string) {
    setConfigs((prev) =>
      prev.map((c) => (c.key === key ? { ...c, value } : c))
    );
  }

  function handleSave(key: string, value: string) {
    setSaving(key);
    startTransition(async () => {
      await updateSiteConfig(key, value);
      setSaved(key);
      setSaving(null);
      setTimeout(() => setSaved(null), 2000);
    });
  }

  // Group configs
  const groups = configs.reduce<Record<string, SiteConfig[]>>((acc, c) => {
    const g = c.group_name ?? "general";
    acc[g] = [...(acc[g] ?? []), c];
    return acc;
  }, {});

  const groupLabels: Record<string, string> = {
    seo:          "SEO & Metadata",
    theme:        "Theme Colors",
    content:      "Content Settings",
    integrations: "Integrations",
    general:      "General",
  };

  if (loading)
    return (
      <div className="p-8 flex items-center justify-center h-64">
        <span className="w-6 h-6 border-2 border-teal-500/30 border-t-teal-500 rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="p-8 max-w-2xl">
      <PageHeader
        title="Site Configuration"
        description="Global settings, SEO metadata, theme colors, and integrations."
      />

      <div className="space-y-6">
        {Object.entries(groups).map(([group, items]) => (
          <Card key={group}>
            <h2 className="text-white font-semibold text-sm mb-5">
              {groupLabels[group] ?? group}
            </h2>
            <div className="space-y-4">
              {items.map((config) => (
                <Field key={config.key} label={config.label ?? config.key}>
                  <div className="flex gap-2">
                    {config.type === "color" ? (
                      <>
                        <input
                          type="color"
                          value={config.value ?? "#000000"}
                          onChange={(e) => setValue(config.key, e.target.value)}
                          className="w-10 h-11 rounded-lg border border-white/10 bg-transparent cursor-pointer shrink-0"
                        />
                        <Input
                          value={config.value ?? ""}
                          onChange={(e) => setValue(config.key, e.target.value)}
                          placeholder="#000000"
                          className="flex-1"
                        />
                      </>
                    ) : (
                      <Input
                        value={config.value ?? ""}
                        onChange={(e) => setValue(config.key, e.target.value)}
                        placeholder={`Enter ${config.label ?? config.key}…`}
                      />
                    )}
                    <button
                      onClick={() => handleSave(config.key, config.value ?? "")}
                      disabled={saving === config.key}
                      className={`px-3 py-2.5 rounded-xl text-sm font-medium transition shrink-0 ${
                        saved === config.key
                          ? "bg-teal-500/20 text-teal-400"
                          : "bg-white/5 text-white/50 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {saving === config.key ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin block" />
                      ) : saved === config.key ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </Field>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
