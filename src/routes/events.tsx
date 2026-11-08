import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { EventDialog } from "@/components/event-dialog";
import { Button, Meter, Pill } from "@/components/ui";
import { formatDay } from "@/lib/dates";
import { STATUS_LABEL, useHive } from "@/lib/hive";

export const Route = createFileRoute("/events")({ component: EventsRoute });

function EventsRoute() {
  const path = useRouterState({ select: (state) => state.location.pathname });
  if (path.startsWith("/events/")) return <Outlet />;
  return <EventsPage />;
}

function EventsPage() {
  const navigate = useNavigate();
  const events = useHive((state) => state.events);
  const tasks = useHive((state) => state.tasks);
  const shifts = useHive((state) => state.shifts);
  const [query, setQuery] = useState("");
  const [creating, setCreating] = useState(false);

  const filtered = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .filter((event) => {
      const haystack = `${event.title} ${event.club} ${event.venue}`.toLowerCase();
      return haystack.includes(query.trim().toLowerCase());
    });

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-4xl font-medium text-ink">Events</h1>
          <p className="mt-2 max-w-xl text-muted">Each event has its own task board and volunteer roster.</p>
        </div>
        <Button type="button" onClick={() => setCreating(true)}>
          New event
        </Button>
      </header>

      <input
        className="h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none placeholder:text-muted focus-visible:border-honey sm:max-w-sm"
        placeholder="Search title, club, or venue"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label="Search events"
      />

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-line bg-surface p-6 text-sm text-muted">No events match that search.</p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {filtered.map((event) => {
            const mine = tasks.filter((task) => task.eventId === event.id);
            const done = mine.filter((task) => task.column === "done").length;
            const pct = mine.length ? Math.round((done / mine.length) * 100) : 0;
            const eventShifts = shifts.filter((shift) => shift.eventId === event.id);
            const confirmed = eventShifts.filter((shift) => shift.status === "confirmed").length;
            const when = formatDay(event.date);
            return (
              <li key={event.id}>
                <Link
                  to="/events/$eventId"
                  params={{ eventId: event.id }}
                  className="flex h-full flex-col gap-4 rounded-lg border border-line bg-surface p-5 transition-colors hover:border-honey"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted">{event.club}</p>
                      <h2 className="mt-1 font-display text-2xl font-medium text-ink">{event.title}</h2>
                    </div>
                    <Pill tone={event.status === "wrapped" ? "moss" : event.status === "track" ? "honey" : "muted"}>
                      {STATUS_LABEL[event.status]}
                    </Pill>
                  </div>
                  <p className="text-sm text-muted">
                    {when.label} · {event.time}
                    <br />
                    {event.venue} · {event.guests} guests
                  </p>
                  <p className="line-clamp-3 text-sm text-ink">{event.description}</p>
                  <div>
                    <div className="mb-2 flex justify-between text-xs text-muted">
                      <span className="tabular-nums">
                        {done}/{mine.length} tasks
                      </span>
                      <span className="tabular-nums">
                        {confirmed}/{eventShifts.length} shifts confirmed
                      </span>
                    </div>
                    <Meter value={pct} moss={event.status === "wrapped"} />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <EventDialog
        open={creating}
        onClose={() => setCreating(false)}
        onSaved={(id) => navigate({ to: "/events/$eventId", params: { eventId: id } })}
      />
    </div>
  );
}
