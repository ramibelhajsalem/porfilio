"use client";

import * as React from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SidebarContextValue = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("Sidebar components must be used inside <SidebarProvider />");
  }

  return context;
}

function SidebarProvider({
  children,
  defaultCollapsed = false,
}: {
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <SidebarContext.Provider
      value={{ collapsed, setCollapsed, mobileOpen, setMobileOpen }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { collapsed, setCollapsed, setMobileOpen } = useSidebar();

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn("border-white/10 bg-white/5 text-white hover:bg-white/10", className)}
      onClick={(event) => {
        onClick?.(event);
        if (window.innerWidth < 768) {
          setMobileOpen(true);
          return;
        }

        setCollapsed((value) => !value);
      }}
      {...props}
    >
      {collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

function Sidebar({
  className,
  children,
}: React.ComponentProps<"aside">) {
  const { collapsed, mobileOpen, setMobileOpen } = useSidebar();

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm transition md:hidden",
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setMobileOpen(false)}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-screen w-[17rem] flex-col border-r border-white/8 bg-[#0b1222] transition-transform duration-200 md:sticky md:z-30 md:translate-x-0",
          collapsed && "md:w-[5rem]",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        {children}
      </aside>
    </>
  );
}

function SidebarHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("border-b border-white/8 px-4 py-4", className)}
      {...props}
    />
  );
}

function SidebarContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex-1 overflow-y-auto px-3 py-3", className)}
      {...props}
    />
  );
}

function SidebarFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("border-t border-white/8 px-3 py-3", className)}
      {...props}
    />
  );
}

function SidebarInset({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { collapsed } = useSidebar();

  return (
    <div
      className={cn(
        "flex min-h-screen flex-1 flex-col transition-[padding] md:pl-0",
        collapsed && "md:[&_[data-admin-header]]:pl-6",
        className
      )}
      {...props}
    />
  );
}

function SidebarMenu({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return <ul className={cn("space-y-1", className)} {...props} />;
}

function SidebarMenuItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return <li className={className} {...props} />;
}

function SidebarMenuButton({
  isActive = false,
  className,
  ...props
}: React.ComponentProps<"div"> & { isActive?: boolean }) {
  return (
    <div
      data-slot="sidebar-menu-button"
      data-active={isActive}
      className={cn(
        "flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium transition",
        isActive
          ? "bg-teal-600/15 text-teal-300"
          : "text-white/50 hover:bg-white/5 hover:text-white/85",
        className
      )}
      {...props}
    />
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
};
