"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  toggleProjectVisibility,
  deleteProject,
  reorderProjects,
} from "@/lib/supabase/actions";
import type { Project } from "@/lib/supabase/types";
import { Eye, EyeOff, Pencil, Trash2, GripVertical } from "lucide-react";

export default function ProjectsList({ projects: initial }: { projects: Project[] }) {
  const [projects, setProjects] = useState(initial);
  const [isPending, startTransition] = useTransition();
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);

  function toggleVisibility(id: string, currentlyHidden: boolean) {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_hidden: !currentlyHidden } : p))
    );
    startTransition(async () => {
      await toggleProjectVisibility(id, !currentlyHidden);
    });
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    setProjects((prev) => prev.filter((p) => p.id !== id));
    startTransition(async () => {
      await deleteProject(id);
    });
  }

  function handleDragStart(id: string) {
    setDragging(id);
  }

  function handleDragOver(e: React.DragEvent, id: string) {
    e.preventDefault();
    setDragOver(id);
  }

  function handleDrop(targetId: string) {
    if (!dragging || dragging === targetId) {
      setDragging(null);
      setDragOver(null);
      return;
    }
    const from = projects.findIndex((p) => p.id === dragging);
    const to = projects.findIndex((p) => p.id === targetId);
    const reordered = [...projects];
    const [moved] = reordered.splice(from, 1);
    reordered.splice(to, 0, moved);
    setProjects(reordered);
    startTransition(async () => {
      await reorderProjects(reordered.map((p) => p.id));
    });
    setDragging(null);
    setDragOver(null);
  }

  return (
    <div className="space-y-3">
      {projects.map((project) => (
        <div
          key={project.id}
          draggable
          onDragStart={() => handleDragStart(project.id)}
          onDragOver={(e) => handleDragOver(e, project.id)}
          onDrop={() => handleDrop(project.id)}
          onDragEnd={() => { setDragging(null); setDragOver(null); }}
          className={`group flex items-center gap-4 bg-white/5 border rounded-2xl p-4 transition-all duration-150 ${
            dragOver === project.id
              ? "border-teal-500/50 bg-teal-500/5"
              : "border-white/8 hover:bg-white/8"
          } ${project.is_hidden ? "opacity-50" : ""}`}
        >
          {/* Drag handle */}
          <GripVertical className="w-4 h-4 text-white/20 cursor-grab active:cursor-grabbing shrink-0" />

          {/* Image */}
          <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-white/5">
            {project.image_url && (
              <Image
                src={project.image_url}
                alt={project.title}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-white font-semibold text-sm truncate">
                {project.title}
              </h3>
              <span className="px-2 py-0.5 text-[10px] bg-white/8 text-white/50 rounded-full shrink-0">
                {project.category}
              </span>
              <span className="px-2 py-0.5 text-[10px] bg-white/5 text-white/40 rounded-full shrink-0">
                {project.year}
              </span>
            </div>
            <p className="text-white/40 text-xs truncate">{project.description}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[10px] bg-teal-500/10 text-teal-400/80 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => toggleVisibility(project.id, project.is_hidden)}
              disabled={isPending}
              title={project.is_hidden ? "Show project" : "Hide project"}
              className={`p-2 rounded-xl transition-all ${
                project.is_hidden
                  ? "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                  : "bg-white/5 text-white/40 hover:text-white hover:bg-white/10"
              }`}
            >
              {project.is_hidden ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
            <Link
              href={`/admin/projects/${project.id}`}
              className="p-2 rounded-xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all"
            >
              <Pencil className="w-4 h-4" />
            </Link>
            <button
              onClick={() => handleDelete(project.id)}
              disabled={isPending}
              className="p-2 rounded-xl bg-white/5 text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}

      {projects.length === 0 && (
        <div className="text-center py-16 text-white/30">
          <p className="text-lg mb-2">No projects yet</p>
          <p className="text-sm">Add your first project to get started.</p>
        </div>
      )}
    </div>
  );
}
