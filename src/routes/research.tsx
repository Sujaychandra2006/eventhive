import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/research")({ component: ResearchPage });

const PERSONAS = [
  {
    name: "Ananya, club coordinator",
    quote: "I find out a task is done only when someone messages me at midnight.",
    need: "One owner per task, and a board that shows Doing versus Done without asking.",
  },
  {
    name: "Rohan, first-time volunteer",
    quote: "I filled a form and never heard which gate I was standing on.",
    need: "A shift with a role, a time, and a clear confirmed or still-pending state.",
  },
  {
    name: "Meera, the person who reports status",
    quote: "Before every review I rebuild the plan in a spreadsheet.",
    need: "A shared overview: what is loose, who is overloaded, which event is behind.",
  },
];

const STEPS = [
  "Start on Overview. In Still loose, the judging panel has no owner and Aurora's ushers are not confirmed.",
  "Press Take it on Lock the judging panel. It is assigned to whoever you are viewing as, and moves into Doing.",
  "Press Confirm next to Rohan Iyer or Fatima S. The waiting count drops.",
  "Open CodeSprint. On the task board, press Done on Draft the problem set. Drag works too.",
  "Open the Volunteers tab on that event and confirm Dev Patel, or add a classmate.",
  "Press New event and add something your examiner will recognize from campus.",
  "Switch Viewing as to Sujan S, open any event, and press Mine. Logistics is carrying the most open tasks.",
  "If you have edited the sample and want a clean run, use Restore sample board in the sidebar.",
];

function ResearchPage() {
  return (
    <div className="flex max-w-3xl flex-col gap-10">
      <header>
        <p className="text-sm font-medium text-honey">UX notes for the viva</p>
        <h1 className="mt-1 font-display text-4xl font-medium text-ink">Why the board is shaped this way.</h1>
        <p className="mt-3 text-muted">
          The synopsis asks for short research with students who run events, then personas, then a prototype.
          These three personas are the design stand-ins. Replace the quotes with your own interviews if the
          lab expects primary notes.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-2xl font-medium text-ink">Personas</h2>
        {PERSONAS.map((persona) => (
          <article key={persona.name} className="rounded-lg border border-line bg-surface p-5">
            <h3 className="font-display text-xl font-medium text-ink">{persona.name}</h3>
            <p className="mt-2 text-ink">“{persona.quote}”</p>
            <p className="mt-2 text-sm text-muted">{persona.need}</p>
          </article>
        ))}
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-2xl font-medium text-ink">What the synopsis complained about</h2>
        {[
          ["Task ownership is unclear", "Every card has one owner. Unassigned work shows up under Still loose."],
          ["Volunteer details get lost", "Each person keeps a phone, department, shift, and confirmed or pending state."],
          ["No shared picture of progress", "Overview counts open tasks, confirmed shifts, and who is carrying the week."],
          ["The plan lives in five tools", "Create the event, move the tasks, confirm the people — one board."],
        ].map(([problem, answer]) => (
          <div key={problem} className="rounded-lg border border-line bg-surface p-4">
            <p className="font-medium text-ink">{problem}</p>
            <p className="mt-1 text-sm text-muted">{answer}</p>
          </div>
        ))}
      </section>

      <section id="expo" className="flex flex-col gap-3">
        <h2 className="font-display text-2xl font-medium text-ink">Expo walkthrough</h2>
        <p className="text-sm text-muted">About four minutes. Click in this order.</p>
        <ol className="flex flex-col gap-3">
          {STEPS.map((step, index) => (
            <li key={step} className="flex gap-3 rounded-lg border border-line bg-surface p-4">
              <span className="font-display text-xl tabular-nums text-honey">{index + 1}</span>
              <p className="text-sm text-ink">{step}</p>
            </li>
          ))}
        </ol>
        <p className="text-sm text-muted">
          The sample board is shared in this browser, so two people on one laptop see the same edits. It is
          not a separate login per student. If an examiner asks about JWT from the synopsis, say accounts are
          the next layer — this cut is the working desk they can click.
        </p>
        <Link to="/" className="inline-flex h-11 items-center text-sm font-medium text-honey">
          Back to the overview
        </Link>
      </section>

      <section>
        <h2 className="font-display text-2xl font-medium text-ink">Team</h2>
        <p className="mt-2 text-sm text-muted">Batch 6 · Lab batch G1</p>
        <ul className="mt-3 text-sm text-ink">
          <li>Sujay Chandra K — coordinator view</li>
          <li>Sujan S — logistics</li>
          <li>Shreyas R — design</li>
          <li>Siddhappa Tangadi — tech</li>
          <li>Srujan T S — volunteer lead</li>
        </ul>
      </section>
    </div>
  );
}
