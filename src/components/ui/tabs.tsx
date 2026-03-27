"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type TabsContextValue = {
  value: string;
  setValue: (value: string) => void;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used inside <Tabs />");
  }

  return context;
}

type TabsProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
};

function Tabs({
  value,
  defaultValue,
  onValueChange,
  className,
  children,
}: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const currentValue = value ?? internalValue;

  const setValue = React.useCallback(
    (nextValue: string) => {
      if (value === undefined) {
        setInternalValue(nextValue);
      }
      onValueChange?.(nextValue);
    },
    [onValueChange, value]
  );

  return (
    <TabsContext.Provider value={{ value: currentValue, setValue }}>
      <div data-slot="tabs" className={className}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="tabs-list"
      className={cn(
        "inline-flex h-auto flex-wrap items-center gap-2 rounded-2xl border border-white/8 bg-white/5 p-1",
        className
      )}
      {...props}
    />
  );
}

type TabsTriggerProps = React.ComponentProps<"button"> & {
  value: string;
};

function TabsTrigger({
  className,
  value,
  children,
  ...props
}: TabsTriggerProps) {
  const context = useTabsContext();
  const active = context.value === value;

  return (
    <button
      type="button"
      data-slot="tabs-trigger"
      data-state={active ? "active" : "inactive"}
      className={cn(
        "inline-flex min-h-10 items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-teal-600 text-white shadow-sm"
          : "text-white/50 hover:bg-white/6 hover:text-white/80",
        className
      )}
      onClick={() => context.setValue(value)}
      {...props}
    >
      {children}
    </button>
  );
}

type TabsContentProps = React.ComponentProps<"div"> & {
  value: string;
};

function TabsContent({
  className,
  value,
  children,
  ...props
}: TabsContentProps) {
  const context = useTabsContext();

  if (context.value !== value) {
    return null;
  }

  return (
    <div
      data-slot="tabs-content"
      className={cn("mt-6 outline-none", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
