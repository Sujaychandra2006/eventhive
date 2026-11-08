import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Meter, g as useHive, h as personName, m as memberById, p as STATUS_LABEL, r as Button, s as Pill, u as MEMBERS } from "./router-BR2CHTCZ.mjs";
import { i as todayIso, n as formatDay, r as relativeDay, t as EventDialog } from "./dates-CGvuOfUb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-QG4GfPZY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Overview() {
	const navigate = useNavigate();
	const events = useHive((state) => state.events);
	const tasks = useHive((state) => state.tasks);
	const volunteers = useHive((state) => state.volunteers);
	const shifts = useHive((state) => state.shifts);
	const meId = useHive((state) => state.meId);
	const takeTask = useHive((state) => state.takeTask);
	const setShiftStatus = useHive((state) => state.setShiftStatus);
	const [creating, setCreating] = (0, import_react.useState)(false);
	const [today, setToday] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setToday(todayIso());
	}, []);
	const ordered = [...events].sort((a, b) => a.date.localeCompare(b.date));
	const openTasks = tasks.filter((task) => task.column !== "done");
	const confirmed = shifts.filter((shift) => shift.status === "confirmed").length;
	const pending = shifts.filter((shift) => shift.status === "pending");
	const looseTasks = openTasks.filter((task) => !task.assigneeId);
	const me = memberById(meId);
	const workload = MEMBERS.map((member) => ({
		...member,
		open: openTasks.filter((task) => task.assigneeId === member.id).length
	})).sort((a, b) => b.open - a.open);
	const maxLoad = Math.max(1, ...workload.map((member) => member.open));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-honey",
							children: "Campus event desk"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-1 font-display text-4xl font-medium text-ink",
							children: "The whole fest, on one board."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-muted",
							children: [me.name.split(" ")[0], ", tasks have owners and volunteers have shifts. This replaces the group chat, the sheet, and the form that nobody updates."]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					onClick: () => setCreating(true),
					children: "New event"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4",
				children: [
					["Events", events.length],
					["Open tasks", openTasks.length],
					["Shifts confirmed", confirmed],
					["Still waiting", pending.length]
				].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-surface px-4 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-muted",
						children: label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "font-display text-3xl tabular-nums text-ink",
						children: value
					})]
				}, String(label)))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "flex flex-col gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-medium text-ink",
						children: "Coming up"
					}), ordered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-lg border border-line bg-surface p-6 text-sm text-muted",
						children: "No events yet. Add the first one and the board fills in around it."
					}) : ordered.map((event) => {
						const mine = tasks.filter((task) => task.eventId === event.id);
						const done = mine.filter((task) => task.column === "done").length;
						const pct = mine.length ? Math.round(done / mine.length * 100) : 0;
						const eventShifts = shifts.filter((shift) => shift.eventId === event.id);
						const eventConfirmed = eventShifts.filter((shift) => shift.status === "confirmed").length;
						const when = formatDay(event.date);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "flex gap-4 rounded-lg border border-line bg-surface p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex w-16 shrink-0 flex-col items-center justify-center rounded-md bg-paper py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs uppercase text-muted",
									children: when.month
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-2xl tabular-nums text-ink",
									children: when.day
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/events/$eventId",
											params: { eventId: event.id },
											className: "font-display text-xl font-medium text-ink",
											children: event.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
											tone: event.status === "wrapped" ? "moss" : event.status === "track" ? "honey" : "muted",
											children: STATUS_LABEL[event.status]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm text-muted",
										children: [
											event.club,
											" · ",
											event.venue,
											today ? ` · ${relativeDay(today, event.date)}` : ""
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "min-w-0 flex-1",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
												value: pct,
												moss: event.status === "wrapped"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "shrink-0 text-xs tabular-nums text-muted",
											children: [
												done,
												"/",
												mine.length,
												" tasks · ",
												eventConfirmed,
												"/",
												eventShifts.length,
												" shifts"
											]
										})]
									})
								]
							})]
						}, event.id);
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-lg border border-line bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-medium text-ink",
							children: "Still loose"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Unowned tasks and volunteers who have not confirmed."
						}),
						looseTasks.length === 0 && pending.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-sm text-muted",
							children: "Nothing is hanging. Enjoy it while it lasts."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-4",
							children: [looseTasks.map((task) => {
								const event = events.find((item) => item.id === task.eventId);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start justify-between gap-3 border-t border-line py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium text-ink",
											children: task.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted",
											children: [event?.title ?? "Event", " · no owner"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "soft",
										className: "shrink-0",
										onClick: () => takeTask(task.id),
										children: "Take it"
									})]
								}, task.id);
							}), pending.map((shift) => {
								const event = events.find((item) => item.id === shift.eventId);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start justify-between gap-3 border-t border-line py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium text-ink",
											children: personName(shift.volunteerId, volunteers)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted",
											children: [
												event?.title ?? "Event",
												" · ",
												shift.role,
												" · not confirmed"
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "moss",
										className: "shrink-0",
										onClick: () => setShiftStatus(shift.id, "confirmed"),
										children: "Confirm"
									})]
								}, shift.id);
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-medium text-ink",
					children: "Who is carrying the week"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Open tasks only. Reassign from an event board if one person is stuck with the list."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5",
					children: workload.map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-lg border border-line bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-ink",
								children: member.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: member.role
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-display text-2xl tabular-nums text-ink",
								children: member.open
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, { value: member.open / maxLoad * 100 })
							})
						]
					}, member.id))
				})
			] }),
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
export { Overview as component };
