import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link, g as Outlet, p as useRouterState, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Meter, g as useHive, p as STATUS_LABEL, r as Button, s as Pill } from "./router-BR2CHTCZ.mjs";
import { n as formatDay, t as EventDialog } from "./dates-CGvuOfUb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/events-B3htO7EH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EventsRoute() {
	if (useRouterState({ select: (state) => state.location.pathname }).startsWith("/events/")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventsPage, {});
}
function EventsPage() {
	const navigate = useNavigate();
	const events = useHive((state) => state.events);
	const tasks = useHive((state) => state.tasks);
	const shifts = useHive((state) => state.shifts);
	const [query, setQuery] = (0, import_react.useState)("");
	const [creating, setCreating] = (0, import_react.useState)(false);
	const filtered = [...events].sort((a, b) => a.date.localeCompare(b.date)).filter((event) => {
		return `${event.title} ${event.club} ${event.venue}`.toLowerCase().includes(query.trim().toLowerCase());
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl font-medium text-ink",
					children: "Events"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-muted",
					children: "Each event has its own task board and volunteer roster."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					onClick: () => setCreating(true),
					children: "New event"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				className: "h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none placeholder:text-muted focus-visible:border-honey sm:max-w-sm",
				placeholder: "Search title, club, or venue",
				value: query,
				onChange: (event) => setQuery(event.target.value),
				"aria-label": "Search events"
			}),
			filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-lg border border-line bg-surface p-6 text-sm text-muted",
				children: "No events match that search."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-4 md:grid-cols-2",
				children: filtered.map((event) => {
					const mine = tasks.filter((task) => task.eventId === event.id);
					const done = mine.filter((task) => task.column === "done").length;
					const pct = mine.length ? Math.round(done / mine.length * 100) : 0;
					const eventShifts = shifts.filter((shift) => shift.eventId === event.id);
					const confirmed = eventShifts.filter((shift) => shift.status === "confirmed").length;
					const when = formatDay(event.date);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/events/$eventId",
						params: { eventId: event.id },
						className: "flex h-full flex-col gap-4 rounded-lg border border-line bg-surface p-5 transition-colors hover:border-honey",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium uppercase tracking-wide text-muted",
									children: event.club
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-1 font-display text-2xl font-medium text-ink",
									children: event.title
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
									tone: event.status === "wrapped" ? "moss" : event.status === "track" ? "honey" : "muted",
									children: STATUS_LABEL[event.status]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: [
									when.label,
									" · ",
									event.time,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									event.venue,
									" · ",
									event.guests,
									" guests"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "line-clamp-3 text-sm text-ink",
								children: event.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex justify-between text-xs text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "tabular-nums",
									children: [
										done,
										"/",
										mine.length,
										" tasks"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "tabular-nums",
									children: [
										confirmed,
										"/",
										eventShifts.length,
										" shifts confirmed"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
								value: pct,
								moss: event.status === "wrapped"
							})] })
						]
					}) }, event.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventDialog, {
				open: creating,
				onClose: () => setCreating(false),
				onSaved: (id) => navigate({
					to: "/events/$eventId",
					params: { eventId: id }
				})
			})
		]
	});
}
//#endregion
export { EventsRoute as component };
