import type { AIModelConfig, AIProviderConfig } from "@/lib/site-config";

function parseNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
}

function inferFreeFromPricing(pricing: unknown) {
  if (!pricing || typeof pricing !== "object") {
    return null;
  }

  const values = Object.values(pricing as Record<string, unknown>)
    .map(parseNumber)
    .filter((value): value is number => value !== null);

  if (!values.length) {
    return null;
  }

  return values.every((value) => value === 0);
}

function mapOpenRouterModel(
  provider: AIProviderConfig,
  item: Record<string, unknown>
): AIModelConfig {
  const architecture =
    typeof item.architecture === "object" && item.architecture
      ? (item.architecture as Record<string, unknown>)
      : null;

  return {
    id: String(item.id ?? crypto.randomUUID()),
    provider_id: provider.id,
    label: String(item.name ?? item.id ?? "Untitled model"),
    description:
      typeof item.description === "string" ? item.description : null,
    context_window: parseNumber(item.context_length),
    is_free: inferFreeFromPricing(item.pricing),
    enabled: true,
    synced_at: new Date().toISOString(),
    input_modalities: Array.isArray(architecture?.input_modalities)
      ? architecture.input_modalities.map(String)
      : undefined,
    output_modalities: Array.isArray(architecture?.output_modalities)
      ? architecture.output_modalities.map(String)
      : undefined,
  };
}

function mapStandardModel(
  provider: AIProviderConfig,
  item: Record<string, unknown>,
  fallbackLabel?: string
): AIModelConfig {
  return {
    id: String(item.id ?? item.name ?? crypto.randomUUID()),
    provider_id: provider.id,
    label: String(
      item.display_name ?? item.displayName ?? item.id ?? item.name ?? fallbackLabel ?? "Untitled model"
    ),
    description:
      typeof item.description === "string" ? item.description : null,
    context_window:
      parseNumber(item.context_window) ??
      parseNumber(item.inputTokenLimit) ??
      parseNumber(item.context_length),
    is_free: null,
    enabled: true,
    synced_at: new Date().toISOString(),
  };
}

async function fetchJson(url: string, init?: RequestInit) {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  return response.json();
}

function resolveApiKey(provider: AIProviderConfig) {
  if (provider.api_key) {
    return provider.api_key;
  }

  if (provider.api_key_env && process.env[provider.api_key_env]) {
    return process.env[provider.api_key_env]!;
  }

  return null;
}

export async function syncProviderModels(provider: AIProviderConfig) {
  const apiKey = resolveApiKey(provider);
  const baseUrl = provider.base_url?.trim();

  switch (provider.type) {
    case "openrouter": {
      const data = await fetchJson(
        `${baseUrl || "https://openrouter.ai/api/v1"}/models`
      );

      return Array.isArray(data.data)
        ? data.data.map((item: Record<string, unknown>) =>
            mapOpenRouterModel(provider, item)
          )
        : [];
    }
    case "openai": {
      if (!apiKey) {
        throw new Error("OpenAI sync needs an API key or env key name.");
      }

      const data = await fetchJson(
        `${baseUrl || "https://api.openai.com/v1"}/models`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      return Array.isArray(data.data)
        ? data.data.map((item: Record<string, unknown>) =>
            mapStandardModel(provider, item)
          )
        : [];
    }
    case "anthropic": {
      if (!apiKey) {
        throw new Error("Anthropic sync needs an API key or env key name.");
      }

      const data = await fetchJson(
        `${baseUrl || "https://api.anthropic.com/v1"}/models`,
        {
          headers: {
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
          },
        }
      );

      return Array.isArray(data.data)
        ? data.data.map((item: Record<string, unknown>) =>
            mapStandardModel(provider, item)
          )
        : [];
    }
    case "google": {
      if (!apiKey) {
        throw new Error("Google sync needs an API key or env key name.");
      }

      const data = await fetchJson(
        `${
          baseUrl || "https://generativelanguage.googleapis.com/v1beta"
        }/models?key=${encodeURIComponent(apiKey)}`
      );

      return Array.isArray(data.models)
        ? data.models.map((item: Record<string, unknown>) =>
            mapStandardModel(provider, item, String(item.name ?? "Google model"))
          )
        : [];
    }
    case "openai-compatible":
    case "custom": {
      if (!baseUrl) {
        throw new Error("Custom provider sync needs a base URL.");
      }

      const data = await fetchJson(`${baseUrl.replace(/\/$/, "")}/models`, {
        headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : undefined,
      });

      return Array.isArray(data.data)
        ? data.data.map((item: Record<string, unknown>) =>
            mapStandardModel(provider, item)
          )
        : [];
    }
    default:
      return [];
  }
}
