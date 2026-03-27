"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { Check, Plus, RefreshCw, Save, Sparkles, Trash2 } from "lucide-react";

import { Field, Input, PageHeader, Card } from "@/components/admin/form-field";
import { UrlUploadInput } from "@/components/admin/url-upload-input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { syncSiteModels, upsertSiteConfigs } from "@/lib/supabase/actions";
import type { SiteConfig } from "@/lib/supabase/types";
import {
  type AIModelConfig,
  type AIProviderConfig,
  type AIProviderType,
  createDefaultSiteConfigRecords,
  getSiteConfigDefinition,
  parseJsonSiteConfig,
  stringifySiteConfigJson,
} from "@/lib/site-config";
import { useToast } from "@/hooks/use-toast";
import { MEDIA_SECTION_OPTIONS } from "@/lib/media";

const PROVIDER_TYPES: Array<{ value: AIProviderType; label: string }> = [
  { value: "openrouter", label: "OpenRouter" },
  { value: "openai", label: "OpenAI" },
  { value: "anthropic", label: "Anthropic" },
  { value: "google", label: "Google Gemini" },
  { value: "openai-compatible", label: "OpenAI-Compatible" },
  { value: "custom", label: "Custom" },
];

function createProvider(): AIProviderConfig {
  return {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    label: "",
    type: "openrouter",
    base_url: "",
    api_key_env: "",
    api_key: "",
    enabled: true,
    auto_sync: true,
  };
}

function createModel(providerId?: string): AIModelConfig {
  return {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    provider_id: providerId ?? "",
    label: "",
    description: "",
    context_window: null,
    is_free: null,
    enabled: true,
    synced_at: null,
  };
}

function mergeSiteConfigs(configs: SiteConfig[]) {
  const merged = createDefaultSiteConfigRecords().reduce<
    Record<string, SiteConfig>
  >((acc, config) => {
    acc[config.key] = config;
    return acc;
  }, {});

  configs.forEach((config) => {
    merged[config.key] = config;
  });

  return merged;
}

