import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as fieldClass, g as useHive, i as Field, o as Modal, p as STATUS_LABEL, r as Button } from "./router-BR2CHTCZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dates-CGvuOfUb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EMPTY = {
	title: "",
	club: "",
	venue: "",
	date: "2026-12-12",
	time: "10:00–13:00",
	guests: "80",
	description: "",
	status: "planning"
};
function EventDialog({ open, onClose, initial, onSaved }) {
	const addEvent = useHive((state) => state.addEvent);
	const updateEvent = useHive((state) => state.updateEvent);
	const [form, setForm] = (0, import_react.useState)(EMPTY);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setError("");
		if (initial) setForm({
			title: initial.title,
			club: initial.club,
			venue: initial.venue,
			date: initial.date,
			time: initial.time,
			guests: String(initial.guests),
			description: initial.description,
			status: initial.status
		});
		else setForm(EMPTY);
	}, [open, initial]);
	const set = (key) => (value) => setForm((current) => ({
		...current,
		[key]: value
	}));
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
			status: form.status
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
		open,
		title: initial ? "Edit event" : "New event",
		onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "flex flex-col gap-4",
			onSubmit: (event) => {
				event.preventDefault();
				save();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Title",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: fieldClass,
						value: form.title,
						onChange: (event) => set("title")(event.target.value),
						autoFocus: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Club",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							value: form.club,
							onChange: (event) => set("club")(event.target.value)
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Venue",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							value: form.venue,
							onChange: (event) => set("venue")(event.target.value)
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Date",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							type: "date",
							value: form.date,
							onChange: (event) => set("date")(event.target.value)
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Time",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							value: form.time,
							onChange: (event) => set("time")(event.target.value)
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Expected guests",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							inputMode: "numeric",
							value: form.guests,
							onChange: (event) => set("guests")(event.target.value)
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Status",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: fieldClass,
							value: form.status,
							onChange: (event) => set("status")(event.target.value),
							children: Object.keys(STATUS_LABEL).map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: status,
								children: STATUS_LABEL[status]
							}, status))
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "What has to happen",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "min-h-24 w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus-visible:border-honey",
						value: form.description,
						onChange: (event) => set("description")(event.target.value)
					})
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-honey",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						onClick: onClose,
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						children: initial ? "Save changes" : "Create event"
					})]
				})
			]
		})
	});
}
var MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
];
function asDate(iso) {
	const [y, m, d] = iso.split("-").map(Number);
	return new Date(y, (m ?? 1) - 1, d ?? 1);
}
function formatDay(iso) {
	const date = asDate(iso);
	return {
		month: MONTHS[date.getMonth()] ?? "",
		day: date.getDate(),
		label: `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`
	};
}
function todayIso() {
	const date = /* @__PURE__ */ new Date();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${date.getFullYear()}-${month}-${day}`;
}
function relativeDay(today, iso) {
	const diff = Math.round((asDate(iso).getTime() - asDate(today).getTime()) / 864e5);
	if (diff === 0) return "Today";
	if (diff === 1) return "Tomorrow";
	if (diff === -1) return "Yesterday";
	if (diff > 1) return `In ${diff} days`;
	return `${Math.abs(diff)} days ago`;
}
//#endregion
export { todayIso as i, formatDay as n, relativeDay as r, EventDialog as t };
