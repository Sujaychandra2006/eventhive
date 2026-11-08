import { create } from "zustand";

export type Member = {
  id: string;
  name: string;
  role: string;
  club: string;
};

export type EventStatus = "planning" | "track" | "wrapped";

export type EventItem = {
  id: string;
  title: string;
  club: string;
  venue: string;
  date: string;
  time: string;
  guests: number;
  description: string;
  status: EventStatus;
};

export type Column = "todo" | "doing" | "done";

export type Task = {
  id: string;
  eventId: string;
  title: string;
  column: Column;
  assigneeId: string | null;
  priority: "high" | "normal";
  due: string;
};

export type Volunteer = {
  id: string;
  name: string;
  phone: string;
  dept: string;
  year: string;
};

export type Shift = {
  id: string;
  eventId: string;
  volunteerId: string;
  role: string;
  slot: string;
  status: "confirmed" | "pending";
};

export const MEMBERS: Member[] = [
  { id: "m1", name: "Sujay Chandra K", role: "Coordinator", club: "Tech Club" },
  { id: "m2", name: "Sujan S", role: "Logistics", club: "Tech Club" },
  { id: "m3", name: "Shreyas R", role: "Design", club: "Cultural Committee" },
  { id: "m4", name: "Siddhappa Tangadi", role: "Tech", club: "Tech Club" },
  { id: "m5", name: "Srujan T S", role: "Volunteer lead", club: "NSS" },
];

export const SLOTS = ["Morning · 9–12", "Afternoon · 12–4", "Evening · 4–8", "Full day"];

export const SHIFT_ROLES = [
  "Registration",
  "Usher",
  "Stage",
  "Help desk",
  "Refreshments",
  "Floor",
  "First aid",
  "Guide",
];

export const STATUS_LABEL: Record<EventStatus, string> = {
  planning: "Planning",
  track: "On track",
  wrapped: "Wrapped",
};

const SEED_EVENTS: EventItem[] = [
  {
    id: "e1",
    title: "Blood Donation Drive",
    club: "NSS",
    venue: "Health Centre",
    date: "2026-11-15",
    time: "9:00–13:00",
    guests: 150,
    description: "Campus drive with the medical officer on site. Donors need a form, a bed, and juice before they leave.",
    status: "track",
  },
  {
    id: "e2",
    title: "CodeSprint",
    club: "Tech Club",
    venue: "Main Auditorium",
    date: "2026-11-22",
    time: "10:00–18:00",
    guests: 200,
    description: "Eight-hour team contest. Problem set, judges, banners, and a registration desk still need owners.",
    status: "planning",
  },
  {
    id: "e3",
    title: "Aurora Cultural Night",
    club: "Cultural Committee",
    venue: "Open Air Theatre",
    date: "2026-12-05",
    time: "18:00–21:30",
    guests: 800,
    description: "Evening showcase. Stage plot and sound are open, and the usher list is still unconfirmed.",
    status: "planning",
  },
  {
    id: "e4",
    title: "Freshers Lab Walk",
    club: "Tech Club",
    venue: "Block C Labs",
    date: "2026-11-12",
    time: "14:00–16:30",
    guests: 80,
    description: "A short tour for first-years. Mentors walk a fixed route and hand over a welcome kit at the end.",
    status: "track",
  },
];

const SEED_TASKS: Task[] = [
  { id: "t1", eventId: "e1", title: "Confirm the medical officer", column: "done", assigneeId: "m5", priority: "high", due: "2026-11-10" },
  { id: "t2", eventId: "e1", title: "Print donor consent forms", column: "done", assigneeId: "m2", priority: "normal", due: "2026-11-11" },
  { id: "t3", eventId: "e1", title: "Brief the morning volunteers", column: "doing", assigneeId: "m5", priority: "high", due: "2026-11-14" },
  { id: "t4", eventId: "e1", title: "Arrange juice and biscuits", column: "todo", assigneeId: "m2", priority: "normal", due: "2026-11-14" },
  { id: "t5", eventId: "e2", title: "Book the main auditorium", column: "done", assigneeId: "m1", priority: "high", due: "2026-11-08" },
  { id: "t6", eventId: "e2", title: "Draft the problem set", column: "doing", assigneeId: "m4", priority: "high", due: "2026-11-16" },
  { id: "t7", eventId: "e2", title: "Sponsor banners and backdrop", column: "doing", assigneeId: "m3", priority: "normal", due: "2026-11-18" },
  { id: "t8", eventId: "e2", title: "Lock the judging panel", column: "todo", assigneeId: null, priority: "high", due: "2026-11-18" },
  { id: "t9", eventId: "e2", title: "Open the registration form", column: "todo", assigneeId: "m4", priority: "normal", due: "2026-11-14" },
  { id: "t10", eventId: "e2", title: "Order sprint snacks", column: "todo", assigneeId: "m2", priority: "normal", due: "2026-11-20" },
  { id: "t11", eventId: "e3", title: "Draw the stage plot", column: "todo", assigneeId: "m3", priority: "high", due: "2026-11-25" },
  { id: "t12", eventId: "e3", title: "Book the sound vendor", column: "todo", assigneeId: "m2", priority: "high", due: "2026-11-20" },
  { id: "t13", eventId: "e3", title: "Collect the performer call sheet", column: "doing", assigneeId: "m3", priority: "normal", due: "2026-11-28" },
  { id: "t14", eventId: "e3", title: "File the security permission", column: "todo", assigneeId: "m1", priority: "high", due: "2026-11-18" },
  { id: "t15", eventId: "e4", title: "Print the lab route map", column: "done", assigneeId: "m3", priority: "normal", due: "2026-11-08" },
  { id: "t16", eventId: "e4", title: "Pair freshers with mentors", column: "doing", assigneeId: "m1", priority: "high", due: "2026-11-10" },
  { id: "t17", eventId: "e4", title: "Count the welcome kits", column: "todo", assigneeId: "m2", priority: "normal", due: "2026-11-11" },
];

