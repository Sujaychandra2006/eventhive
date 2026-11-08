const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function asDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function formatDay(iso: string) {
  const date = asDate(iso);
  return {
    month: MONTHS[date.getMonth()] ?? "",
    day: date.getDate(),
    label: `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`,
  };
}

export function todayIso() {
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function relativeDay(today: string, iso: string) {
  const diff = Math.round((asDate(iso).getTime() - asDate(today).getTime()) / 86_400_000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff === -1) return "Yesterday";
  if (diff > 1) return `In ${diff} days`;
  return `${Math.abs(diff)} days ago`;
}
