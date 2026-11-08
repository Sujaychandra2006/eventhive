import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Meter, c as fieldClass, d as SHIFT_ROLES, f as SLOTS, g as useHive, h as personName, i as Field, l as cn, n as Route, p as STATUS_LABEL, r as Button, s as Pill, u as MEMBERS } from "./router-BR2CHTCZ.mjs";
import { n as formatDay, t as EventDialog } from "./dates-CGvuOfUb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/events._eventId-ruizFOYr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ShiftPanel({ eventId }) {
	const volunteers = useHive((state) => state.volunteers);
	const shifts = useHive((state) => state.shifts).filter((shift) => shift.eventId === eventId);
	const addVolunteer = useHive((state) => state.addVolunteer);
	const addShift = useHive((state) => state.addShift);
	const setShiftStatus = useHive((state) => state.setShiftStatus);
	const deleteShift = useHive((state) => state.deleteShift);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [volunteerId, setVolunteerId] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [dept, setDept] = (0, import_react.useState)("");
	const [year, setYear] = (0, import_react.useState)("");
	const [role, setRole] = (0, import_react.useState)(SHIFT_ROLES[0]);
	const [slot, setSlot] = (0, import_react.useState)(SLOTS[0]);
	const [error, setError] = (0, import_react.useState)("");
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
				year: year.trim() || "—"
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
			status: "pending"
		});
		setOpen(false);
		setVolunteerId("");
		setName("");
		setPhone("");
		setDept("");
		setYear("");
		setError("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					onClick: () => setOpen((value) => !value),
					children: open ? "Close" : "Add to this event"
				})
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-3 rounded-lg border border-line bg-surface p-4 sm:grid-cols-2",
				onSubmit: (event) => {
					event.preventDefault();
					submit();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Volunteer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: fieldClass,
							value: volunteerId,
							onChange: (event) => setVolunteerId(event.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "new",
									children: "New volunteer"
								}),
								volunteers.map((volunteer) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: volunteer.id,
									children: [
										volunteer.name,
										" · ",
										volunteer.dept
									]
								}, volunteer.id))
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Role",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: fieldClass,
							value: role,
							onChange: (event) => setRole(event.target.value),
							children: SHIFT_ROLES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))
						})
					}),
					creating ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: fieldClass,
								value: name,
								onChange: (event) => setName(event.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Phone",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: fieldClass,
								value: phone,
								onChange: (event) => setPhone(event.target.value),
								placeholder: "99000 00000"
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
						})
					] }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Shift",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: fieldClass,
							value: slot,
							onChange: (event) => setSlot(event.target.value),
							children: SLOTS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))
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
							children: "Save shift"
						})
					})
				]
			}) : null,
			shifts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-lg border border-line bg-surface p-6 text-sm text-muted",
				children: "No volunteers on this event yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-3",
				children: shifts.map((shift) => {
					const volunteer = volunteers.find((item) => item.id === shift.volunteerId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-col gap-3 rounded-lg border border-line bg-surface p-4 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium text-ink",
									children: volunteer?.name ?? "Removed volunteer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted",
									children: [
										shift.role,
										" · ",
										shift.slot,
										volunteer ? ` · ${volunteer.dept} ${volunteer.year}` : ""
									]
								}),
								volunteer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm tabular-nums text-muted",
									children: volunteer.phone
								}) : null
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
									tone: shift.status === "confirmed" ? "moss" : "honey",
									children: shift.status === "confirmed" ? "Confirmed" : "Pending"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: shift.status === "confirmed" ? "ghost" : "moss",
									onClick: () => setShiftStatus(shift.id, shift.status === "confirmed" ? "pending" : "confirmed"),
									children: shift.status === "confirmed" ? "Mark pending" : "Confirm"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "ghost",
									onClick: () => deleteShift(shift.id),
									children: "Remove"
								})
							]
						})]
					}, shift.id);
				})
			})
		]
	});
}
var COLUMNS = [
	{
		id: "todo",
		label: "To do"
	},
	{
		id: "doing",
		label: "Doing"
	},
	{
		id: "done",
		label: "Done"
	}
];
function TaskBoard({ eventId }) {
	const allTasks = useHive((state) => state.tasks);
	const volunteers = useHive((state) => state.volunteers);
	const tasks = allTasks.filter((task) => task.eventId === eventId);
	const meId = useHive((state) => state.meId);
	const addTask = useHive((state) => state.addTask);
	const updateTask = useHive((state) => state.updateTask);
	const moveTask = useHive((state) => state.moveTask);
	const deleteTask = useHive((state) => state.deleteTask);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [title, setTitle] = (0, import_react.useState)("");
	const [assigneeId, setAssigneeId] = (0, import_react.useState)("");
	const [priority, setPriority] = (0, import_react.useState)("normal");
	const [due, setDue] = (0, import_react.useState)("2026-11-20");
	const [dragOver, setDragOver] = (0, import_react.useState)(null);
	const people = [...MEMBERS.map((member) => ({
		id: member.id,
		label: `${member.name} · ${member.role}`
	})), ...volunteers.map((volunteer) => ({
		id: volunteer.id,
		label: `${volunteer.name} · volunteer`
	}))];
	const visible = tasks.filter((task) => {
		if (filter === "mine") return task.assigneeId === meId;
		if (filter === "open") return task.column !== "done";
		return true;
	});
	const submit = () => {
		if (!title.trim()) return;
		addTask({
			eventId,
			title: title.trim(),
			column: "todo",
			assigneeId: assigneeId || null,
			priority,
			due
		});
		setTitle("");
		setAssigneeId("");
		setPriority("normal");
		setOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					children: [
						["all", "All"],
						["mine", "Mine"],
						["open", "Open"]
					].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setFilter(id),
						className: cn("h-11 rounded-full px-4 text-sm font-medium", filter === id ? "bg-ink text-surface" : "bg-surface text-ink border border-line"),
						children: label
					}, id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					onClick: () => setOpen((value) => !value),
					children: open ? "Close" : "Add task"
				})]
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-3 rounded-lg border border-line bg-surface p-4 sm:grid-cols-2",
				onSubmit: (event) => {
					event.preventDefault();
					submit();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Task",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							value: title,
							onChange: (event) => setTitle(event.target.value),
							autoFocus: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Owner",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: fieldClass,
							value: assigneeId,
							onChange: (event) => setAssigneeId(event.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Unassigned"
							}), people.map((person) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: person.id,
								children: person.label
							}, person.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Due",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							type: "date",
							value: due,
							onChange: (event) => setDue(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Priority",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: fieldClass,
							value: priority,
							onChange: (event) => setPriority(event.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "normal",
								children: "Normal"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "high",
								children: "High"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							children: "Add to the board"
						})
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Drag a card between columns, or use the buttons. Mine follows whoever you are viewing as."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: COLUMNS.map((column) => {
					const cards = visible.filter((task) => task.column === column.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: cn("flex flex-col gap-3 rounded-lg border bg-surface p-3", dragOver === column.id ? "border-honey" : "border-line"),
						onDragOver: (event) => {
							event.preventDefault();
							setDragOver(column.id);
						},
						onDragLeave: () => setDragOver((current) => current === column.id ? null : current),
						onDrop: (event) => {
							event.preventDefault();
							const id = event.dataTransfer.getData("text/plain");
							if (id) moveTask(id, column.id);
							setDragOver(null);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
								className: "flex items-center justify-between px-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-medium text-ink",
									children: column.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm tabular-nums text-muted",
									children: cards.length
								})]
							}),
							cards.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "px-1 py-6 text-sm text-muted",
								children: "Nothing here."
							}) : null,
							cards.map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskCard, {
								task,
								owner: personName(task.assigneeId, volunteers),
								people,
								onMove: (next) => moveTask(task.id, next),
								onAssign: (assignee) => updateTask(task.id, { assigneeId: assignee }),
								onDelete: () => deleteTask(task.id)
							}, task.id))
						]
					}, column.id);
				})
			})
		]
	});
}
function TaskCard({ task, owner, people, onMove, onAssign, onDelete }) {
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	const [picking, setPicking] = (0, import_react.useState)(false);
	const due = formatDay(task.due);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		draggable: true,
		onDragStart: (event) => event.dataTransfer.setData("text/plain", task.id),
		className: "flex flex-col gap-3 rounded-md border border-line bg-paper p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-sm font-medium text-ink",
					children: task.title
				}), task.priority === "high" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
					tone: "honey",
					children: "High"
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted",
				children: [
					owner,
					" · due ",
					due.label
				]
			}),
			picking ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				className: fieldClass,
				"aria-label": `Owner for ${task.title}`,
				value: task.assigneeId ?? "",
				onChange: (event) => {
					onAssign(event.target.value || null);
					setPicking(false);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "Unassigned"
				}), people.map((person) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: person.id,
					children: person.label
				}, person.id))]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					task.column === "doing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						className: "h-11 px-3",
						onClick: () => onMove("todo"),
						children: "Back"
					}) : null,
					task.column === "todo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "soft",
						className: "h-11 px-3",
						onClick: () => onMove("doing"),
						children: "Start"
					}) : null,
					task.column !== "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "moss",
						className: "h-11 px-3",
						onClick: () => onMove("done"),
						children: "Done"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						className: "h-11 px-3",
						onClick: () => onMove("doing"),
						children: "Reopen"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						className: "h-11 px-3",
						onClick: () => setPicking((value) => !value),
						children: picking ? "Close" : "Owner"
					}),
					confirm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						className: "h-11 px-3 text-honey",
						onClick: onDelete,
						children: "Remove"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						className: "h-11 px-3",
						onClick: () => setConfirm(true),
						children: "Delete"
					})
				]
			})
		]
	});
}
function EventPage() {
	const { eventId } = Route.useParams();
	const navigate = useNavigate();
	const events = useHive((state) => state.events);
	const allTasks = useHive((state) => state.tasks);
	const allShifts = useHive((state) => state.shifts);
	const event = events.find((item) => item.id === eventId);
	const tasks = allTasks.filter((task) => task.eventId === eventId);
	const shifts = allShifts.filter((shift) => shift.eventId === eventId);
	const deleteEvent = useHive((state) => state.deleteEvent);
	const [tab, setTab] = (0, import_react.useState)("tasks");
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [confirmDelete, setConfirmDelete] = (0, import_react.useState)(false);
	if (!event) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-line bg-surface p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-medium text-ink",
			children: "That event is not on the board."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/events",
			className: "mt-4 inline-flex h-11 items-center text-sm font-medium text-honey",
			children: "Back to events"
		})]
	});
	const done = tasks.filter((task) => task.column === "done").length;
	const pct = tasks.length ? Math.round(done / tasks.length * 100) : 0;
	const confirmed = shifts.filter((shift) => shift.status === "confirmed").length;
	const when = formatDay(event.date);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/events",
				className: "text-sm font-medium text-honey",
				children: "All events"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-3xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-honey",
									children: event.club
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "mt-1 font-display text-4xl font-medium text-ink",
									children: event.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-muted",
									children: [
										when.label,
										" · ",
										event.time,
										" · ",
										event.venue,
										" · ",
										event.guests,
										" guests"
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
								tone: event.status === "wrapped" ? "moss" : event.status === "track" ? "honey" : "muted",
								children: STATUS_LABEL[event.status]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								onClick: () => setEditing(true),
								children: "Edit"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-3xl text-ink",
						children: event.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex justify-between text-sm text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums",
								children: [
									done,
									"/",
									tasks.length,
									" tasks done"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums",
								children: [
									confirmed,
									"/",
									shifts.length,
									" shifts confirmed"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							value: pct,
							moss: event.status === "wrapped"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 border-b border-line",
				children: [["tasks", "Tasks"], ["volunteers", "Volunteers"]].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab(id),
					className: cn("h-11 border-b-2 px-4 text-sm font-medium", tab === id ? "border-honey text-ink" : "border-transparent text-muted"),
					children: label
				}, id))
			}),
			tab === "tasks" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskBoard, { eventId: event.id }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShiftPanel, { eventId: event.id }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-line pt-4",
				children: confirmDelete ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-ink",
							children: [
								"Delete ",
								event.title,
								"? Tasks and shifts go with it."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							onClick: () => {
								deleteEvent(event.id);
								navigate({ to: "/events" });
							},
							children: "Delete event"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							onClick: () => setConfirmDelete(false),
							children: "Cancel"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					onClick: () => setConfirmDelete(true),
					children: "Delete this event"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventDialog, {
				open: editing,
				initial: event,
				onClose: () => setEditing(false)
			})
		]
	});
}
//#endregion
export { EventPage as component };
