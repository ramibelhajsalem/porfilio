"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const inputClasses =
  "flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white shadow-xs outline-none transition placeholder:text-white/25 focus-visible:border-teal-500/60 focus-visible:ring-2 focus-visible:ring-teal-500/20 disabled:cursor-not-allowed disabled:opacity-50";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(inputClasses, className)}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input, inputClasses };
