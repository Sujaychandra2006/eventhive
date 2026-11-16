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
    <div className="flex min-h-screen items-center justify-center bg-paper px-4 py-10">
      <div className="w-full max-w-md rounded-lg border border-line bg-surface p-6">
        <div className="flex items-center gap-2.5">
          <Mark className="size-7 text-honey" />
          <span className="font-display text-2xl font-medium text-ink">EventHive</span>
        </div>
        <h1 className="mt-6 font-display text-3xl font-medium text-ink">Sign in to the board.</h1>
        <p className="mt-2 text-sm text-muted">
          Team accounts only. Password for every demo account is{" "}
          <span className="font-medium text-ink">{DEMO_PASSWORD}</span>.
        </p>

        <form
          className="mt-6 flex flex-col gap-4"
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
          <Button type="submit">Sign in</Button>
        </form>
      </div>
    </div>
  );
}
