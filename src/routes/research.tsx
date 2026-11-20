import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/research")({ component: ResearchPage });

const PERSONAS = [
  {
    name: "Ananya",
    role: "Club coordinator",
    quote: "I only find out a task is done when someone messages me at midnight.",
    need: "One owner per task, and a board that shows Doing versus Done without asking.",
  },
  {
    name: "Rohan",
    role: "First-time volunteer",
    quote: "I filled a form and never heard which gate I was standing on.",
    need: "A shift with a role, a time, and a clear confirmed or still-pending state.",
  },
  {
    name: "Meera",
    role: "The person who reports status",
    quote: "Before every review I rebuild the plan in a spreadsheet.",
    need: "A shared overview: what is loose, who is overloaded, which event is behind.",
  },
];

const FINDINGS = [
  {
    problem: "Task ownership is unclear",
    answer: "Every card has one owner. Unassigned work shows up under Still loose.",
  },
  {
    problem: "Volunteer details get lost",
    answer: "Each person keeps a phone, department, shift, and confirmed or pending state.",
  },
  {
    problem: "No shared picture of progress",
    answer: "Overview counts open tasks, confirmed shifts, and who is carrying the week.",
  },
  {
    problem: "The plan lives in five tools",
    answer: "Create the event, move the tasks, confirm the people — one board.",
  },
];

const STEPS = [
  "Start on Overview. In Still loose, the judging panel has no owner and Aurora's ushers are not confirmed.",
  "Press Take it on Lock the judging panel. It is assigned to the person selected in Viewing as.",
  "Press Confirm next to a waiting volunteer. The waiting count drops.",
  "Open CodeSprint. On the task board, press Done on a card, or drag it across.",
  "Open the Volunteers tab and confirm a shift, or add a name.",
  "Press New event and add one from campus.",
  "Switch Viewing as to another teammate and open Mine to see their open tasks.",
];

function ResearchPage() {
  return (
    <div className="flex max-w-3xl flex-col gap-12">
      <header>
        <p className="text-sm font-medium text-honey">Design research</p>
        <h1 className="mt-1 font-display text-4xl font-medium text-ink">Why the board looks like this.</h1>
        <p className="mt-3 max-w-xl text-muted">
          Campus events run across WhatsApp, Excel, and Google Forms. We talked with coordinators, volunteers,
          and the people who report status, then shaped the board around what they kept losing.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-2xl font-medium text-ink">Personas</h2>
        <div className="grid gap-3">
          {PERSONAS.map((persona) => (
            <article key={persona.name} className="rounded-lg border border-line bg-surface p-5">
              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="font-display text-xl font-medium text-ink">{persona.name}</h3>
                <span className="text-sm text-muted">{persona.role}</span>
              </div>
              <p className="mt-3 text-ink">“{persona.quote}”</p>
              <p className="mt-2 text-sm text-muted">{persona.need}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-2xl font-medium text-ink">What we found</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {FINDINGS.map((item) => (
            <div key={item.problem} className="rounded-lg border border-line bg-surface p-4">
              <p className="font-medium text-ink">{item.problem}</p>
              <p className="mt-1 text-sm text-muted">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-2xl font-medium text-ink">How to walk the board</h2>
        <p className="text-sm text-muted">About four minutes. Click in this order.</p>
        <ol className="flex flex-col gap-3">
          {STEPS.map((step, index) => (
            <li key={step} className="flex gap-3 rounded-lg border border-line bg-surface p-4">
              <span className="font-display text-xl tabular-nums text-honey">{index + 1}</span>
              <p className="text-sm text-ink">{step}</p>
            </li>
          ))}
        </ol>
        <Link to="/" className="inline-flex h-11 items-center text-sm font-medium text-honey">
          Back to the overview
        </Link>
      </section>

      <section>
        <h2 className="font-display text-2xl font-medium text-ink">Team</h2>
        <p className="mt-2 text-sm text-muted">Batch 6 · Lab batch G1</p>
        <ul className="mt-3 grid gap-1 text-sm text-ink sm:grid-cols-2">
          <li>Sujay Chandra K — coordinator</li>
          <li>Sujan S — logistics</li>
          <li>Shreyas R — design</li>
          <li>Siddhappa Tangadi — tech</li>
          <li>Srujan T S — volunteer lead</li>
        </ul>
      </section>
    </div>
  );
}
