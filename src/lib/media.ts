export const MEDIA_SECTION_OPTIONS = [
  { value: "general", label: "General" },
  { value: "hero", label: "Hero" },
  { value: "about", label: "About" },
  { value: "workstation", label: "Workstation" },
  { value: "project", label: "Project" },
  { value: "testimonial", label: "Testimonial" },
  { value: "seo", label: "SEO" },
] as const;

export function isImageUrl(url: string) {
  return /\.(png|jpe?g|gif|webp|svg|avif)(\?.*)?$/i.test(url) ||
    url.startsWith("data:image/") ||
    url.includes("images.unsplash.com") ||
    url.includes("supabase");
}
