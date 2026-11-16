export type Suggestion = {
  title: string;
  priority: "high" | "normal";
};

const PACKS: { match: RegExp; tasks: Suggestion[]; roles: string[] }[] = [
  {
    match: /blood|donat|nss|health/i,
    tasks: [
      { title: "Confirm the medical officer", priority: "high" },
      { title: "Print donor consent forms", priority: "high" },
      { title: "Arrange juice and biscuits", priority: "normal" },
      { title: "Brief the floor volunteers", priority: "normal" },
      { title: "Set up the recovery area", priority: "normal" },
    ],
    roles: ["Registration", "Floor", "Refreshments", "First aid"],
  },
  {
    match: /code|sprint|hack|tech|contest/i,
    tasks: [
      { title: "Draft the problem set", priority: "high" },
      { title: "Lock the judging panel", priority: "high" },
      { title: "Open the registration form", priority: "high" },
      { title: "Book the lab or hall", priority: "normal" },
      { title: "Order sprint snacks", priority: "normal" },
    ],
    roles: ["Registration", "Help desk", "Floor", "Guide"],
  },
  {
    match: /cultural|aurora|night|concert|fest|stage/i,
    tasks: [
      { title: "Draw the stage plot", priority: "high" },
      { title: "Book the sound vendor", priority: "high" },
      { title: "Collect the performer call sheet", priority: "normal" },
      { title: "File the security permission", priority: "high" },
      { title: "Print usher badges", priority: "normal" },
    ],
    roles: ["Usher", "Stage", "Registration", "Help desk"],
  },
  {
    match: /fresher|lab walk|tour|orient/i,
    tasks: [
      { title: "Print the route map", priority: "normal" },
      { title: "Pair freshers with mentors", priority: "high" },
      { title: "Count the welcome kits", priority: "normal" },
      { title: "Brief the guides", priority: "high" },
    ],
    roles: ["Guide", "Registration", "Floor"],
  },
];

const FALLBACK: Suggestion[] = [
  { title: "Confirm the venue booking", priority: "high" },
  { title: "Open the volunteer form", priority: "high" },
  { title: "Assign an owner for publicity", priority: "normal" },
  { title: "Share the run-of-show", priority: "normal" },
];

export function suggestFor(title: string, description: string) {
  const text = `${title} ${description}`;
  const pack = PACKS.find((item) => item.match.test(text));
  return {
    tasks: pack?.tasks ?? FALLBACK,
    roles: pack?.roles ?? ["Registration", "Floor", "Help desk"],
    reason: pack
      ? "Matched this event to a known campus pattern."
      : "No exact pattern. These are the usual openers.",
  };
}
