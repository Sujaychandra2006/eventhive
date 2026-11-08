import { useEffect, useState } from "react";
import { Button, Field, Modal, fieldClass } from "@/components/ui";
import { STATUS_LABEL, useHive, type EventItem, type EventStatus } from "@/lib/hive";

const EMPTY = {
  title: "",
  club: "",
  venue: "",
  date: "2026-12-12",
  time: "10:00–13:00",
  guests: "80",
  description: "",
  status: "planning" as EventStatus,
};

export function EventDialog({
  open,
  onClose,
  initial,
  onSaved,
}: {
  open: boolean;
  onClose: () => void;
  initial?: EventItem | null;
  onSaved?: (id: string) => void;
}) {
  const addEvent = useHive((state) => state.addEvent);
  const updateEvent = useHive((state) => state.updateEvent);
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setError("");
    if (initial) {
      setForm({
        title: initial.title,
        club: initial.club,
        venue: initial.venue,
        date: initial.date,
        time: initial.time,
        guests: String(initial.guests),
        description: initial.description,
        status: initial.status,
      });
    } else {
      setForm(EMPTY);
    }
  }, [open, initial]);

  const set = (key: keyof typeof EMPTY) => (value: string) => setForm((current) => ({ ...current, [key]: value }));

  const save = () => {
    if (!form.title.trim() || !form.club.trim() || !form.venue.trim() || !form.date) {
      setError("Title, club, venue, and date are required.");
      return;
    }
    const guests = Number(form.guests);
    const payload = {
      title: form.title.trim(),
      club: form.club.trim(),
      venue: form.venue.trim(),
      date: form.date,
      time: form.time.trim() || "TBD",
      guests: Number.isFinite(guests) && guests > 0 ? Math.round(guests) : 1,
      description: form.description.trim(),
      status: form.status,
    };
    if (initial) {
      updateEvent(initial.id, payload);
      onSaved?.(initial.id);
    } else {
      const id = addEvent(payload);
      onSaved?.(id);
    }
    onClose();
  };

  return (
    <Modal open={open} title={initial ? "Edit event" : "New event"} onClose={onClose}>
      <form
        className="flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          save();
        }}
      >
        <Field label="Title">
          <input className={fieldClass} value={form.title} onChange={(event) => set("title")(event.target.value)} autoFocus />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Club">
            <input className={fieldClass} value={form.club} onChange={(event) => set("club")(event.target.value)} />
          </Field>
          <Field label="Venue">
            <input className={fieldClass} value={form.venue} onChange={(event) => set("venue")(event.target.value)} />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Date">
            <input className={fieldClass} type="date" value={form.date} onChange={(event) => set("date")(event.target.value)} />
          </Field>
          <Field label="Time">
            <input className={fieldClass} value={form.time} onChange={(event) => set("time")(event.target.value)} />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Expected guests">
            <input
              className={fieldClass}
              inputMode="numeric"
              value={form.guests}
              onChange={(event) => set("guests")(event.target.value)}
            />
          </Field>
          <Field label="Status">
            <select
              className={fieldClass}
              value={form.status}
              onChange={(event) => set("status")(event.target.value)}
            >
              {(Object.keys(STATUS_LABEL) as EventStatus[]).map((status) => (
                <option key={status} value={status}>
                  {STATUS_LABEL[status]}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="What has to happen">
          <textarea
            className="min-h-24 w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus-visible:border-honey"
            value={form.description}
            onChange={(event) => set("description")(event.target.value)}
          />
        </Field>
        {error ? <p className="text-sm text-honey">{error}</p> : null}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{initial ? "Save changes" : "Create event"}</Button>
        </div>
      </form>
    </Modal>
  );
}
