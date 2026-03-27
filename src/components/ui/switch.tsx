"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type SwitchProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
} & Omit<React.ComponentProps<"button">, "onChange">;

function Switch({
  checked,
  onCheckedChange,
  className,
  ...props
}: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      data-slot="switch"
      data-state={checked ? "checked" : "unchecked"}
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-white/10 bg-white/10 p-0.5 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-teal-500/30 data-[state=checked]:bg-teal-600",
        className
      )}
      onClick={() => onCheckedChange(!checked)}
      {...props}
    >
      <span
        data-slot="switch-thumb"
        className={cn(
          "block size-5 rounded-full bg-white shadow-sm transition-transform",
          checked && "translate-x-5"
        )}
      />
      <span className="sr-only">{checked ? "On" : "Off"}</span>
    </button>
  );
}

export { Switch };
