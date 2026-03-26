import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ProjectForm from "../project-form";
import { PageHeader } from "@/components/admin/form-field";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (!project) notFound();

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-4 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
        <PageHeader
          title={`Edit: ${project.title}`}
          description="Update project details, images, and visibility."
        />
      </div>
      <ProjectForm project={project} mode="edit" />
    </div>
  );
}