export default function SiteConfigPage() {
  const [configs, setConfigs] = useState<Record<string, SiteConfig>>({});
  const [providers, setProviders] = useState<AIProviderConfig[]>([]);
  const [models, setModels] = useState<AIModelConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncingProvider, setSyncingProvider] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [isSaving, startTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("site_config")
      .select("*")
      .then(({ data, error }) => {
        if (error) {
          toast({
            title: "Settings failed to load",
            description: error.message,
            variant: "destructive",
          });
        }

        const merged = mergeSiteConfigs(data ?? []);
        setConfigs(merged);
        setProviders(
          parseJsonSiteConfig<AIProviderConfig[]>(merged.ai_providers?.value, [])
        );
        setModels(
          parseJsonSiteConfig<AIModelConfig[]>(merged.ai_models?.value, [])
        );
        setLoading(false);
      });
  }, [toast]);

  const extraConfigs = useMemo(
    () =>
      Object.values(configs).filter(
        (config) => !getSiteConfigDefinition(config.key) && config.group_name !== "ai"
      ),
    [configs]
  );

  function setValue(key: string, value: string) {
    setSaved(false);
    setConfigs((prev) => ({
      ...prev,
      [key]: {
        ...(prev[key] ?? {
          id: key,
          key,
          type: getSiteConfigDefinition(key)?.type ?? "text",
          label: getSiteConfigDefinition(key)?.label ?? key,
          group_name: getSiteConfigDefinition(key)?.group_name ?? "general",
          updated_at: new Date().toISOString(),
          value: "",
        }),
        value,
      },
    }));
  }

  function updateProvider(
    providerId: string,
    field: keyof AIProviderConfig,
    value: string | boolean | null
  ) {
    setSaved(false);
    setProviders((current) =>
      current.map((provider) =>
        provider.id === providerId ? { ...provider, [field]: value } : provider
      )
    );
  }

  function updateModel(
    modelId: string,
    field: keyof AIModelConfig,
    value: string | boolean | number | string[] | null
  ) {
    setSaved(false);
    setModels((current) =>
      current.map((model) =>
        model.id === modelId ? { ...model, [field]: value } : model
      )
    );
  }

  function handleSaveAll() {
    startTransition(async () => {
      const payload = [
        ...Object.values(configs)
          .filter((config) => config.key !== "ai_providers" && config.key !== "ai_models")
          .map((config) => ({
            key: config.key,
            value: config.value ?? "",
            type: config.type,
            label: config.label ?? config.key,
            group_name: config.group_name ?? getSiteConfigDefinition(config.key)?.group_name,
          })),
        {
          key: "ai_providers",
          value: stringifySiteConfigJson(providers),
          type: "json",
          label: "AI Providers",
          group_name: "ai",
        },
        {
          key: "ai_models",
          value: stringifySiteConfigJson(models),
          type: "json",
          label: "AI Models",
          group_name: "ai",
        },
      ];

      const result = await upsertSiteConfigs(payload);

      if (result?.error) {
        toast({
          title: "Save failed",
          description: result.error,
          variant: "destructive",
        });
        return;
      }

      setConfigs((prev) => ({
        ...prev,
        ai_providers: {
          ...(prev.ai_providers ?? {
            id: "ai_providers",
            key: "ai_providers",
            type: "json",
            label: "AI Providers",
            group_name: "ai",
            updated_at: new Date().toISOString(),
            value: "[]",
          }),
          value: stringifySiteConfigJson(providers),
        },
        ai_models: {
          ...(prev.ai_models ?? {
            id: "ai_models",
            key: "ai_models",
            type: "json",
            label: "AI Models",
            group_name: "ai",
            updated_at: new Date().toISOString(),
            value: "[]",
          }),
          value: stringifySiteConfigJson(models),
        },
      }));
      setSaved(true);
      toast({
        title: "Settings saved",
        description: "SEO, theme, integrations, and AI settings were updated.",
        variant: "success",
      });
      setTimeout(() => setSaved(false), 2500);
    });
  }

  async function handleSyncProvider(provider: AIProviderConfig) {
    setSyncingProvider(provider.id);
    const result = await syncSiteModels(provider);
    setSyncingProvider(null);

    if (result?.error) {
      toast({
        title: `Model sync failed for ${provider.label || provider.type}`,
        description: result.error,
        variant: "destructive",
      });
      return;
    }

    const synced = result.models ?? [];
    setModels((current) => [
      ...current.filter((model) => model.provider_id !== provider.id),
      ...synced,
    ]);
    setSaved(false);
    toast({
      title: "Models synced",
      description: `${synced.length} model${synced.length === 1 ? "" : "s"} loaded from ${
        provider.label || provider.type
      }.`,
      variant: "success",
    });
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center p-8">
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-teal-500/30 border-t-teal-500" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl p-8">
      <PageHeader
        title="Site Configuration"
        description="Manage SEO metadata, theme tokens, integrations, and AI providers/models in one place."
        action={
          <Button
            type="button"
            onClick={handleSaveAll}
            disabled={isSaving}
            className="bg-teal-700 text-white hover:bg-teal-600"
          >
            {isSaving ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : saved ? (
              <Check />
            ) : (
              <Save />
            )}
            {isSaving ? "Saving..." : saved ? "Saved" : "Save All"}
          </Button>
        }
      />

      <Tabs defaultValue="seo">
        <TabsList>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="ai">AI Models</TabsTrigger>
        </TabsList>

        <TabsContent value="seo">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <Card>
              <h2 className="mb-5 text-sm font-semibold text-white">
                Search & Social Metadata
              </h2>
              <div className="space-y-4">
                <Field label="Site Title">
                  <Input
                    value={configs.site_title?.value ?? ""}
                    onChange={(event) => setValue("site_title", event.target.value)}
                    placeholder="Albert | Frontend Developer"
                  />
                </Field>
                <Field label="Site Description">
                  <Textarea
                    rows={3}
                    value={configs.site_description?.value ?? ""}
                    onChange={(event) =>
                      setValue("site_description", event.target.value)
                    }
                    placeholder="Frontend Developer Portfolio"
                  />
                </Field>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Author">
                    <Input
                      value={configs.site_author?.value ?? ""}
                      onChange={(event) =>
                        setValue("site_author", event.target.value)
                      }
                      placeholder="Albert"
                    />
                  </Field>
                  <Field label="Locale">
                    <Input
                      value={configs.site_locale?.value ?? ""}
                      onChange={(event) =>
                        setValue("site_locale", event.target.value)
                      }
                      placeholder="en_US"
                    />
                  </Field>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Canonical Site URL">
                    <Input
                      value={configs.site_url?.value ?? ""}
                      onChange={(event) => setValue("site_url", event.target.value)}
                      placeholder="https://yourdomain.com"
                    />
                  </Field>
                  <Field label="Robots">
                    <Input
                      value={configs.site_robots?.value ?? ""}
                      onChange={(event) =>
                        setValue("site_robots", event.target.value)
                      }
                      placeholder="index, follow"
                    />
                  </Field>
                </div>
                <Field label="Open Graph Image">
                  <UrlUploadInput
                    value={configs.og_image_url?.value ?? ""}
                    onChange={(value) => setValue("og_image_url", value)}
                    placeholder="https://yourdomain.com/og.png"
                    initialSection="seo"
                    sectionOptions={[...MEDIA_SECTION_OPTIONS]}
                    accept="image/*"
                    dialogTitle="Select an SEO image"
                    alt={configs.site_title?.value ?? "Site Open Graph image"}
                  />
                </Field>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Twitter / X Handle">
                    <Input
                      value={configs.twitter_handle?.value ?? ""}
                      onChange={(event) =>
                        setValue("twitter_handle", event.target.value)
                      }
                      placeholder="@yourhandle"
                    />
                  </Field>
                  <Field label="Keywords JSON">
                    <Textarea
                      rows={5}
                      value={configs.site_keywords?.value ?? "[]"}
                      onChange={(event) =>
                        setValue("site_keywords", event.target.value)
                      }
                      placeholder='["Frontend Developer", "React"]'
                    />
                  </Field>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="mb-5 text-sm font-semibold text-white">Preview</h2>
              <div className="rounded-3xl border border-white/8 bg-[#0b1222] p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-teal-300/80">
                  Search Preview
                </p>
                <div className="mt-4 space-y-2">
                  <p className="line-clamp-2 text-xl font-semibold text-white">
                    {configs.site_title?.value || "Site title"}
                  </p>
                  <p className="truncate text-sm text-teal-300/80">
                    {configs.site_url?.value || "https://yourdomain.com"}
                  </p>
                  <p className="line-clamp-3 text-sm leading-6 text-white/55">
                    {configs.site_description?.value ||
                      "Your meta description will appear here."}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="theme">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <Card>
              <h2 className="mb-5 text-sm font-semibold text-white">Theme Tokens</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  "theme_primary_color",
                  "theme_accent_color",
                  "theme_background_color",
                  "theme_surface_color",
                  "theme_foreground_color",
                  "theme_muted_color",
                ].map((key) => {
                  const config = configs[key];
                  return (
                    <Field
                      key={key}
                      label={config?.label ?? key}
                      hint={getSiteConfigDefinition(key)?.hint}
                    >
                      <div className="flex gap-3">
                        <input
                          type="color"
                          value={config?.value ?? "#000000"}
                          onChange={(event) => setValue(key, event.target.value)}
                          className="h-11 w-11 shrink-0 cursor-pointer rounded-xl border border-white/10 bg-transparent"
                        />
                        <Input
                          value={config?.value ?? ""}
                          onChange={(event) => setValue(key, event.target.value)}
                          placeholder="#000000"
                        />
                      </div>
                    </Field>
                  );
                })}
              </div>
            </Card>

            <Card>
              <h2 className="mb-5 text-sm font-semibold text-white">Theme Preview</h2>
              <div
                className="rounded-[28px] border p-5"
                style={{
                  backgroundColor: configs.theme_background_color?.value ?? "#0f172a",
                  borderColor: `${configs.theme_primary_color?.value ?? "#1B4D3E"}33`,
                }}
              >
                <div
                  className="rounded-3xl border p-5"
                  style={{
                    backgroundColor: configs.theme_surface_color?.value ?? "#172033",
                    borderColor: `${configs.theme_primary_color?.value ?? "#1B4D3E"}33`,
                    color: configs.theme_foreground_color?.value ?? "#f8fafc",
                  }}
                >
                  <p
                    className="text-xs uppercase tracking-[0.25em]"
                    style={{ color: configs.theme_muted_color?.value ?? "#94a3b8" }}
                  >
                    Portfolio Theme
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold">
                    Intentional, polished, and editable
                  </h3>
                  <p
                    className="mt-3 text-sm leading-6"
                    style={{ color: configs.theme_muted_color?.value ?? "#94a3b8" }}
                  >
                    These colors feed the root CSS variables so the public site and the admin stay aligned.
                  </p>
                  <div className="mt-5 flex gap-3">
                    <div
                      className="rounded-2xl px-4 py-2 text-sm font-medium"
                      style={{
                        backgroundColor:
                          configs.theme_primary_color?.value ?? "#1B4D3E",
                      }}
                    >
                      Primary
                    </div>
                    <div
                      className="rounded-2xl px-4 py-2 text-sm font-medium text-slate-950"
                      style={{
                        backgroundColor:
                          configs.theme_accent_color?.value ?? "#b8f02a",
                      }}
                    >
                      Accent
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations">
          <div className="space-y-6">
            <Card>
              <h2 className="mb-5 text-sm font-semibold text-white">
                Integrations & Contact
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Support Email">
                  <Input
                    value={configs.support_email?.value ?? ""}
                    onChange={(event) =>
                      setValue("support_email", event.target.value)
                    }
                    placeholder="hello@example.com"
                  />
                </Field>
                <Field label="Google Analytics ID">
                  <Input
                    value={configs.google_analytics_id?.value ?? ""}
                    onChange={(event) =>
                      setValue("google_analytics_id", event.target.value)
                    }
                    placeholder="G-XXXXXXXXXX"
                  />
                </Field>
                <Field label="Plausible Domain">
                  <Input
                    value={configs.plausible_domain?.value ?? ""}
                    onChange={(event) =>
                      setValue("plausible_domain", event.target.value)
                    }
                    placeholder="yourdomain.com"
                  />
                </Field>
              </div>
            </Card>

            {extraConfigs.length ? (
              <Card>
                <h2 className="mb-5 text-sm font-semibold text-white">
                  Additional Settings
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {extraConfigs.map((config) => (
                    <Field key={config.key} label={config.label ?? config.key}>
                      {config.type === "json" ? (
                        <Textarea
                          rows={5}
                          value={config.value ?? ""}
                          onChange={(event) =>
                            setValue(config.key, event.target.value)
                          }
                        />
                      ) : (
                        <Input
                          value={config.value ?? ""}
                          onChange={(event) =>
                            setValue(config.key, event.target.value)
                          }
                        />
                      )}
                    </Field>
                  ))}
                </div>
              </Card>
            ) : null}
          </div>
        </TabsContent>

        <TabsContent value="ai">
          <div className="space-y-6">
            <Card>
              <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-white">Providers</h2>
                  <p className="mt-1 text-sm text-white/40">
                    Add providers, store the env var name you want the server to read, and sync models automatically.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                  onClick={() => setProviders((current) => [...current, createProvider()])}
                >
                  <Plus />
                  Add Provider
                </Button>
              </div>

              <div className="space-y-4">
                {providers.map((provider) => (
                  <div
                    key={provider.id}
                    className="rounded-2xl border border-white/8 bg-white/4 p-4"
                  >
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Field label="Provider Label">
                        <Input
                          value={provider.label}
                          onChange={(event) =>
                            updateProvider(provider.id, "label", event.target.value)
                          }
                          placeholder="OpenRouter"
                        />
                      </Field>
                      <Field label="Provider Type">
                        <select
                          value={provider.type}
                          onChange={(event) =>
                            updateProvider(
                              provider.id,
                              "type",
                              event.target.value as AIProviderType
                            )
                          }
                          className="flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-teal-500/60 focus:ring-2 focus:ring-teal-500/20"
                        >
                          {PROVIDER_TYPES.map((option) => (
                            <option
                              key={option.value}
                              value={option.value}
                              className="bg-[#0f172a]"
                            >
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Base URL">
                        <Input
                          value={provider.base_url ?? ""}
                          onChange={(event) =>
                            updateProvider(provider.id, "base_url", event.target.value)
                          }
                          placeholder="Optional unless custom/openai-compatible"
                        />
                      </Field>
                      <Field label="API Key Env Name" hint="Preferred over storing raw keys in the database.">
                        <Input
                          value={provider.api_key_env ?? ""}
                          onChange={(event) =>
                            updateProvider(
                              provider.id,
                              "api_key_env",
                              event.target.value
                            )
                          }
                          placeholder="OPENROUTER_API_KEY"
                        />
                      </Field>
                      <Field label="Fallback API Key" hint="Optional. Leave empty if you use an env var.">
                        <Input
                          type="password"
                          value={provider.api_key ?? ""}
                          onChange={(event) =>
                            updateProvider(provider.id, "api_key", event.target.value)
                          }
                          placeholder="sk-..."
                        />
                      </Field>
                    </div>

                    <div className="mt-4 flex flex-col gap-3 border-t border-white/8 pt-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex flex-wrap gap-5">
                        <div className="flex items-center gap-3">
                          <Switch
                            checked={provider.enabled}
                            onCheckedChange={(checked) =>
                              updateProvider(provider.id, "enabled", checked)
                            }
                          />
                          <span className="text-sm text-white/75">Enabled</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Switch
                            checked={provider.auto_sync}
                            onCheckedChange={(checked) =>
                              updateProvider(provider.id, "auto_sync", checked)
                            }
                          />
                          <span className="text-sm text-white/75">Auto Sync</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                          onClick={() => handleSyncProvider(provider)}
                          disabled={syncingProvider === provider.id}
                        >
                          <RefreshCw
                            className={
                              syncingProvider === provider.id ? "animate-spin" : ""
                            }
                          />
                          Sync Models
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="border-red-500/20 bg-red-500/10 text-red-300 hover:bg-red-500/20"
                          onClick={() => {
                            setProviders((current) =>
                              current.filter((entry) => entry.id !== provider.id)
                            );
                            setModels((current) =>
                              current.filter(
                                (model) => model.provider_id !== provider.id
                              )
                            );
                          }}
                        >
                          <Trash2 />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {providers.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-white/10 bg-white/4 p-6 text-center text-sm text-white/35">
                    No providers yet. Add one and sync its models.
                  </div>
                ) : null}
              </div>
            </Card>

            <Card>
              <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-white">Models</h2>
                  <p className="mt-1 text-sm text-white/40">
                    Sync automatically from providers or add/edit models manually, including whether a model is free.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                  onClick={() =>
                    setModels((current) => [...current, createModel(providers[0]?.id)])
                  }
                >
                  <Plus />
                  Add Model
                </Button>
              </div>

              <div className="space-y-4">
                {models.map((model) => (
                  <div
                    key={model.id}
                    className="rounded-2xl border border-white/8 bg-white/4 p-4"
                  >
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Field label="Model Label">
                        <Input
                          value={model.label}
                          onChange={(event) =>
                            updateModel(model.id, "label", event.target.value)
                          }
                          placeholder="gpt-4.1-mini"
                        />
                      </Field>
                      <Field label="Provider">
                        <select
                          value={model.provider_id}
                          onChange={(event) =>
                            updateModel(model.id, "provider_id", event.target.value)
                          }
                          className="flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-teal-500/60 focus:ring-2 focus:ring-teal-500/20"
                        >
                          <option value="" className="bg-[#0f172a]">
                            Select provider
                          </option>
                          {providers.map((provider) => (
                            <option
                              key={provider.id}
                              value={provider.id}
                              className="bg-[#0f172a]"
                            >
                              {provider.label || provider.type}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Model ID">
                        <Input
                          value={model.id}
                          onChange={(event) =>
                            updateModel(model.id, "id", event.target.value)
                          }
                          placeholder="model-id"
                        />
                      </Field>
                      <Field label="Context Window">
                        <Input
                          type="number"
                          value={model.context_window ?? ""}
                          onChange={(event) =>
                            updateModel(
                              model.id,
                              "context_window",
                              event.target.value ? Number(event.target.value) : null
                            )
                          }
                          placeholder="128000"
                        />
                      </Field>
                      <Field label="Description">
                        <Textarea
                          rows={3}
                          value={model.description ?? ""}
                          onChange={(event) =>
                            updateModel(model.id, "description", event.target.value)
                          }
                          placeholder="Short note about where you use this model"
                        />
                      </Field>
                      <Field label="Pricing">
                        <select
                          value={
                            model.is_free === null
                              ? "unknown"
                              : model.is_free
                              ? "free"
                              : "paid"
                          }
                          onChange={(event) =>
                            updateModel(
                              model.id,
                              "is_free",
                              event.target.value === "unknown"
                                ? null
                                : event.target.value === "free"
                            )
                          }
                          className="flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-teal-500/60 focus:ring-2 focus:ring-teal-500/20"
                        >
                          <option value="unknown" className="bg-[#0f172a]">
                            Unknown
                          </option>
                          <option value="free" className="bg-[#0f172a]">
                            Free
                          </option>
                          <option value="paid" className="bg-[#0f172a]">
                            Paid
                          </option>
                        </select>
                      </Field>
                    </div>

                    <div className="mt-4 flex flex-col gap-3 border-t border-white/8 pt-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={model.enabled}
                          onCheckedChange={(checked) =>
                            updateModel(model.id, "enabled", checked)
                          }
                        />
                        <span className="text-sm text-white/75">Enabled</span>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            model.is_free === true
                              ? "bg-teal-500/10 text-teal-300"
                              : model.is_free === false
                              ? "bg-amber-500/10 text-amber-300"
                              : "bg-white/8 text-white/45"
                          }`}
                        >
                          {model.is_free === true
                            ? "Free"
                            : model.is_free === false
                            ? "Paid"
                            : "Unknown"}
                        </span>
                        {model.synced_at ? (
                          <span className="text-xs text-white/35">
                            Synced {new Date(model.synced_at).toLocaleString()}
                          </span>
                        ) : null}
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        className="border-red-500/20 bg-red-500/10 text-red-300 hover:bg-red-500/20"
                        onClick={() =>
                          setModels((current) =>
                            current.filter((entry) => entry.id !== model.id)
                          )
                        }
                      >
                        <Trash2 />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}

                {models.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-white/10 bg-white/4 p-6 text-center text-sm text-white/35">
                    No models yet. Sync a provider or add one manually.
                  </div>
                ) : null}
              </div>
            </Card>

            <Card className="bg-linear-to-br from-teal-700/10 to-lime-300/5">
              <div className="flex gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-300">
                  <Sparkles className="size-6" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">
                    Automatic model discovery
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-white/55">
                    `OpenRouter` can usually report pricing directly, so free models can be tagged automatically. Other providers often expose model lists but not pricing, so their free status may stay unknown until you set it manually.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
