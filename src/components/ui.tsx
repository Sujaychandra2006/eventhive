import { useEffect, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "soft" | "ghost" | "moss";
}) {
  const styles = {
    primary: "bg-honey text-surface hover:opacity-90",
    soft: "bg-honey-soft text-honey hover:opacity-90",
    moss: "bg-moss-soft text-moss hover:opacity-90",
    ghost: "bg-transparent text-ink hover:bg-paper",
  };
  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-colors disabled:opacity-50",
        styles[variant],
        className,
      )}
      {...props}
    />
  );
}

export const fieldClass =
  "h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none transition-colors placeholder:text-muted focus-visible:border-honey";

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-ink">{label}</span>
      {children}
    </label>
  );
}

export function Pill({
  tone,
  children,
}: {
  tone: "honey" | "moss" | "muted";
  children: ReactNode;
}) {
  const styles = {
    honey: "bg-honey-soft text-honey",
    moss: "bg-moss-soft text-moss",
    muted: "bg-paper text-muted",
  };
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", styles[tone])}>
      {children}
    </span>
  );
}

export function Avatar({ name }: { name: string }) {
  const letters = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-honey-soft text-xs font-medium text-honey">
      {letters}
    </span>
  );
}

export function Meter({ value, moss = false }: { value: number; moss?: boolean }) {
  const width = Math.max(0, Math.min(100, value));
  return (
    <div
      className="h-1.5 overflow-hidden rounded-full bg-paper"
      role="progressbar"
      aria-valuenow={width}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={cn("h-full", moss ? "bg-moss" : "bg-honey")} style={{ width: `${width}%` }} />
    </div>
  );
}

export function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-3 sm:items-center" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-line bg-surface p-5"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <h2 id="dialog-title" className="font-display text-2xl font-medium text-ink">
            {title}
          </h2>
          <button type="button" className="h-11 px-3 text-sm text-muted" onClick={onClose}>
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
