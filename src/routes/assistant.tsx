import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button, Field, fieldClass } from "@/components/ui";
import { useHive } from "@/lib/hive";
import { suggestFor } from "@/lib/suggest";

export const Route = createFileRoute("/assistant")({ component: AssistantPage });

function AssistantPage() {
  const events = useHive((state) => state.events);
  const addTask = useHive((state) => state.addTask);
  const [eventId, setEventId] = useState(events[0]?.id ?? "");
  const [added, setAdded] = useState<string[]>([]);
  const event = events.find((item) => item.id === eventId) ?? events[0];
  const plan = useMemo(
    () => (event ? suggestFor(event.title, event.description) : null),
    [event],
  );

  if (!event || !plan) {
    return (
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl font-medium text-ink">Hive AI</h1>
        <p className="mt-3 text-muted">Add an event first. The helper needs a title to plan from.</p>
      </div>
    );
  }

  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <header>
        <p className="text-sm font-medium text-honey">On-device planner</p>
        <h1 className="mt-1 font-display text-4xl font-medium text-ink">Hive AI</h1>
        <p className="mt-3 max-w-xl text-muted">
          Reads the event title and description, then suggests the tasks and volunteer roles a campus
          team usually forgets. Nothing leaves this browser.
        </p>
      </header>

      <Field label="Event">
        <select className={fieldClass} value={event.id} onChange={(next) => setEventId(next.target.value)}>
          {events.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
      </Field>

      <section className="rounded-lg border border-line bg-surface p-5">
        <p className="text-sm text-muted">{plan.reason}</p>
        <h2 className="mt-3 font-display text-2xl font-medium text-ink">Suggested tasks</h2>
        <ul className="mt-4 flex flex-col gap-3">
          {plan.tasks.map((task) => {
            const done = added.includes(task.title);
            return (
              <li key={task.title} className="flex items-center justify-between gap-3 border-t border-line pt-3">
                <div>
                  <p className="text-sm font-medium text-ink">{task.title}</p>
                  <p className="text-xs text-muted">{task.priority === "high" ? "High priority" : "Normal"}</p>
                </div>
                <Button
                  type="button"
                  variant={done ? "moss" : "soft"}
                  disabled={done}
                  onClick={() => {
                    addTask({
                      eventId: event.id,
                      title: task.title,
                      column: "todo",
                      assigneeId: null,
                      priority: task.priority,
                      due: event.date,
                    });
                    setAdded((current) => [...current, task.title]);
                  }}
                >
                  {done ? "Added" : "Add to board"}
                </Button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="rounded-lg border border-line bg-surface p-5">
        <h2 className="font-display text-2xl font-medium text-ink">Roles to cover</h2>
        <p className="mt-2 text-sm text-muted">{plan.roles.join(" · ")}</p>
        <Link to="/volunteers" className="mt-4 inline-flex h-11 items-center text-sm font-medium text-honey">
          Open volunteers
        </Link>
      </section>
    </div>
  );
}
