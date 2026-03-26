import { createClient } from "@/lib/supabase/server";
import ProjectsList from "./projects-list";
import { PageHeader } from "@/components/admin/form-field";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("order_index");

  return (
    <div className="p-8">
      <PageHeader
        title="Projects"
        description="Manage your portfolio projects. Drag to reorder, toggle visibility, or edit details."
        action={
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-2 px-4 py-2.5 bg-teal-700 hover:bg-teal-600 text-white text-sm font-medium rounded-xl transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            New Project
          </Link>
        }
      />
      <ProjectsList projects={projects ?? []} />
    </div>
  );
}
