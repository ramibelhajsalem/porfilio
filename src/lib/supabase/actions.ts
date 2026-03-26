"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient, createAdminClient } from "./server";
import type { Project, PersonalInfo, Testimonial } from "./types";

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
    .upsert({ ...data }, { onConflict: "id" });
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}

// ─── Projects ──────────────────────────────────────────────────

export async function createProject(data: Omit<Project, "id" | "created_at" | "updated_at">) {
  const supabase = await createAdminClient();
  const { data: inserted, error } = await supabase
    .from("projects")
    .insert(data)
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
    .update(data)
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
    supabase.from("projects").update({ order_index: index }).eq("id", id)
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
    .insert(data)
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
    .update(data)
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
    { page, section, content },
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
    const { error } = await supabase.from("social_links").update(data).eq("id", id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("social_links").insert(data);
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
  const { error } = await supabase.from("nav_links").update(data).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}

// ─── Site Config ───────────────────────────────────────────────

export async function updateSiteConfig(key: string, value: string) {
  const supabase = await createAdminClient();
  const { error } = await supabase
    .from("site_config")
    .update({ value })
    .eq("key", key);
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
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
  const { error } = await supabase.from("contact_submissions").insert(data);
  if (error) return { error: error.message };
  return { success: true };
}

export async function markMessageRead(id: string) {
  const supabase = await createAdminClient();
  const { error } = await supabase
    .from("contact_submissions")
    .update({ is_read: true })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/messages");
  return { success: true };
}

export async function archiveMessage(id: string) {
  const supabase = await createAdminClient();
  const { error } = await supabase
    .from("contact_submissions")
    .update({ is_archived: true })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/messages");
  return { success: true };
}

// ─── Image Upload ──────────────────────────────────────────────

export async function uploadImage(formData: FormData) {
  const supabase = await createAdminClient();
  const file = formData.get("file") as File;
  const section = (formData.get("section") as string) ?? "general";
  const alt = (formData.get("alt") as string) ?? file.name;

  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const path = `${section}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("portfolio-images")
    .upload(path, file, { contentType: file.type });

  if (uploadError) return { error: uploadError.message };

  const { data: urlData } = supabase.storage
    .from("portfolio-images")
    .getPublicUrl(path);

  const { data: imgRecord, error: dbError } = await supabase
    .from("images")
    .insert({
      name: file.name,
      url: urlData.publicUrl,
      storage_path: path,
      alt,
      section,
      mime_type: file.type,
      size_bytes: file.size,
    })
    .select()
    .single();

  if (dbError) return { error: dbError.message };
  revalidatePath("/admin/images");
  return { success: true, image: imgRecord };
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
