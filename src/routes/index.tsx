import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { EventDialog } from "@/components/event-dialog";
import { Button, Meter, Pill } from "@/components/ui";
import { formatDay, relativeDay, todayIso } from "@/lib/dates";
import { MEMBERS, STATUS_LABEL, memberById, personName, useHive } from "@/lib/hive";

export const Route = createFileRoute("/")({ component: Overview });

function Overview() {
  const navigate = useNavigate();
  const events = useHive((state) => state.events);
  const tasks = useHive((state) => state.tasks);
  const volunteers = useHive((state) => state.volunteers);
  const shifts = useHive((state) => state.shifts);
  const meId = useHive((state) => state.meId);
  const takeTask = useHive((state) => state.takeTask);
  const setShiftStatus = useHive((state) => state.setShiftStatus);
  const [creating, setCreating] = useState(false);
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    setToday(todayIso());
  }, []);

  const ordered = [...events].sort((a, b) => a.date.localeCompare(b.date));
  const openTasks = tasks.filter((task) => task.column !== "done");
  const confirmed = shifts.filter((shift) => shift.status === "confirmed").length;
  const pending = shifts.filter((shift) => shift.status === "pending");
  const looseTasks = openTasks.filter((task) => !task.assigneeId);
  const me = memberById(meId);

  const workload = MEMBERS.map((member) => ({
    ...member,
    open: openTasks.filter((task) => task.assigneeId === member.id).length,
  })).sort((a, b) => b.open - a.open);
  const maxLoad = Math.max(1, ...workload.map((member) => member.open));

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-honey">Campus event desk</p>
          <h1 className="mt-1 font-display text-4xl font-medium text-ink">The whole fest, on one board.</h1>
          <p className="mt-3 text-muted">
            {me.name.split(" ")[0]}, tasks have owners and volunteers have shifts. This replaces the group chat,
            the sheet, and the form that nobody updates.
          </p>
        </div>
        <Button type="button" onClick={() => setCreating(true)}>
          New event
        </Button>
      </header>

      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
        {[
          ["Events", events.length],
          ["Open tasks", openTasks.length],
          ["Shifts confirmed", confirmed],
          ["Still waiting", pending.length],
        ].map(([label, value]) => (
          <div key={String(label)} className="bg-surface px-4 py-4">
            <dt className="text-xs text-muted">{label}</dt>
            <dd className="font-display text-3xl tabular-nums text-ink">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <section className="flex flex-col gap-3">
          <h2 className="font-display text-2xl font-medium text-ink">Coming up</h2>
          {ordered.length === 0 ? (
            <p className="rounded-lg border border-line bg-surface p-6 text-sm text-muted">
              No events yet. Add the first one and the board fills in around it.
            </p>
          ) : (
            ordered.map((event) => {
              const mine = tasks.filter((task) => task.eventId === event.id);
              const done = mine.filter((task) => task.column === "done").length;
              const pct = mine.length ? Math.round((done / mine.length) * 100) : 0;
              const eventShifts = shifts.filter((shift) => shift.eventId === event.id);
              const eventConfirmed = eventShifts.filter((shift) => shift.status === "confirmed").length;
              const when = formatDay(event.date);
              return (
                <article key={event.id} className="flex gap-4 rounded-lg border border-line bg-surface p-4">
                  <div className="flex w-16 shrink-0 flex-col items-center justify-center rounded-md bg-paper py-2">
                    <span className="text-xs uppercase text-muted">{when.month}</span>
                    <span className="font-display text-2xl tabular-nums text-ink">{when.day}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        to="/events/$eventId"
                        params={{ eventId: event.id }}
                        className="font-display text-xl font-medium text-ink"
                      >
                        {event.title}
                      </Link>
                      <Pill tone={event.status === "wrapped" ? "moss" : event.status === "track" ? "honey" : "muted"}>
                        {STATUS_LABEL[event.status]}
                      </Pill>
                    </div>
                    <p className="mt-1 text-sm text-muted">
                      {event.club} · {event.venue}
                      {today ? ` · ${relativeDay(today, event.date)}` : ""}
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="min-w-0 flex-1">
                        <Meter value={pct} moss={event.status === "wrapped"} />
                      </div>
                      <span className="shrink-0 text-xs tabular-nums text-muted">
                        {done}/{mine.length} tasks · {eventConfirmed}/{eventShifts.length} shifts
                      </span>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </section>

        <section className="rounded-lg border border-line bg-surface p-4">
          <h2 className="font-display text-2xl font-medium text-ink">Still loose</h2>
          <p className="mt-1 text-sm text-muted">Unowned tasks and volunteers who have not confirmed.</p>
          {looseTasks.length === 0 && pending.length === 0 ? (
            <p className="mt-6 text-sm text-muted">Nothing is hanging. Enjoy it while it lasts.</p>
          ) : (
            <ul className="mt-4">
              {looseTasks.map((task) => {
                const event = events.find((item) => item.id === task.eventId);
                return (
                  <li key={task.id} className="flex items-start justify-between gap-3 border-t border-line py-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-ink">{task.title}</p>
                      <p className="text-xs text-muted">{event?.title ?? "Event"} · no owner</p>
                    </div>
                    <Button type="button" variant="soft" className="shrink-0" onClick={() => takeTask(task.id)}>
                      Take it
                    </Button>
                  </li>
                );
              })}
              {pending.map((shift) => {
                const event = events.find((item) => item.id === shift.eventId);
                return (
                  <li key={shift.id} className="flex items-start justify-between gap-3 border-t border-line py-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-ink">{personName(shift.volunteerId, volunteers)}</p>
                      <p className="text-xs text-muted">
                        {event?.title ?? "Event"} · {shift.role} · not confirmed
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="moss"
                      className="shrink-0"
                      onClick={() => setShiftStatus(shift.id, "confirmed")}
                    >
                      Confirm
                    </Button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>

      <section>
        <h2 className="font-display text-2xl font-medium text-ink">Who is carrying the week</h2>
        <p className="mt-1 text-sm text-muted">Open tasks only. Reassign from an event board if one person is stuck with the list.</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {workload.map((member) => (
            <li key={member.id} className="rounded-lg border border-line bg-surface p-4">
              <p className="text-sm font-medium text-ink">{member.name}</p>
              <p className="text-xs text-muted">{member.role}</p>
              <p className="mt-3 font-display text-2xl tabular-nums text-ink">{member.open}</p>
              <div className="mt-2">
                <Meter value={(member.open / maxLoad) * 100} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <EventDialog
        open={creating}
        onClose={() => setCreating(false)}
        onSaved={(id) => navigate({ to: "/events/$eventId", params: { eventId: id } })}
      />
    </div>
  );
}
