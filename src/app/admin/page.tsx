import { createClient } from "@/lib/supabase/server";
import {
  FolderKanban,
  Quote,
  MessageSquare,
  Image,
  Eye,
  EyeOff,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: totalProjects },
    { count: hiddenProjects },
    { count: testimonials },
    { count: unreadMessages },
    { count: totalImages },
    { data: recentMessages },
  ] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase
      .from("projects")
      .select("*", { count: "exact", head: true })
      .eq("is_hidden", true),
    supabase
      .from("testimonials")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true),
    supabase
      .from("contact_submissions")
      .select("*", { count: "exact", head: true })
      .eq("is_read", false)
      .eq("is_archived", false),
    supabase.from("images").select("*", { count: "exact", head: true }),
    supabase
      .from("contact_submissions")
      .select("id, name, email, message, created_at, is_read")
      .eq("is_archived", false)
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const stats = [
    {
      label: "Total Projects",
      value: totalProjects ?? 0,
      icon: FolderKanban,
      href: "/admin/projects",
      color: "teal",
    },
    {
      label: "Hidden Projects",
      value: hiddenProjects ?? 0,
      icon: EyeOff,
      href: "/admin/projects",
      color: "amber",
    },
    {
      label: "Testimonials",
      value: testimonials ?? 0,
      icon: Quote,
      href: "/admin/testimonials",
      color: "violet",
    },
    {
      label: "Unread Messages",
      value: unreadMessages ?? 0,
      icon: MessageSquare,
      href: "/admin/messages",
      color: "rose",
    },
    {
      label: "Images",
      value: totalImages ?? 0,
      icon: Image,
      href: "/admin/images",
      color: "sky",
    },
  ];

  const colorMap: Record<string, string> = {
    teal:   "bg-teal-500/10 text-teal-400 border-teal-500/20",
    amber:  "bg-amber-500/10 text-amber-400 border-amber-500/20",
    violet: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    rose:   "bg-rose-500/10 text-rose-400 border-rose-500/20",
    sky:    "bg-sky-500/10 text-sky-400 border-sky-500/20",
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-white/40 text-sm mt-1">
          Overview of your portfolio content
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {stats.map(({ label, value, icon: Icon, href, color }) => (
          <Link
            key={label}
            href={href}
            className="group bg-white/5 border border-white/8 rounded-2xl p-5 hover:bg-white/8 transition-all duration-200"
          >
            <div
              className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border mb-4 ${colorMap[color]}`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <p className="text-3xl font-bold text-white mb-1">{value}</p>
            <p className="text-xs text-white/40">{label}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent messages */}
        <div className="bg-white/5 border border-white/8 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold text-sm">Recent Messages</h2>
            <Link
              href="/admin/messages"
              className="flex items-center gap-1 text-teal-400 text-xs hover:text-teal-300 transition"
            >
              View all <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {!recentMessages?.length && (
              <p className="text-white/30 text-sm text-center py-6">
                No messages yet
              </p>
            )}
            {recentMessages?.map((msg) => (
              <div
                key={msg.id}
                className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/8 transition group"
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                    msg.is_read
                      ? "bg-white/10 text-white/40"
                      : "bg-teal-700 text-white"
                  }`}
                >
                  {msg.name[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-white text-xs font-medium truncate">
                      {msg.name}
                    </p>
                    {!msg.is_read && (
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                    )}
                  </div>
                  <p className="text-white/40 text-[11px] truncate mt-0.5">
                    {msg.message}
                  </p>
                </div>
                <Mail className="w-3.5 h-3.5 text-white/20 shrink-0 mt-0.5" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="bg-white/5 border border-white/8 rounded-2xl p-6">
          <h2 className="text-white font-semibold text-sm mb-5">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { label: "Add New Project", href: "/admin/projects/new", icon: FolderKanban },
              { label: "Edit Personal Info", href: "/admin/personal", icon: Eye },
              { label: "Manage Page Sections", href: "/admin/sections", icon: FolderKanban },
              { label: "Upload Images", href: "/admin/images", icon: Image },
              { label: "View Portfolio", href: "/", icon: ArrowUpRight },
            ].map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                target={href === "/" ? "_blank" : undefined}
                className="flex items-center gap-3 p-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition group text-sm"
              >
                <Icon className="w-4 h-4 text-white/30 group-hover:text-teal-400 transition" />
                {label}
                <ArrowUpRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition text-white/30" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
