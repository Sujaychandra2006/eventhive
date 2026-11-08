import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button, Field, Pill, fieldClass } from "@/components/ui";
import { useHive } from "@/lib/hive";

export const Route = createFileRoute("/volunteers")({ component: VolunteersPage });

function VolunteersPage() {
  const volunteers = useHive((state) => state.volunteers);
  const shifts = useHive((state) => state.shifts);
  const events = useHive((state) => state.events);
  const addVolunteer = useHive((state) => state.addVolunteer);
  const deleteVolunteer = useHive((state) => state.deleteVolunteer);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dept, setDept] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  const filtered = [...volunteers]
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((volunteer) => {
      const haystack = `${volunteer.name} ${volunteer.dept} ${volunteer.year}`.toLowerCase();
      return haystack.includes(query.trim().toLowerCase());
    });

  const save = () => {
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    addVolunteer({
      name: name.trim(),
      phone: phone.trim() || "Not shared",
      dept: dept.trim() || "—",
      year: year.trim() || "—",
    });
    setName("");
    setPhone("");
    setDept("");
    setYear("");
    setError("");
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-4xl font-medium text-ink">Volunteers</h1>
          <p className="mt-2 max-w-xl text-muted">
            Names, numbers, and the shifts they actually accepted. A form response is not a confirmation.
          </p>
        </div>
        <Button type="button" onClick={() => setOpen((value) => !value)}>
          {open ? "Close" : "Add volunteer"}
        </Button>
      </header>

      {open ? (
        <form
          className="grid gap-3 rounded-lg border border-line bg-surface p-4 sm:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            save();
          }}
        >
          <Field label="Name">
            <input className={fieldClass} value={name} onChange={(event) => setName(event.target.value)} autoFocus />
          </Field>
          <Field label="Phone">
            <input className={fieldClass} value={phone} onChange={(event) => setPhone(event.target.value)} />
          </Field>
          <Field label="Department">
            <input className={fieldClass} value={dept} onChange={(event) => setDept(event.target.value)} />
          </Field>
          <Field label="Year">
            <input className={fieldClass} value={year} onChange={(event) => setYear(event.target.value)} />
          </Field>
          {error ? <p className="text-sm text-honey sm:col-span-2">{error}</p> : null}
          <div className="sm:col-span-2">
            <Button type="submit">Save volunteer</Button>
          </div>
        </form>
      ) : null}

      <input
        className="h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none placeholder:text-muted focus-visible:border-honey sm:max-w-sm"
        placeholder="Search name or department"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label="Search volunteers"
      />

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-line bg-surface p-6 text-sm text-muted">No volunteers match that search.</p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {filtered.map((volunteer) => {
            const mine = shifts.filter((shift) => shift.volunteerId === volunteer.id);
            return (
              <li key={volunteer.id} className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-xl font-medium text-ink">{volunteer.name}</h2>
                    <p className="text-sm text-muted">
                      {volunteer.dept} · {volunteer.year}
                    </p>
                    <p className="text-sm tabular-nums text-muted">{volunteer.phone}</p>
                  </div>
                  {pendingDelete === volunteer.id ? (
                    <Button type="button" variant="soft" onClick={() => deleteVolunteer(volunteer.id)}>
                      Remove
                    </Button>
                  ) : (
                    <Button type="button" variant="ghost" onClick={() => setPendingDelete(volunteer.id)}>
                      Remove
                    </Button>
                  )}
                </div>
                {mine.length === 0 ? (
                  <p className="text-sm text-muted">Not on a shift yet. Add them from an event.</p>
                ) : (
                  <ul className="flex flex-col gap-2">
                    {mine.map((shift) => {
                      const event = events.find((item) => item.id === shift.eventId);
                      return (
                        <li key={shift.id} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                          <span className="text-ink">
                            {event ? (
                              <Link to="/events/$eventId" params={{ eventId: event.id }} className="font-medium">
                                {event.title}
                              </Link>
                            ) : (
                              "Removed event"
                            )}
                            <span className="text-muted">
                              {" "}
                              · {shift.role} · {shift.slot}
                            </span>
                          </span>
                          <Pill tone={shift.status === "confirmed" ? "moss" : "honey"}>
                            {shift.status === "confirmed" ? "Confirmed" : "Pending"}
                          </Pill>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