const SEED_VOLUNTEERS: Volunteer[] = [
  { id: "v1", name: "Ananya Rao", phone: "99000 10001", dept: "CSE", year: "3rd year" },
  { id: "v2", name: "Karthik P", phone: "99000 10002", dept: "ECE", year: "2nd year" },
  { id: "v3", name: "Meera Shah", phone: "99000 10003", dept: "MBA", year: "1st year" },
  { id: "v4", name: "Aisha Khan", phone: "99000 10004", dept: "CSE", year: "2nd year" },
  { id: "v5", name: "Dev Patel", phone: "99000 10005", dept: "ISE", year: "3rd year" },
  { id: "v6", name: "Nisha Gowda", phone: "99000 10006", dept: "ECE", year: "4th year" },
  { id: "v7", name: "Rohan Iyer", phone: "99000 10007", dept: "Civil", year: "2nd year" },
  { id: "v8", name: "Fatima S", phone: "99000 10008", dept: "BBA", year: "3rd year" },
  { id: "v9", name: "Priya N", phone: "99000 10009", dept: "CSE", year: "1st year" },
];

const SEED_SHIFTS: Shift[] = [
  { id: "s1", eventId: "e1", volunteerId: "v1", role: "Registration", slot: "Morning · 9–12", status: "confirmed" },
  { id: "s2", eventId: "e1", volunteerId: "v2", role: "Floor", slot: "Morning · 9–12", status: "confirmed" },
  { id: "s3", eventId: "e1", volunteerId: "v3", role: "Refreshments", slot: "Morning · 9–12", status: "pending" },
  { id: "s4", eventId: "e2", volunteerId: "v4", role: "Registration", slot: "Morning · 9–12", status: "confirmed" },
  { id: "s5", eventId: "e2", volunteerId: "v5", role: "Floor", slot: "Full day", status: "pending" },
  { id: "s6", eventId: "e2", volunteerId: "v6", role: "Help desk", slot: "Afternoon · 12–4", status: "confirmed" },
  { id: "s7", eventId: "e3", volunteerId: "v7", role: "Usher", slot: "Evening · 4–8", status: "pending" },
  { id: "s8", eventId: "e3", volunteerId: "v8", role: "Stage", slot: "Evening · 4–8", status: "pending" },
  { id: "s9", eventId: "e4", volunteerId: "v9", role: "Guide", slot: "Afternoon · 12–4", status: "confirmed" },
  { id: "s10", eventId: "e4", volunteerId: "v1", role: "Guide", slot: "Afternoon · 12–4", status: "confirmed" },
];

type Persisted = {
  events: EventItem[];
  tasks: Task[];
  volunteers: Volunteer[];
  shifts: Shift[];
  meId: string;
};

const KEY = "eventhive.v1";

function cloneSeed(): Persisted {
  return {
    events: structuredClone(SEED_EVENTS),
    tasks: structuredClone(SEED_TASKS),
    volunteers: structuredClone(SEED_VOLUNTEERS),
    shifts: structuredClone(SEED_SHIFTS),
    meId: "m1",
  };
}

function isPersisted(value: unknown): value is Persisted {
  if (!value || typeof value !== "object") return false;
  const row = value as Persisted;
  return (
    Array.isArray(row.events) &&
    Array.isArray(row.tasks) &&
    Array.isArray(row.volunteers) &&
    Array.isArray(row.shifts) &&
    typeof row.meId === "string"
  );
}

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function personName(id: string | null, volunteers: Volunteer[]) {
  if (!id) return "Unassigned";
  const member = MEMBERS.find((item) => item.id === id);
  if (member) return member.name;
  return volunteers.find((item) => item.id === id)?.name ?? "Removed";
}

