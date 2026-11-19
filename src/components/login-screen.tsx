import { useState } from "react";
import { Mark } from "@/components/mark";
import { Button, Field, fieldClass } from "@/components/ui";
import { ACCOUNTS, DEMO_PASSWORD, useSession } from "@/lib/session";

export function LoginScreen() {
  const signIn = useSession((state) => state.signIn);
  const [handle, setHandle] = useState(ACCOUNTS[0].handle);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <section className="relative hidden overflow-hidden bg-deep text-white lg:flex lg:flex-col lg:justify-between lg:px-12 lg:py-12">
        <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-honey/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-0 size-[28rem] rounded-full bg-moss/30 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "22px 22px" }} />

        <div className="relative flex items-center gap-3">
          <Mark className="size-10 text-honey-soft" />
          <span className="font-display text-2xl">EventHive</span>
        </div>

        <div className="relative max-w-lg">
          <p className="text-sm font-medium tracking-[0.18em] text-honey-soft">CAMPUS EVENT DESK</p>
          <h1 className="mt-4 font-display text-6xl leading-[1.05]">The whole fest. One board.</h1>
          <p className="mt-5 max-w-md text-lg text-white/70">
            Owners, shifts, participants, and a live AI helper. Built so the committee stops living in five tools.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[
              ["Events", "One place"],
              ["Board", "To do · Done"],
              ["Hive AI", "Live Groq"],
            ].map(([title, note]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
                <p className="font-display text-lg">{title}</p>
                <p className="text-xs text-white/55">{note}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-sm text-white/50">Batch 6 · Lab G1 · NIE Mysuru</p>
      </section>

      <section className="flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <Mark className="size-8 text-honey" />
            <span className="font-display text-2xl text-ink">EventHive</span>
          </div>
          <h1 className="font-display text-4xl font-medium text-ink">Sign in to the desk.</h1>
          <p className="mt-2 text-sm text-muted">
            Team accounts. Password for every demo account is{" "}
            <span className="rounded-md bg-honey-soft px-1.5 py-0.5 font-medium text-honey">{DEMO_PASSWORD}</span>.
          </p>

          <form
            className="mt-8 flex flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              const message = signIn(handle, password);
              setError(message);
            }}
          >
            <Field label="Who is signing in">
              <select className={fieldClass} value={handle} onChange={(event) => setHandle(event.target.value)}>
                {ACCOUNTS.map((account) => (
                  <option key={account.id} value={account.handle}>
                    {account.name} · {account.role}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Password">
              <input
                className={fieldClass}
                type="password"
                value={password}
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </Field>
            {error ? <p className="text-sm text-honey">{error}</p> : null}
            <Button type="submit" className="mt-1 h-12 text-base">
              Enter the board
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
