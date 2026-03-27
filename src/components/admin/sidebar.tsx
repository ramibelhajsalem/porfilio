"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/lib/supabase/actions";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
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
  const { collapsed, setMobileOpen } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-teal-700 text-base font-bold text-white">
            A
          </div>
          {!collapsed ? (
            <div>
              <p className="text-sm font-semibold leading-tight text-white">
                Admin Panel
              </p>
              <p className="text-[10px] text-white/30">Portfolio CMS</p>
            </div>
          ) : null}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
        {NAV.map(({ label, href, icon: Icon }) => {
          const active = href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(href);
          return (
            <SidebarMenuItem key={href}>
              <Link
                href={href}
                onClick={() => setMobileOpen(false)}
                className="block"
              >
                <SidebarMenuButton isActive={active} className="group">
                  <Icon
                    className={`size-4 shrink-0 ${
                      active
                        ? "text-teal-300"
                        : "text-white/30 group-hover:text-white/60"
                    }`}
                  />
                  {!collapsed ? (
                    <>
                      <span className="truncate">{label}</span>
                      {active ? (
                        <ChevronRight className="ml-auto size-3 text-teal-300/60" />
                      ) : null}
                    </>
                  ) : null}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          );
        })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-white/40 transition hover:bg-white/5 hover:text-white/70 group"
        >
          <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white/60" />
          {!collapsed ? "View Portfolio" : null}
        </Link>
        <form action={signOut}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-white/40 transition hover:bg-red-500/10 hover:text-red-400 group"
          >
            <LogOut className="w-4 h-4 text-white/30 group-hover:text-red-400" />
            {!collapsed ? "Sign Out" : null}
          </button>
        </form>
      </SidebarFooter>
    </Sidebar>
  );
}