export function memberById(id: string) {
  return MEMBERS.find((item) => item.id === id) ?? MEMBERS[0];
}

type HiveState = Persisted & {
  booted: boolean;
  boot: () => void;
  setMe: (id: string) => void;
  reset: () => void;
  addEvent: (input: Omit<EventItem, "id">) => string;
  updateEvent: (id: string, patch: Partial<Omit<EventItem, "id">>) => void;
  deleteEvent: (id: string) => void;
  addTask: (input: Omit<Task, "id">) => void;
  updateTask: (id: string, patch: Partial<Omit<Task, "id" | "eventId">>) => void;
  moveTask: (id: string, column: Column) => void;
  takeTask: (id: string) => void;
  deleteTask: (id: string) => void;
  addVolunteer: (input: Omit<Volunteer, "id">) => string;
  deleteVolunteer: (id: string) => void;
  addShift: (input: Omit<Shift, "id">) => void;
  setShiftStatus: (id: string, status: Shift["status"]) => void;
  deleteShift: (id: string) => void;
};

export const useHive = create<HiveState>((set, get) => {
  const save = () => {
    const { events, tasks, volunteers, shifts, meId } = get();
    localStorage.setItem(KEY, JSON.stringify({ events, tasks, volunteers, shifts, meId }));
  };

  const patch = (recipe: (state: Persisted) => Partial<Persisted>) => {
    const { events, tasks, volunteers, shifts, meId } = get();
    set(recipe({ events, tasks, volunteers, shifts, meId }));
    save();
  };

  return {
    ...cloneSeed(),
    booted: false,
    boot: () => {
      if (get().booted) return;
      try {
        const raw = localStorage.getItem(KEY);
        if (raw) {
          const parsed: unknown = JSON.parse(raw);
          if (isPersisted(parsed)) {
            const meId = MEMBERS.some((member) => member.id === parsed.meId) ? parsed.meId : "m1";
            set({ ...parsed, meId, booted: true });
            return;
          }
        }
      } catch {
        /* keep the sample board */
      }
      set({ booted: true });
    },
    setMe: (id) => {
      if (!MEMBERS.some((member) => member.id === id)) return;
      set({ meId: id });
      save();
    },
    reset: () => {
      localStorage.removeItem(KEY);
      set({ ...cloneSeed(), booted: true });
    },
    addEvent: (input) => {
      const id = uid("e");
      patch((state) => ({ events: [...state.events, { ...input, id }] }));
      return id;
    },
    updateEvent: (id, next) => {
      patch((state) => ({
        events: state.events.map((event) => (event.id === id ? { ...event, ...next } : event)),
      }));
    },
    deleteEvent: (id) => {
      patch((state) => ({
        events: state.events.filter((event) => event.id !== id),
        tasks: state.tasks.filter((task) => task.eventId !== id),
        shifts: state.shifts.filter((shift) => shift.eventId !== id),
      }));
    },
    addTask: (input) => {
      patch((state) => ({ tasks: [...state.tasks, { ...input, id: uid("t") }] }));
    },
    updateTask: (id, next) => {
      patch((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? { ...task, ...next } : task)),
      }));
    },
    moveTask: (id, column) => {
      patch((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? { ...task, column } : task)),
      }));
    },
    takeTask: (id) => {
      const meId = get().meId;
      patch((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id
            ? { ...task, assigneeId: meId, column: task.column === "todo" ? "doing" : task.column }
            : task,
        ),
      }));
    },
    deleteTask: (id) => {
      patch((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) }));
    },
    addVolunteer: (input) => {
      const id = uid("v");
      patch((state) => ({ volunteers: [...state.volunteers, { ...input, id }] }));
      return id;
    },
    deleteVolunteer: (id) => {
      patch((state) => ({
        volunteers: state.volunteers.filter((volunteer) => volunteer.id !== id),
        shifts: state.shifts.filter((shift) => shift.volunteerId !== id),
        tasks: state.tasks.map((task) => (task.assigneeId === id ? { ...task, assigneeId: null } : task)),
      }));
    },
    addShift: (input) => {
      patch((state) => ({ shifts: [...state.shifts, { ...input, id: uid("s") }] }));
    },
    setShiftStatus: (id, status) => {
      patch((state) => ({
        shifts: state.shifts.map((shift) => (shift.id === id ? { ...shift, status } : shift)),
      }));
    },
    deleteShift: (id) => {
      patch((state) => ({ shifts: state.shifts.filter((shift) => shift.id !== id) }));
    },
  };
});
