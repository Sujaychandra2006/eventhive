import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as fieldClass, g as useHive, i as Field, r as Button, s as Pill } from "./router-BR2CHTCZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/volunteers-Clzs9WKg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function VolunteersPage() {
	const volunteers = useHive((state) => state.volunteers);
	const shifts = useHive((state) => state.shifts);
	const events = useHive((state) => state.events);
	const addVolunteer = useHive((state) => state.addVolunteer);
	const deleteVolunteer = useHive((state) => state.deleteVolunteer);
	const [query, setQuery] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [dept, setDept] = (0, import_react.useState)("");
	const [year, setYear] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const filtered = [...volunteers].sort((a, b) => a.name.localeCompare(b.name)).filter((volunteer) => {
		return `${volunteer.name} ${volunteer.dept} ${volunteer.year}`.toLowerCase().includes(query.trim().toLowerCase());
	});
	const save = () => {
		if (!name.trim()) {
			setError("Name is required.");
			return;
		}
		addVolunteer({
			name: name.trim(),
			phone: phone.trim() || "Not shared",
			dept: dept.trim() || "—",
			year: year.trim() || "—"
		});
		setName("");
		setPhone("");
		setDept("");
		setYear("");
		setError("");
		setOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl font-medium text-ink",
					children: "Volunteers"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-muted",
					children: "Names, numbers, and the shifts they actually accepted. A form response is not a confirmation."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					onClick: () => setOpen((value) => !value),
					children: open ? "Close" : "Add volunteer"
				})]
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-3 rounded-lg border border-line bg-surface p-4 sm:grid-cols-2",
				onSubmit: (event) => {
					event.preventDefault();
					save();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							value: name,
							onChange: (event) => setName(event.target.value),
							autoFocus: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Phone",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							value: phone,
							onChange: (event) => setPhone(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Department",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							value: dept,
							onChange: (event) => setDept(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Year",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							value: year,
							onChange: (event) => setYear(event.target.value)
						})
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-honey sm:col-span-2",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							children: "Save volunteer"
						})
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				className: "h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none placeholder:text-muted focus-visible:border-honey sm:max-w-sm",
				placeholder: "Search name or department",
				value: query,
				onChange: (event) => setQuery(event.target.value),
				"aria-label": "Search volunteers"
			}),
			filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-lg border border-line bg-surface p-6 text-sm text-muted",
				children: "No volunteers match that search."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-4 md:grid-cols-2",
				children: filtered.map((volunteer) => {
					const mine = shifts.filter((shift) => shift.volunteerId === volunteer.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-col gap-3 rounded-lg border border-line bg-surface p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-xl font-medium text-ink",
									children: volunteer.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted",
									children: [
										volunteer.dept,
										" · ",
										volunteer.year
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm tabular-nums text-muted",
									children: volunteer.phone
								})
							] }), pendingDelete === volunteer.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "soft",
								onClick: () => deleteVolunteer(volunteer.id),
								children: "Remove"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								onClick: () => setPendingDelete(volunteer.id),
								children: "Remove"
							})]
						}), mine.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Not on a shift yet. Add them from an event."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "flex flex-col gap-2",
							children: mine.map((shift) => {
								const event = events.find((item) => item.id === shift.eventId);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex flex-wrap items-center justify-between gap-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-ink",
										children: [event ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/events/$eventId",
											params: { eventId: event.id },
											className: "font-medium",
											children: event.title
										}) : "Removed event", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted",
											children: [
												" ",
												"· ",
												shift.role,
												" · ",
												shift.slot
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
										tone: shift.status === "confirmed" ? "moss" : "honey",
										children: shift.status === "confirmed" ? "Confirmed" : "Pending"
									})]
								}, shift.id);
							})
						})]
					}, volunteer.id);
				})
			})
		]
	});
}
//#endregion
export { VolunteersPage as component };
