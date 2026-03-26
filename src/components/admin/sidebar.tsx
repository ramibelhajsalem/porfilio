"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/lib/supabase/actions";
import {
  LayoutDashboard,
  User,
  FolderKanban,
  Quote,
  Layers,
  MessageSquare,
  Image,
  Settings,
  LogOut,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

const NAV = [
  { label: "Dashboard",    href: "/admin",             icon: LayoutDashboard },
  { label: "Personal Info",href: "/admin/personal",    icon: User },
  { label: "Projects",     href: "/admin/projects",    icon: FolderKanban },
  { label: "Testimonials", href: "/admin/testimonials",icon: Quote },
  { label: "Page Sections",href: "/admin/sections",    icon: Layers },
  { label: "Messages",     href: "/admin/messages",    icon: MessageSquare },
  { label: "Images",       href: "/admin/images",      icon: Image },
  { label: "Site Config",  href: "/admin/config",      icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-[#0f172a] border-r border-white/5 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-700 flex items-center justify-center text-white font-bold text-base">
            A
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-tight">Admin Panel</p>
            <p className="text-white/30 text-[10px]">Portfolio CMS</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {NAV.map(({ label, href, icon: Icon }) => {
          const active = href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                active
                  ? "bg-teal-700/20 text-teal-400"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${active ? "text-teal-400" : "text-white/30 group-hover:text-white/60"}`} />
              {label}
              {active && <ChevronRight className="w-3 h-3 ml-auto text-teal-400/50" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-white/5 space-y-0.5">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white/70 hover:bg-white/5 transition-all group"
        >
          <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white/60" />
          View Portfolio
        </Link>
        <form action={signOut}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all group"
          >
            <LogOut className="w-4 h-4 text-white/30 group-hover:text-red-400" />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
