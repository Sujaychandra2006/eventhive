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
    <div className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
      <section className="relative hidden flex-col justify-between overflow-hidden bg-deep px-10 py-10 text-white lg:flex">
        <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-honey/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-10 size-80 rounded-full bg-moss/25 blur-3xl" />
        <div className="relative flex items-center gap-3">
          <Mark className="size-8 text-honey-soft" />
          <span className="font-display text-2xl">EventHive</span>
        </div>
        <div className="relative max-w-lg">
          <p className="text-sm font-medium tracking-wide text-honey-soft">Campus event desk</p>
          <h1 className="mt-3 font-display text-5xl leading-tight">One board for the whole fest.</h1>
          <p className="mt-4 max-w-md text-lg text-white/75">
            Events, owners, shifts, and a live AI helper. Built for the committee, not the group chat.
          </p>
        </div>
        <p className="relative text-sm text-white/60">Batch 6 · Lab G1 · NIE Mysuru</p>
      </section>

      <section className="flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <Mark className="size-7 text-honey" />
            <span className="font-display text-2xl text-ink">EventHive</span>
          </div>
          <h1 className="font-display text-4xl font-medium text-ink">Sign in.</h1>
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
            <Button type="submit" className="mt-1">
              Enter the board
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
