import ProjectForm from "../project-form";
import { PageHeader } from "@/components/admin/form-field";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewProjectPage() {
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
        <PageHeader title="New Project" description="Add a new project to your portfolio." />
      </div>
      <ProjectForm mode="create" />
    </div>
  );
}
