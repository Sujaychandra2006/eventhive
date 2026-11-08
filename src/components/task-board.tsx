import { useState } from "react";
import { Button, Field, Pill, fieldClass } from "@/components/ui";
import { formatDay } from "@/lib/dates";
import {
  MEMBERS,
  personName,
  useHive,
  type Column,
  type Task,
} from "@/lib/hive";
import { cn } from "@/lib/cn";

const COLUMNS: { id: Column; label: string }[] = [
  { id: "todo", label: "To do" },
  { id: "doing", label: "Doing" },
  { id: "done", label: "Done" },
];

export function TaskBoard({ eventId }: { eventId: string }) {
  const allTasks = useHive((state) => state.tasks);
  const volunteers = useHive((state) => state.volunteers);
  const tasks = allTasks.filter((task) => task.eventId === eventId);
  const meId = useHive((state) => state.meId);
  const addTask = useHive((state) => state.addTask);
  const updateTask = useHive((state) => state.updateTask);
  const moveTask = useHive((state) => state.moveTask);
  const deleteTask = useHive((state) => state.deleteTask);
  const [filter, setFilter] = useState<"all" | "mine" | "open">("all");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [priority, setPriority] = useState<"high" | "normal">("normal");
  const [due, setDue] = useState("2026-11-20");
  const [dragOver, setDragOver] = useState<Column | null>(null);

  const people = [
    ...MEMBERS.map((member) => ({ id: member.id, label: `${member.name} · ${member.role}` })),
    ...volunteers.map((volunteer) => ({ id: volunteer.id, label: `${volunteer.name} · volunteer` })),
  ];

  const visible = tasks.filter((task) => {
    if (filter === "mine") return task.assigneeId === meId;
    if (filter === "open") return task.column !== "done";
    return true;
  });

  const submit = () => {
    if (!title.trim()) return;
    addTask({
      eventId,
      title: title.trim(),
      column: "todo",
      assigneeId: assigneeId || null,
      priority,
      due,
    });
    setTitle("");
    setAssigneeId("");
    setPriority("normal");
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {(
            [
              ["all", "All"],
              ["mine", "Mine"],
              ["open", "Open"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setFilter(id)}
              className={cn(
                "h-11 rounded-full px-4 text-sm font-medium",
                filter === id ? "bg-ink text-surface" : "bg-surface text-ink border border-line",
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <Button type="button" onClick={() => setOpen((value) => !value)}>
          {open ? "Close" : "Add task"}
        </Button>
      </div>

      {open ? (
        <form
          className="grid gap-3 rounded-lg border border-line bg-surface p-4 sm:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
        >
          <Field label="Task">
            <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} autoFocus />
          </Field>
          <Field label="Owner">
            <select className={fieldClass} value={assigneeId} onChange={(event) => setAssigneeId(event.target.value)}>
              <option value="">Unassigned</option>
              {people.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Due">
            <input className={fieldClass} type="date" value={due} onChange={(event) => setDue(event.target.value)} />
          </Field>
          <Field label="Priority">
            <select
              className={fieldClass}
              value={priority}
              onChange={(event) => setPriority(event.target.value as "high" | "normal")}
            >
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
          </Field>
          <div className="sm:col-span-2">
            <Button type="submit">Add to the board</Button>
          </div>
        </form>
      ) : null}

      <p className="text-sm text-muted">Drag a card between columns, or use the buttons. Mine follows whoever you are viewing as.</p>

      <div className="grid gap-4 lg:grid-cols-3">
        {COLUMNS.map((column) => {
          const cards = visible.filter((task) => task.column === column.id);
          return (
            <section
              key={column.id}
              className={cn(
                "flex flex-col gap-3 rounded-lg border bg-surface p-3",
                dragOver === column.id ? "border-honey" : "border-line",
              )}
              onDragOver={(event) => {
                event.preventDefault();
                setDragOver(column.id);
              }}
              onDragLeave={() => setDragOver((current) => (current === column.id ? null : current))}
              onDrop={(event) => {
                event.preventDefault();
                const id = event.dataTransfer.getData("text/plain");
                if (id) moveTask(id, column.id);
                setDragOver(null);
              }}
            >
              <header className="flex items-center justify-between px-1">
                <h3 className="text-sm font-medium text-ink">{column.label}</h3>
                <span className="text-sm tabular-nums text-muted">{cards.length}</span>
              </header>
              {cards.length === 0 ? <p className="px-1 py-6 text-sm text-muted">Nothing here.</p> : null}
              {cards.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  owner={personName(task.assigneeId, volunteers)}
                  people={people}
                  onMove={(next) => moveTask(task.id, next)}
                  onAssign={(assignee) => updateTask(task.id, { assigneeId: assignee })}
                  onDelete={() => deleteTask(task.id)}
                />
              ))}
            </section>
          );
        })}
      </div>
    </div>
  );
}

function TaskCard({
  task,
  owner,
  people,
  onMove,
  onAssign,
  onDelete,
}: {
  task: Task;
  owner: string;
  people: { id: string; label: string }[];
  onMove: (column: Column) => void;
  onAssign: (assigneeId: string | null) => void;
  onDelete: () => void;
}) {
  const [confirm, setConfirm] = useState(false);
  const [picking, setPicking] = useState(false);
  const due = formatDay(task.due);

  return (
    <article
      draggable
      onDragStart={(event) => event.dataTransfer.setData("text/plain", task.id)}
      className="flex flex-col gap-3 rounded-md border border-line bg-paper p-3"
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-medium text-ink">{task.title}</h4>
        {task.priority === "high" ? <Pill tone="honey">High</Pill> : null}
      </div>
      <p className="text-xs text-muted">
        {owner} · due {due.label}
      </p>
      {picking ? (
        <select
          className={fieldClass}
          aria-label={`Owner for ${task.title}`}
          value={task.assigneeId ?? ""}
          onChange={(event) => {
            onAssign(event.target.value || null);
            setPicking(false);
          }}
        >
          <option value="">Unassigned</option>
          {people.map((person) => (
            <option key={person.id} value={person.id}>
              {person.label}
            </option>
          ))}
        </select>
      ) : null}
      <div className="flex flex-wrap gap-2">
        {task.column === "doing" ? (
          <Button type="button" variant="ghost" className="h-11 px-3" onClick={() => onMove("todo")}>
            Back
          </Button>
        ) : null}
        {task.column === "todo" ? (
          <Button type="button" variant="soft" className="h-11 px-3" onClick={() => onMove("doing")}>
            Start
          </Button>
        ) : null}
        {task.column !== "done" ? (
          <Button type="button" variant="moss" className="h-11 px-3" onClick={() => onMove("done")}>
            Done
          </Button>
        ) : (
          <Button type="button" variant="ghost" className="h-11 px-3" onClick={() => onMove("doing")}>
            Reopen
          </Button>
        )}
        <Button type="button" variant="ghost" className="h-11 px-3" onClick={() => setPicking((value) => !value)}>
          {picking ? "Close" : "Owner"}
        </Button>
        {confirm ? (
          <Button type="button" variant="ghost" className="h-11 px-3 text-honey" onClick={onDelete}>
            Remove
          </Button>
        ) : (
          <Button type="button" variant="ghost" className="h-11 px-3" onClick={() => setConfirm(true)}>
            Delete
          </Button>
        )}
      </div>
    </article>
  );
}
