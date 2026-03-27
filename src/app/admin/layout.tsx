import AdminSidebar from "@/components/admin/sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const metadata = {
  title: "Admin Panel | Portfolio CMS",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-[#0f172a] text-white md:flex">
        <AdminSidebar />
        <SidebarInset className="w-full">
          <header
            data-admin-header
            className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-white/8 bg-[#0f172a]/90 px-4 backdrop-blur md:px-6"
          >
            <SidebarTrigger />
            <div>
              <p className="text-sm font-semibold text-white">Portfolio Admin</p>
              <p className="text-xs text-white/35">
                Manage content, uploads, settings, and models
              </p>
            </div>
          </header>
          <main className="flex-1 overflow-auto">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
