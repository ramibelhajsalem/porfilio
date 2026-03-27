"use client";

import { Button } from "@/components/ui/button";
import { Input as UIInput } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea as UITextarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface FieldProps {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function Field({ label, hint, required, children }: FieldProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-white/60 uppercase tracking-wider mb-2">
        {label}
        {required && <span className="text-teal-400 ml-1">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-[11px] text-white/30">{hint}</p>}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Input({ className = "", ...props }: InputProps) {
  return <UIInput {...props} className={className} />;
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export function Textarea({ className = "", ...props }: TextareaProps) {
  return <UITextarea {...props} className={cn("resize-none", className)} />;
}

interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}

export function Toggle({ checked, onChange, label, description }: ToggleProps) {
  return (
    <div className="flex items-start gap-3">
      <Switch checked={checked} onCheckedChange={onChange} className="mt-0.5" />
      <div>
        <p className="text-sm font-medium text-white/80">{label}</p>
        {description && (
          <p className="text-[11px] text-white/30 mt-0.5">{description}</p>
        )}
      </div>
    </div>
  );
}

interface SaveBarProps {
  isPending: boolean;
  saved?: boolean;
  error?: string | null;
}

export function SaveBar({ isPending, saved, error }: SaveBarProps) {
  return (
    <div className="flex items-center gap-4 pt-6 border-t border-white/8">
      <Button
        type="submit"
        disabled={isPending}
        className="h-11 rounded-xl bg-teal-700 px-6 text-white hover:bg-teal-600"
      >
        {isPending ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Saving…
          </>
        ) : (
          "Save Changes"
        )}
      </Button>
      {saved && !isPending && (
        <span className="text-teal-400 text-sm">Saved ✓</span>
      )}
      {error && <span className="text-red-400 text-sm">{error}</span>}
    </div>
  );
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {description && (
          <p className="text-white/40 text-sm mt-1">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white/5 border border-white/8 rounded-2xl p-6 shadow-[0_1px_0_rgba(255,255,255,0.03)] ${className}`}>
      {children}
    </div>
  );
}
