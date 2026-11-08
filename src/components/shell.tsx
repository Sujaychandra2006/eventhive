import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, CalendarDays, LayoutDashboard, Users } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Mark } from "@/components/mark";
import { MEMBERS, useHive } from "@/lib/hive";
import { cn } from "@/lib/cn";
import { fieldClass } from "@/components/ui";

const NAV = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/events", label: "Events", icon: CalendarDays },
  { href: "/volunteers", label: "Volunteers", icon: Users },
  { href: "/research", label: "Research", icon: BookOpen },
] as const;

function isActive(path: string, href: string) {
  if (href === "/") return path === "/";
  return path === href || path.startsWith(`${href}/`);
}

export function Shell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const boot = useHive((state) => state.boot);
  const meId = useHive((state) => state.meId);
  const setMe = useHive((state) => state.setMe);
  const reset = useHive((state) => state.reset);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    boot();
  }, [boot]);

  return (
    <div className="flex min-h-screen bg-paper">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-line bg-surface lg:flex">
        <Link to="/" className="flex h-16 items-center gap-2.5 px-5 text-ink">
          <Mark className="size-7 text-honey" />
          <span className="font-display text-xl font-medium">EventHive</span>
        </Link>
        <nav className="flex flex-1 flex-col gap-1 px-3">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = isActive(path, item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-11 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors",
                  active ? "bg-honey-soft text-honey" : "text-ink hover:bg-paper",
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-line p-4">
          <p className="text-xs text-muted">Batch 6 · Lab G1</p>
          <button
            type="button"
            className="mt-2 h-11 text-left text-sm text-honey"
            onClick={() => {
              if (!armed) {
                setArmed(true);
                return;
              }
              reset();
              setArmed(false);
            }}
          >
            {armed ? "Click again to restore" : "Restore sample board"}
          </button>
          {armed ? (
            <button type="button" className="h-11 text-sm text-muted" onClick={() => setArmed(false)}>
              Cancel
            </button>
          ) : null}
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 border-b border-line bg-surface lg:hidden">
          <div className="flex h-14 items-center justify-between px-4">
            <Link to="/" className="flex items-center gap-2 text-ink">
              <Mark className="size-6 text-honey" />
              <span className="font-display text-lg font-medium">EventHive</span>
            </Link>
            <button
              type="button"
              className="h-11 px-2 text-sm text-muted"
              onClick={() => {
                if (!armed) {
                  setArmed(true);
                  return;
                }
                reset();
                setArmed(false);
              }}
            >
              {armed ? "Confirm restore" : "Restore"}
            </button>
          </div>
          <nav className="grid grid-cols-4 border-t border-line">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = isActive(path, item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex h-14 flex-col items-center justify-center gap-1 text-xs font-medium",
                    active ? "text-honey" : "text-muted",
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">Same board for the whole team. Switch who you are viewing as.</p>
            <label className="flex items-center gap-2 text-sm">
              <span className="shrink-0 font-medium text-ink">Viewing as</span>
              <select
                className={cn(fieldClass, "sm:w-72")}
                value={meId}
                onChange={(event) => setMe(event.target.value)}
              >
                {MEMBERS.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name} · {member.role}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
