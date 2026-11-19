import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, CalendarDays, LayoutDashboard, Sparkles, Users } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { LoginScreen } from "@/components/login-screen";
import { Mark } from "@/components/mark";
import { MEMBERS, memberById, useHive } from "@/lib/hive";
import { ACCOUNTS, useSession } from "@/lib/session";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/events", label: "Events", icon: CalendarDays },
  { href: "/volunteers", label: "Volunteers", icon: Users },
  { href: "/assistant", label: "Hive AI", icon: Sparkles },
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
  const bootSession = useSession((state) => state.boot);
  const sessionBooted = useSession((state) => state.booted);
  const userId = useSession((state) => state.userId);
  const signOut = useSession((state) => state.signOut);
  const [armed, setArmed] = useState(false);
  const [open, setOpen] = useState(false);
  const [synced, setSynced] = useState<string | null>(null);

  useEffect(() => {
    boot();
    bootSession();
  }, [boot, bootSession]);

  useEffect(() => {
    if (!userId || synced === userId) return;
    setMe(userId);
    setSynced(userId);
  }, [userId, synced, setMe]);

  if (!sessionBooted) return null;
  if (!userId) return <LoginScreen />;

  const account = ACCOUNTS.find((item) => item.id === userId);
  const viewing = memberById(meId);

  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-deep text-white lg:flex">
        <Link to="/" className="flex h-16 items-center gap-2.5 px-5">
          <Mark className="size-7 text-honey-soft" />
          <span className="font-display text-xl">EventHive</span>
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
                  active ? "bg-white/12 text-white" : "text-white/70 hover:bg-white/8 hover:text-white",
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
                {item.label}
                {active ? <span className="ml-auto size-1.5 rounded-full bg-honey-soft" /> : null}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 p-4">
          <p className="text-xs text-white/50">Batch 6 · Lab G1</p>
          <button
            type="button"
            className="mt-2 h-11 text-left text-sm text-honey-soft"
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
          <button type="button" className="h-11 text-left text-sm text-white/60" onClick={signOut}>
            Sign out{account ? ` · ${account.name.split(" ")[0]}` : ""}
          </button>
          {armed ? (
            <button type="button" className="h-11 text-sm text-white/50" onClick={() => setArmed(false)}>
              Cancel
            </button>
          ) : null}
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 border-b border-line bg-surface/90 backdrop-blur lg:hidden">
          <div className="flex h-14 items-center justify-between px-4">
            <Link to="/" className="flex items-center gap-2 text-ink">
              <Mark className="size-6 text-honey" />
              <span className="font-display text-lg">EventHive</span>
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
          <nav className="grid grid-cols-5 border-t border-line">
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
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-muted">Same board for the whole team.</p>
              <button
                type="button"
                className="h-11 shrink-0 rounded-full border border-line bg-surface px-4 text-sm font-medium text-ink shadow-sm"
                onClick={() => setOpen((value) => !value)}
              >
                Viewing as {viewing.name.split(" ")[0]}
              </button>
            </div>
            {open ? (
              <ul className="overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
                {MEMBERS.map((member) => {
                  const active = member.id === meId;
                  return (
                    <li key={member.id} className="border-t border-line first:border-t-0">
                      <button
                        type="button"
                        className={cn(
                          "flex h-12 w-full items-center justify-between px-4 text-left text-sm",
                          active ? "bg-honey-soft text-honey" : "text-ink",
                        )}
                        onClick={() => {
                          setMe(member.id);
                          setOpen(false);
                        }}
                      >
                        <span>
                          {member.name} · {member.role}
                        </span>
                        <span className={cn("size-3 rounded-full", active ? "bg-honey" : "border border-line")} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
