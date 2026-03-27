import type { SiteConfig } from "@/lib/supabase/types";

export type SiteConfigGroup =
  | "seo"
  | "theme"
  | "content"
  | "integrations"
  | "ai";

export type AIProviderType =
  | "openrouter"
  | "openai"
  | "anthropic"
  | "google"
  | "openai-compatible"
  | "custom";

export interface AIProviderConfig {
  id: string;
  label: string;
  type: AIProviderType;
  base_url: string | null;
  api_key_env: string | null;
  api_key: string | null;
  enabled: boolean;
  auto_sync: boolean;
}

export interface AIModelConfig {
  id: string;
  provider_id: string;
  label: string;
  description: string | null;
  context_window: number | null;
  is_free: boolean | null;
  enabled: boolean;
  synced_at: string | null;
  input_modalities?: string[];
  output_modalities?: string[];
}

export interface SiteConfigDefinition {
  key: string;
  label: string;
  type: SiteConfig["type"];
  group_name: SiteConfigGroup;
  defaultValue: string;
  placeholder?: string;
  hint?: string;
}

export const SITE_CONFIG_FIELDS: SiteConfigDefinition[] = [
  {
    key: "site_title",
    label: "Site Title",
    type: "text",
    group_name: "seo",
    defaultValue: "Albert | Frontend Developer",
    placeholder: "Albert | Frontend Developer",
    hint: "Used for the browser title and default social title.",
  },
  {
    key: "site_description",
    label: "Site Description",
    type: "text",
    group_name: "seo",
    defaultValue: "Frontend Developer Portfolio",
    placeholder: "Frontend Developer Portfolio",
    hint: "Used for search engines and link previews.",
  },
  {
    key: "site_author",
    label: "Author Name",
    type: "text",
    group_name: "seo",
    defaultValue: "Albert",
    placeholder: "Albert",
  },
  {
    key: "site_keywords",
    label: "Keywords",
    type: "json",
    group_name: "seo",
    defaultValue: JSON.stringify(
      ["Frontend Developer", "React", "Next.js", "Portfolio"],
      null,
      2
    ),
    hint: "JSON array of SEO keywords.",
  },
  {
    key: "site_url",
    label: "Canonical Site URL",
    type: "text",
    group_name: "seo",
    defaultValue: "",
    placeholder: "https://yourdomain.com",
  },
  {
    key: "og_image_url",
    label: "Open Graph Image URL",
    type: "text",
    group_name: "seo",
    defaultValue: "",
    placeholder: "https://yourdomain.com/og.png",
  },
  {
    key: "site_locale",
    label: "Locale",
    type: "text",
    group_name: "seo",
    defaultValue: "en_US",
    placeholder: "en_US",
  },
  {
    key: "site_robots",
    label: "Robots",
    type: "text",
    group_name: "seo",
    defaultValue: "index, follow",
    placeholder: "index, follow",
  },
  {
    key: "twitter_handle",
    label: "Twitter / X Handle",
    type: "text",
    group_name: "seo",
    defaultValue: "",
    placeholder: "@yourhandle",
  },
  {
    key: "theme_primary_color",
    label: "Primary Color",
    type: "color",
    group_name: "theme",
    defaultValue: "#1B4D3E",
  },
  {
    key: "theme_accent_color",
    label: "Accent Color",
    type: "color",
    group_name: "theme",
    defaultValue: "#b8f02a",
  },
  {
    key: "theme_background_color",
    label: "Background Color",
    type: "color",
    group_name: "theme",
    defaultValue: "#0f172a",
  },
  {
    key: "theme_surface_color",
    label: "Surface Color",
    type: "color",
    group_name: "theme",
    defaultValue: "#172033",
  },
  {
    key: "theme_foreground_color",
    label: "Foreground Color",
    type: "color",
    group_name: "theme",
    defaultValue: "#f8fafc",
  },
  {
    key: "theme_muted_color",
    label: "Muted Text Color",
    type: "color",
    group_name: "theme",
    defaultValue: "#94a3b8",
  },
  {
    key: "support_email",
    label: "Support Email",
    type: "text",
    group_name: "integrations",
    defaultValue: "info@albert.com",
    placeholder: "hello@example.com",
  },
  {
    key: "google_analytics_id",
    label: "Google Analytics ID",
    type: "text",
    group_name: "integrations",
    defaultValue: "",
    placeholder: "G-XXXXXXXXXX",
  },
  {
    key: "plausible_domain",
    label: "Plausible Domain",
    type: "text",
    group_name: "integrations",
    defaultValue: "",
    placeholder: "yourdomain.com",
  },
  {
    key: "ai_providers",
    label: "AI Providers",
    type: "json",
    group_name: "ai",
    defaultValue: "[]",
  },
  {
    key: "ai_models",
    label: "AI Models",
    type: "json",
    group_name: "ai",
    defaultValue: "[]",
  },
];

const SITE_CONFIG_FIELD_MAP = new Map(
  SITE_CONFIG_FIELDS.map((field) => [field.key, field] as const)
);

export function getSiteConfigDefinition(key: string) {
  return SITE_CONFIG_FIELD_MAP.get(key);
}

export function getSiteConfigDefaults() {
  return SITE_CONFIG_FIELDS.reduce<Record<string, string>>((acc, field) => {
    acc[field.key] = field.defaultValue;
    return acc;
  }, {});
}

export function getSiteConfigValue(
  configMap: Record<string, string | null>,
  key: string
) {
  const fallback = getSiteConfigDefinition(key)?.defaultValue ?? "";
  return configMap[key] ?? fallback;
}

export function parseJsonSiteConfig<T>(value: string | null | undefined, fallback: T): T {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function stringifySiteConfigJson(value: unknown) {
  return JSON.stringify(value, null, 2);
}

export function createDefaultSiteConfigRecords() {
  return SITE_CONFIG_FIELDS.map((field) => ({
    id: field.key,
    key: field.key,
    value: field.defaultValue,
    type: field.type,
    label: field.label,
    group_name: field.group_name,
    updated_at: new Date(0).toISOString(),
  }));
}
