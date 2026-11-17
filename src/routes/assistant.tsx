import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button, Field, fieldClass } from "@/components/ui";
import { askHive, type ChatTask, type ChatTurn } from "@/lib/chat.server";
import { useHive } from "@/lib/hive";

export const Route = createFileRoute("/assistant")({ component: AssistantPage });

type Shown = ChatTurn & { tasks?: ChatTask[]; source?: "groq" | "local" };

function AssistantPage() {
  const events = useHive((state) => state.events);
  const addTask = useHive((state) => state.addTask);
  const [eventId, setEventId] = useState(events[0]?.id ?? "");
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [added, setAdded] = useState<string[]>([]);
  const [chat, setChat] = useState<Shown[]>([
    {
      role: "assistant",
      content: "Ask me to plan an event. I can list the jobs a campus team usually forgets, then you can drop them on the board.",
    },
  ]);

  const event = events.find((item) => item.id === eventId) ?? events[0];

  async function send() {
    if (!event || busy) return;
    const text = draft.trim();
    if (!text) return;
    const next: ChatTurn[] = [...chat.filter((item) => item.role !== "assistant" || item.content), { role: "user", content: text }];
    const history = [
      ...chat
        .filter((item) => item.content)
        .map((item) => ({ role: item.role, content: item.content })),
      { role: "user" as const, content: text },
    ];
    setChat((current) => [...current, { role: "user", content: text }]);
    setDraft("");
    setBusy(true);
    try {
      const reply = await askHive({
        data: {
          eventTitle: event.title,
          eventDescription: event.description,
          messages: history,
        },
      });
      setChat((current) => [
        ...current,
        { role: "assistant", content: reply.text, tasks: reply.tasks, source: reply.source },
      ]);
    } catch {
      setChat((current) => [
        ...current,
        { role: "assistant", content: "The chat could not reach Groq. Try again in a minute." },
      ]);
    } finally {
      setBusy(false);
    }
    void next;
  }

  if (!event) {
    return (
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl font-medium text-ink">Hive AI</h1>
        <p className="mt-3 text-muted">Add an event first. The helper needs a title to plan from.</p>
      </div>
    );
  }

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <header>
        <p className="text-sm font-medium text-honey">Groq chatbot</p>
        <h1 className="mt-1 font-display text-4xl font-medium text-ink">Hive AI</h1>
        <p className="mt-3 max-w-xl text-muted">
          Ask in plain words. The reply comes from Groq on the server, then you can add the suggested jobs to this event.
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

      <section className="flex min-h-[420px] flex-col rounded-lg border border-line bg-surface">
        <div className="flex flex-1 flex-col gap-4 p-5">
          {chat.map((item, index) => (
            <div key={`${item.role}-${index}`} className={item.role === "user" ? "self-end" : "self-start"}>
              <div
                className={
                  item.role === "user"
                    ? "max-w-md rounded-lg bg-honey px-4 py-3 text-sm text-surface"
                    : "max-w-xl rounded-lg bg-paper px-4 py-3 text-sm text-ink"
                }
              >
                {item.content}
                {item.source === "local" ? (
                  <p className="mt-2 text-xs text-muted">Shown from the local checklist because Groq did not reply.</p>
                ) : null}
              </div>
              {item.tasks?.length ? (
                <ul className="mt-3 flex flex-col gap-2">
                  {item.tasks.map((task) => {
                    const done = added.includes(`${event.id}:${task.title}`);
                    return (
                      <li key={task.title} className="flex items-center justify-between gap-3 rounded-md border border-line px-3 py-2">
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
                            setAdded((current) => [...current, `${event.id}:${task.title}`]);
                          }}
                        >
                          {done ? "Added" : "Add to board"}
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          ))}
          {busy ? <p className="text-sm text-muted">Hive is thinking...</p> : null}
        </div>

        <form
          className="flex gap-2 border-t border-line p-4"
          onSubmit={(submit) => {
            submit.preventDefault();
            void send();
          }}
        >
          <input
            className={fieldClass}
            value={draft}
            onChange={(next) => setDraft(next.target.value)}
            placeholder="Plan the blood drive, or ask what we are missing"
          />
          <Button type="submit" disabled={busy || !draft.trim()}>
            Send
          </Button>
        </form>
      </section>

      <Link to="/events/$eventId" params={{ eventId: event.id }} className="text-sm font-medium text-honey">
        Open {event.title} on the board
      </Link>
    </div>
  );
}
