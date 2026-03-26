"use client";

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
  return (
    <input
      {...props}
      className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-teal-500/60 focus:ring-1 focus:ring-teal-500/30 transition ${className}`}
    />
  );
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export function Textarea({ className = "", ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-teal-500/60 focus:ring-1 focus:ring-teal-500/30 transition resize-none ${className}`}
    />
  );
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
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 mt-0.5 ${
          checked ? "bg-teal-600" : "bg-white/10"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
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
      <button
        type="submit"
        disabled={isPending}
        className="px-6 py-2.5 bg-teal-700 hover:bg-teal-600 disabled:opacity-60 text-white text-sm font-medium rounded-xl transition-all duration-200 flex items-center gap-2"
      >
        {isPending ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Saving…
          </>
        ) : (
          "Save Changes"
        )}
      </button>
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
    <div className={`bg-white/5 border border-white/8 rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
}
