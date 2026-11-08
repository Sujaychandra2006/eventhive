import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/research-DKGz9nVz.js
var import_jsx_runtime = require_jsx_runtime();
var PERSONAS = [
	{
		name: "Ananya, club coordinator",
		quote: "I find out a task is done only when someone messages me at midnight.",
		need: "One owner per task, and a board that shows Doing versus Done without asking."
	},
	{
		name: "Rohan, first-time volunteer",
		quote: "I filled a form and never heard which gate I was standing on.",
		need: "A shift with a role, a time, and a clear confirmed or still-pending state."
	},
	{
		name: "Meera, the person who reports status",
		quote: "Before every review I rebuild the plan in a spreadsheet.",
		need: "A shared overview: what is loose, who is overloaded, which event is behind."
	}
];
var STEPS = [
	"Start on Overview. In Still loose, the judging panel has no owner and Aurora's ushers are not confirmed.",
	"Press Take it on Lock the judging panel. It is assigned to whoever you are viewing as, and moves into Doing.",
	"Press Confirm next to Rohan Iyer or Fatima S. The waiting count drops.",
	"Open CodeSprint. On the task board, press Done on Draft the problem set. Drag works too.",
	"Open the Volunteers tab on that event and confirm Dev Patel, or add a classmate.",
	"Press New event and add something your examiner will recognize from campus.",
	"Switch Viewing as to Sujan S, open any event, and press Mine. Logistics is carrying the most open tasks.",
	"If you have edited the sample and want a clean run, use Restore sample board in the sidebar."
];
function ResearchPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex max-w-3xl flex-col gap-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-honey",
					children: "UX notes for the viva"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-4xl font-medium text-ink",
					children: "Why the board is shaped this way."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted",
					children: "The synopsis asks for short research with students who run events, then personas, then a prototype. These three personas are the design stand-ins. Replace the quotes with your own interviews if the lab expects primary notes."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-medium text-ink",
					children: "Personas"
				}), PERSONAS.map((persona) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-lg border border-line bg-surface p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl font-medium text-ink",
							children: persona.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-ink",
							children: [
								"“",
								persona.quote,
								"”"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: persona.need
						})
					]
				}, persona.name))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-medium text-ink",
					children: "What the synopsis complained about"
				}), [
					["Task ownership is unclear", "Every card has one owner. Unassigned work shows up under Still loose."],
					["Volunteer details get lost", "Each person keeps a phone, department, shift, and confirmed or pending state."],
					["No shared picture of progress", "Overview counts open tasks, confirmed shifts, and who is carrying the week."],
					["The plan lives in five tools", "Create the event, move the tasks, confirm the people — one board."]
				].map(([problem, answer]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-line bg-surface p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-ink",
						children: problem
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: answer
					})]
				}, problem))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "expo",
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-medium text-ink",
						children: "Expo walkthrough"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "About four minutes. Click in this order."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "flex flex-col gap-3",
						children: STEPS.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3 rounded-lg border border-line bg-surface p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-xl tabular-nums text-honey",
								children: index + 1
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-ink",
								children: step
							})]
						}, step))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "The sample board is shared in this browser, so two people on one laptop see the same edits. It is not a separate login per student. If an examiner asks about JWT from the synopsis, say accounts are the next layer — this cut is the working desk they can click."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex h-11 items-center text-sm font-medium text-honey",
						children: "Back to the overview"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-medium text-ink",
					children: "Team"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Batch 6 · Lab batch G1"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 text-sm text-ink",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Sujay Chandra K — coordinator view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Sujan S — logistics" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Shreyas R — design" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Siddhappa Tangadi — tech" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Srujan T S — volunteer lead" })
					]
				})
			] })
		]
	});
}
//#endregion
export { ResearchPage as component };
