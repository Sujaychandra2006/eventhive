import { useState } from "react";
import { Button, Field, Pill, fieldClass } from "@/components/ui";
import { SHIFT_ROLES, SLOTS, useHive } from "@/lib/hive";

export function ShiftPanel({ eventId }: { eventId: string }) {
  const volunteers = useHive((state) => state.volunteers);
  const allShifts = useHive((state) => state.shifts);
  const shifts = allShifts.filter((shift) => shift.eventId === eventId);
  const addVolunteer = useHive((state) => state.addVolunteer);
  const addShift = useHive((state) => state.addShift);
  const setShiftStatus = useHive((state) => state.setShiftStatus);
  const deleteShift = useHive((state) => state.deleteShift);
  const [open, setOpen] = useState(false);
  const [volunteerId, setVolunteerId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dept, setDept] = useState("");
  const [year, setYear] = useState("");
  const [role, setRole] = useState(SHIFT_ROLES[0]);
  const [slot, setSlot] = useState(SLOTS[0]);
  const [error, setError] = useState("");

  const creating = volunteerId === "new";

  const submit = () => {
    let id = volunteerId;
    if (creating) {
      if (!name.trim()) {
        setError("A new volunteer needs a name.");
        return;
      }
      id = addVolunteer({
        name: name.trim(),
        phone: phone.trim() || "Not shared",
        dept: dept.trim() || "—",
        year: year.trim() || "—",
      });
    } else if (!id) {
      setError("Pick a volunteer, or add a new one.");
      return;
    }
    addShift({
      eventId,
      volunteerId: id,
      role,
      slot,
      status: "pending",
    });
    setOpen(false);
    setVolunteerId("");
    setName("");
    setPhone("");
    setDept("");
    setYear("");
    setError("");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button type="button" onClick={() => setOpen((value) => !value)}>
          {open ? "Close" : "Add to this event"}
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
          <Field label="Volunteer">
            <select className={fieldClass} value={volunteerId} onChange={(event) => setVolunteerId(event.target.value)}>
              <option value="">Select</option>
              <option value="new">New volunteer</option>
              {volunteers.map((volunteer) => (
                <option key={volunteer.id} value={volunteer.id}>
                  {volunteer.name} · {volunteer.dept}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Role">
            <select className={fieldClass} value={role} onChange={(event) => setRole(event.target.value)}>
              {SHIFT_ROLES.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>
          {creating ? (
            <>
              <Field label="Name">
                <input className={fieldClass} value={name} onChange={(event) => setName(event.target.value)} />
              </Field>
              <Field label="Phone">
                <input className={fieldClass} value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="99000 00000" />
              </Field>
              <Field label="Department">
                <input className={fieldClass} value={dept} onChange={(event) => setDept(event.target.value)} />
              </Field>
              <Field label="Year">
                <input className={fieldClass} value={year} onChange={(event) => setYear(event.target.value)} />
              </Field>
            </>
          ) : null}
          <Field label="Shift">
            <select className={fieldClass} value={slot} onChange={(event) => setSlot(event.target.value)}>
              {SLOTS.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>
          {error ? <p className="text-sm text-honey sm:col-span-2">{error}</p> : null}
          <div className="sm:col-span-2">
            <Button type="submit">Save shift</Button>
          </div>
        </form>
      ) : null}

      {shifts.length === 0 ? (
        <p className="rounded-lg border border-line bg-surface p-6 text-sm text-muted">No volunteers on this event yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {shifts.map((shift) => {
            const volunteer = volunteers.find((item) => item.id === shift.volunteerId);
            return (
              <li key={shift.id} className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="font-medium text-ink">{volunteer?.name ?? "Removed volunteer"}</p>
                  <p className="text-sm text-muted">
                    {shift.role} · {shift.slot}
                    {volunteer ? ` · ${volunteer.dept} ${volunteer.year}` : ""}
                  </p>
                  {volunteer ? <p className="text-sm tabular-nums text-muted">{volunteer.phone}</p> : null}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Pill tone={shift.status === "confirmed" ? "moss" : "honey"}>
                    {shift.status === "confirmed" ? "Confirmed" : "Pending"}
                  </Pill>
                  <Button
                    type="button"
                    variant={shift.status === "confirmed" ? "ghost" : "moss"}
                    onClick={() => setShiftStatus(shift.id, shift.status === "confirmed" ? "pending" : "confirmed")}
                  >
                    {shift.status === "confirmed" ? "Mark pending" : "Confirm"}
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => deleteShift(shift.id)}>
                    Remove
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
