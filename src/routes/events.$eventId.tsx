import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { EventDialog } from "@/components/event-dialog";
import { ShiftPanel } from "@/components/shift-panel";
import { TaskBoard } from "@/components/task-board";
import { Button, Meter, Pill } from "@/components/ui";
import { formatDay } from "@/lib/dates";
import { STATUS_LABEL, useHive } from "@/lib/hive";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/events/$eventId")({ component: EventPage });

function EventPage() {
  const { eventId } = Route.useParams();
  const navigate = useNavigate();
  const events = useHive((state) => state.events);
  const allTasks = useHive((state) => state.tasks);
  const allShifts = useHive((state) => state.shifts);
  const event = events.find((item) => item.id === eventId);
  const tasks = allTasks.filter((task) => task.eventId === eventId);
  const shifts = allShifts.filter((shift) => shift.eventId === eventId);
  const deleteEvent = useHive((state) => state.deleteEvent);
  const [tab, setTab] = useState<"tasks" | "volunteers">("tasks");
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!event) {
    return (
      <div className="rounded-lg border border-line bg-surface p-6">
        <h1 className="font-display text-3xl font-medium text-ink">That event is not on the board.</h1>
        <Link to="/events" className="mt-4 inline-flex h-11 items-center text-sm font-medium text-honey">
          Back to events
        </Link>
      </div>
    );
  }

  const done = tasks.filter((task) => task.column === "done").length;
  const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
  const confirmed = shifts.filter((shift) => shift.status === "confirmed").length;
  const when = formatDay(event.date);

  return (
    <div className="flex flex-col gap-6">
      <Link to="/events" className="text-sm font-medium text-honey">
        All events
      </Link>
      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-honey">{event.club}</p>
            <h1 className="mt-1 font-display text-4xl font-medium text-ink">{event.title}</h1>
            <p className="mt-2 text-muted">
              {when.label} · {event.time} · {event.venue} · {event.guests} guests
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Pill tone={event.status === "wrapped" ? "moss" : event.status === "track" ? "honey" : "muted"}>
              {STATUS_LABEL[event.status]}
            </Pill>
            <Button type="button" variant="ghost" onClick={() => setEditing(true)}>
              Edit
            </Button>
          </div>
        </div>
        <p className="max-w-3xl text-ink">{event.description}</p>
        <div className="max-w-xl">
          <div className="mb-2 flex justify-between text-sm text-muted">
            <span className="tabular-nums">
              {done}/{tasks.length} tasks done
            </span>
            <span className="tabular-nums">
              {confirmed}/{shifts.length} shifts confirmed
            </span>
          </div>
          <Meter value={pct} moss={event.status === "wrapped"} />
        </div>
      </header>

      <div className="flex gap-2 border-b border-line">
        {(
          [
            ["tasks", "Tasks"],
            ["volunteers", "Volunteers"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={cn(
              "h-11 border-b-2 px-4 text-sm font-medium",
              tab === id ? "border-honey text-ink" : "border-transparent text-muted",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "tasks" ? <TaskBoard eventId={event.id} /> : <ShiftPanel eventId={event.id} />}

      <div className="border-t border-line pt-4">
        {confirmDelete ? (
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm text-ink">Delete {event.title}? Tasks and shifts go with it.</p>
            <Button
              type="button"
              onClick={() => {
                deleteEvent(event.id);
                void navigate({ to: "/events" });
              }}
            >
              Delete event
            </Button>
            <Button type="button" variant="ghost" onClick={() => setConfirmDelete(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button type="button" variant="ghost" onClick={() => setConfirmDelete(true)}>
            Delete this event
          </Button>
        )}
      </div>

      <EventDialog open={editing} initial={event} onClose={() => setEditing(false)} />
    </div>
  );
}
