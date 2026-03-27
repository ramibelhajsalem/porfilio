"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient, createAdminClient } from "./server";
import type { PortfolioImage, Project, PersonalInfo, Testimonial } from "./types";
import type { AIProviderConfig } from "@/lib/site-config";
import { syncProviderModels } from "@/lib/ai-providers";

// ─── Auth ──────────────────────────────────────────────────────

export async function signIn(email: string, password: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };
  revalidatePath("/admin", "layout");
  redirect("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// ─── Personal Info ─────────────────────────────────────────────

export async function upsertPersonalInfo(data: Partial<PersonalInfo>) {
  const supabase = await createAdminClient();
  const { error } = await supabase
    .from("personal_info")
    .upsert({ ...data } as never, { onConflict: "id" });
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}

// ─── Projects ──────────────────────────────────────────────────

export async function createProject(data: Omit<Project, "id" | "created_at" | "updated_at">) {
  const supabase = await createAdminClient();
  const { data: inserted, error } = await supabase
    .from("projects")
    .insert(data as never)
    .select()
    .single();
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  revalidatePath("/works");
  return { success: true, project: inserted };
}

export async function updateProject(id: string, data: Partial<Project>) {
  const supabase = await createAdminClient();
  const { error } = await supabase
    .from("projects")
    .update(data as never)
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  revalidatePath("/works");
  return { success: true };
}

export async function deleteProject(id: string) {
  const supabase = await createAdminClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  revalidatePath("/works");
  return { success: true };
}

export async function toggleProjectVisibility(id: string, is_hidden: boolean) {
  return updateProject(id, { is_hidden });
}

export async function reorderProjects(ids: string[]) {
  const supabase = await createAdminClient();
  const updates = ids.map((id, index) =>
    supabase.from("projects").update({ order_index: index } as never).eq("id", id)
  );
  await Promise.all(updates);
  revalidatePath("/", "layout");
  revalidatePath("/works");
  return { success: true };
}

// ─── Testimonials ──────────────────────────────────────────────

export async function createTestimonial(
  data: Omit<Testimonial, "id" | "created_at" | "updated_at">
) {
  const supabase = await createAdminClient();
  const { data: inserted, error } = await supabase
    .from("testimonials")
    .insert(data as never)
    .select()
    .single();
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true, testimonial: inserted };
}

export async function updateTestimonial(
  id: string,
  data: Partial<Testimonial>
) {
  const supabase = await createAdminClient();
  const { error } = await supabase
    .from("testimonials")
    .update(data as never)
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteTestimonial(id: string) {
  const supabase = await createAdminClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}

// ─── Page Sections ─────────────────────────────────────────────

export async function upsertPageSection(
  page: string,
  section: string,
  content: Record<string, unknown>
) {
  const supabase = await createAdminClient();
  const { error } = await supabase.from("page_sections").upsert(
    { page, section, content } as never,
    { onConflict: "page,section" }
  );
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  revalidatePath(`/${page === "home" ? "" : page}`);
  return { success: true };
}

// ─── Social Links ──────────────────────────────────────────────

export async function upsertSocialLink(
  id: string | null,
  data: { platform: string; url: string; label?: string; order_index?: number; is_active?: boolean }
) {
  const supabase = await createAdminClient();
  if (id) {
    const { error } = await supabase.from("social_links").update(data as never).eq("id", id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("social_links").insert(data as never);
    if (error) return { error: error.message };
  }
  revalidatePath("/", "layout");
  return { success: true };
}

// ─── Nav Links ─────────────────────────────────────────────────

export async function updateNavLink(
  id: string,
  data: { label?: string; href?: string; order_index?: number; is_active?: boolean }
) {
  const supabase = await createAdminClient();
  const { error } = await supabase.from("nav_links").update(data as never).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}

// ─── Site Config ───────────────────────────────────────────────

export async function updateSiteConfig(key: string, value: string) {
  return upsertSiteConfigs([{ key, value }]);
}

export async function upsertSiteConfigs(
  entries: Array<{
    key: string;
    value: string;
    type?: string;
    label?: string;
    group_name?: string;
  }>
) {
  const supabase = await createAdminClient();
  const { error } = await supabase.from("site_config").upsert(entries as never, {
    onConflict: "key",
  });
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}

export async function syncSiteModels(provider: AIProviderConfig) {
  try {
    const models = await syncProviderModels(provider);
    return { success: true, models };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Unable to sync provider models.",
    };
  }
}

// ─── Contact Submissions ───────────────────────────────────────

export async function submitContact(data: {
  name: string;
  email: string;
  company?: string;
  project_type?: string;
  budget?: string;
  message: string;
}) {
  const supabase = await createClient();
  const { error } = await supabase.from("contact_submissions").insert(data as never);
  if (error) return { error: error.message };
  return { success: true };
}

export async function markMessageRead(id: string) {
  const supabase = await createAdminClient();
  const { error } = await supabase
    .from("contact_submissions")
    .update({ is_read: true } as never)
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/messages");
  return { success: true };
}

export async function archiveMessage(id: string) {
  const supabase = await createAdminClient();
  const { error } = await supabase
    .from("contact_submissions")
    .update({ is_archived: true } as never)
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/messages");
  return { success: true };
}

// ─── Image Upload ──────────────────────────────────────────────

export async function uploadAssets(formData: FormData) {
  const supabase = await createAdminClient();
  const section = (formData.get("section") as string) ?? "general";
  const bucket = (formData.get("bucket") as string) ?? "portfolio-images";
  const customAlt = (formData.get("alt") as string) ?? "";
  const files = formData
    .getAll("files")
    .map((file) => file as File)
    .filter((file) => file && file.size > 0);
  const fallbackFile = formData.get("file");

  if (!files.length && fallbackFile instanceof File && fallbackFile.size > 0) {
    files.push(fallbackFile);
  }

  if (!files.length) {
    return { error: "No files selected." };
  }

  const assets: PortfolioImage[] = [];

  for (const file of files) {
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${ext}`;
    const path = `${section}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(path, file, { contentType: file.type, upsert: false });

    if (uploadError) {
      return { error: uploadError.message };
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path);

    const { data: assetRecord, error: dbError } = await supabase
      .from("images")
      .insert({
        name: file.name,
        url: urlData.publicUrl,
        storage_path: path,
        alt: customAlt || file.name,
        section,
        mime_type: file.type,
        size_bytes: file.size,
      } as never)
      .select()
      .single();

    if (dbError) {
      return { error: dbError.message };
    }

    assets.push(assetRecord);
  }

  revalidatePath("/admin/images");
  return { success: true, assets };
}

export async function uploadImage(formData: FormData) {
  const result = await uploadAssets(formData);
  if (result.error) {
    return result;
  }

  return { success: true, image: result.assets?.[0], assets: result.assets };
}

export async function deleteImage(id: string, storagePath: string | null) {
  const supabase = await createAdminClient();

  if (storagePath) {
    await supabase.storage.from("portfolio-images").remove([storagePath]);
  }

  const { error } = await supabase.from("images").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/images");
  return { success: true };
}
