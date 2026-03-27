"use client";

import { X } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

function Toaster() {
  const { dismiss, toasts } = useToast();

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-[80] flex w-full max-w-sm flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "pointer-events-auto rounded-2xl border p-4 shadow-2xl backdrop-blur-sm",
            toast.variant === "success" &&
              "border-teal-500/20 bg-teal-950/85 text-white",
            toast.variant === "destructive" &&
              "border-red-500/30 bg-red-950/90 text-white",
            (!toast.variant || toast.variant === "default") &&
              "border-white/10 bg-slate-950/90 text-white"
          )}
        >
          <div className="flex items-start gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{toast.title}</p>
              {toast.description ? (
                <p className="mt-1 text-sm text-white/65">{toast.description}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              className="rounded-lg p-1 text-white/40 transition hover:bg-white/5 hover:text-white"
            >
              <X className="size-4" />
              <span className="sr-only">Dismiss</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export { Toaster };
