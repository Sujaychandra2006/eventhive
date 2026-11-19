import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { EventDialog } from "@/components/event-dialog";
import { ShiftPanel } from "@/components/shift-panel";
import { TaskBoard } from "@/components/task-board";
import { Button, Field, Meter, Pill, fieldClass } from "@/components/ui";
import { formatDay } from "@/lib/dates";
import { STATUS_LABEL, useHive } from "@/lib/hive";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/events/$eventId")({ component: EventPage });

const emptyForm = { name: "", email: "", phone: "", dept: "", year: "" };

function EventPage() {
  const { eventId } = Route.useParams();
  const navigate = useNavigate();
  const events = useHive((state) => state.events);
  const allTasks = useHive((state) => state.tasks);
  const allShifts = useHive((state) => state.shifts);
  const allParticipants = useHive((state) => state.participants);
  const event = events.find((item) => item.id === eventId);
  const tasks = allTasks.filter((task) => task.eventId === eventId);
  const shifts = allShifts.filter((shift) => shift.eventId === eventId);
  const participants = allParticipants.filter((person) => person.eventId === eventId);
  const deleteEvent = useHive((state) => state.deleteEvent);
  const addParticipant = useHive((state) => state.addParticipant);
  const deleteParticipant = useHive((state) => state.deleteParticipant);
  const [tab, setTab] = useState<"tasks" | "volunteers" | "participants">("tasks");
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");

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

  function onRegister(eventSubmit: FormEvent) {
    eventSubmit.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    if (!name || !email) {
      setError("Name and email are required.");
      setSaved("");
      return;
    }
    addParticipant({
      eventId,
      name,
      email,
      phone: form.phone.trim(),
      dept: form.dept.trim(),
      year: form.year.trim(),
    });
    setForm(emptyForm);
    setError("");
    setSaved(`${name} is registered for ${event?.title}.`);
  }

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
            <span className="tabular-nums">{participants.length} registered</span>
          </div>
          <Meter value={pct} moss={event.status === "wrapped"} />
        </div>
      </header>

      <section className="rounded-lg border border-line bg-surface p-5">
        <h2 className="font-display text-2xl font-medium text-ink">Register to participate</h2>
        <p className="mt-1 text-sm text-muted">Anyone can join this event. The name appears in the participant list.</p>
        <form className="mt-4 grid gap-3 sm:grid-cols-2" onSubmit={onRegister}>
          <Field label="Name">
            <input className={fieldClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </Field>
          <Field label="Email">
            <input className={fieldClass} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </Field>
          <Field label="Phone">
            <input className={fieldClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </Field>
          <Field label="Department">
            <input className={fieldClass} value={form.dept} onChange={(e) => setForm({ ...form, dept: e.target.value })} />
          </Field>
          <Field label="Year">
            <input className={fieldClass} value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="2nd year" />
          </Field>
          <div className="flex items-end">
            <Button type="submit">Register</Button>
          </div>
        </form>
        {error ? <p className="mt-3 text-sm text-honey">{error}</p> : null}
        {saved ? <p className="mt-3 text-sm text-moss">{saved}</p> : null}
      </section>

      <div className="flex gap-2 border-b border-line">
        {(
          [
            ["tasks", "Tasks"],
            ["volunteers", "Volunteers"],
            ["participants", `Participants · ${participants.length}`],
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

      {tab === "tasks" ? <TaskBoard eventId={event.id} /> : null}
      {tab === "volunteers" ? <ShiftPanel eventId={event.id} /> : null}
      {tab === "participants" ? (
        participants.length === 0 ? (
          <p className="rounded-lg border border-line bg-surface p-6 text-sm text-muted">No one has registered yet.</p>
        ) : (
          <ul className="divide-y divide-line rounded-lg border border-line bg-surface">
            {participants.map((person) => (
              <li key={person.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                <div>
                  <p className="font-medium text-ink">{person.name}</p>
                  <p className="text-sm text-muted">
                    {person.email}
                    {person.phone ? ` · ${person.phone}` : ""}
                    {person.dept ? ` · ${person.dept}` : ""}
                    {person.year ? ` · ${person.year}` : ""}
                  </p>
                </div>
                <Button type="button" variant="ghost" onClick={() => deleteParticipant(person.id)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )
      ) : null}

      <div className="border-t border-line pt-4">
        {confirmDelete ? (
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm text-ink">Delete {event.title}? Tasks, shifts, and registrations go with it.</p>
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
