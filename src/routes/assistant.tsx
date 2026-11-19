import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button, Field, fieldClass } from "@/components/ui";
import { streamHive, visibleText, type ChatTask, type ChatTurn } from "@/lib/chat";
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
      content: "Hi. I am Hive AI. Ask me anything about this event.",
    },
  ]);

  const event = events.find((item) => item.id === eventId) ?? events[0];

  async function send() {
    if (!event || busy) return;
    const text = draft.trim();
    if (!text) return;
    const history = [
      ...chat
        .filter((item) => item.content)
        .map((item) => ({ role: item.role, content: item.content })),
      { role: "user" as const, content: text },
    ];
    setChat((current) => [...current, { role: "user", content: text }, { role: "assistant", content: "" }]);
    setDraft("");
    setBusy(true);
    let full = "";
    try {
      const stream = await streamHive({
        data: {
          eventTitle: event.title,
          eventDescription: event.description,
          messages: history,
        },
      });
      for await (const chunk of stream) {
        if (chunk.text) {
          full += chunk.text;
          const shown = visibleText(full);
          setChat((current) => {
            const next = [...current];
            const last = next.at(-1);
            if (last?.role === "assistant") {
              next[next.length - 1] = { ...last, content: shown || full, source: chunk.source ?? last.source };
            }
            return next;
          });
        }
        if (chunk.done) {
          const shown = visibleText(full) || full;
          setChat((current) => {
            const next = [...current];
            const last = next.at(-1);
            if (last?.role === "assistant") {
              next[next.length - 1] = {
                ...last,
                content: shown,
                tasks: chunk.tasks,
                source: chunk.source ?? last.source,
              };
            }
            return next;
          });
        }
      }
    } catch {
      setChat((current) => {
        const next = [...current];
        const last = next.at(-1);
        if (last?.role === "assistant" && !last.content) {
          next[next.length - 1] = { ...last, content: "The chat could not reach Groq. Try again in a minute." };
        }
        return next;
      });
    } finally {
      setBusy(false);
    }
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
        <p className="text-sm font-medium text-honey">Live Groq chat</p>
        <h1 className="mt-1 font-display text-4xl font-medium text-ink">Hive AI</h1>
        <p className="mt-3 max-w-xl text-muted">
          Answers appear as they are written. Say hi, ask anything, or ask for a plan.
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
                    : "max-w-xl whitespace-pre-wrap rounded-lg bg-paper px-4 py-3 text-sm text-ink"
                }
              >
                {item.content || (busy && index === chat.length - 1 ? "..." : "")}
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
            placeholder="Say hi, or ask anything"
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
