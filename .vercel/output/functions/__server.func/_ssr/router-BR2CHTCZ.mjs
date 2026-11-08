import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, S as useRouter, Y as require_react, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as BookOpen, i as CalendarDays, n as TriangleAlert, r as LayoutDashboard, t as Users } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BR2CHTCZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function Mark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className,
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M16 3.5 27.5 10v12L16 28.5 4.5 22V10Z",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.8"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M16 11.2 21 14v5.6L16 22.4 11 19.6V14Z",
			fill: "currentColor"
		})]
	});
}
var MEMBERS = [
	{
		id: "m1",
		name: "Sujay Chandra K",
		role: "Coordinator",
		club: "Tech Club"
	},
	{
		id: "m2",
		name: "Sujan S",
		role: "Logistics",
		club: "Tech Club"
	},
	{
		id: "m3",
		name: "Shreyas R",
		role: "Design",
		club: "Cultural Committee"
	},
	{
		id: "m4",
		name: "Siddhappa Tangadi",
		role: "Tech",
		club: "Tech Club"
	},
	{
		id: "m5",
		name: "Srujan T S",
		role: "Volunteer lead",
		club: "NSS"
	}
];
var SLOTS = [
	"Morning · 9–12",
	"Afternoon · 12–4",
	"Evening · 4–8",
	"Full day"
];
var SHIFT_ROLES = [
	"Registration",
	"Usher",
	"Stage",
	"Help desk",
	"Refreshments",
	"Floor",
	"First aid",
	"Guide"
];
var STATUS_LABEL = {
	planning: "Planning",
	track: "On track",
	wrapped: "Wrapped"
};
var SEED_EVENTS = [
	{
		id: "e1",
		title: "Blood Donation Drive",
		club: "NSS",
		venue: "Health Centre",
		date: "2026-11-15",
		time: "9:00–13:00",
		guests: 150,
		description: "Campus drive with the medical officer on site. Donors need a form, a bed, and juice before they leave.",
		status: "track"
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
		status: "planning"
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
		status: "planning"
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
		status: "track"
	}
];
var SEED_TASKS = [
	{
		id: "t1",
		eventId: "e1",
		title: "Confirm the medical officer",
		column: "done",
		assigneeId: "m5",
		priority: "high",
		due: "2026-11-10"
	},
	{
		id: "t2",
		eventId: "e1",
		title: "Print donor consent forms",
		column: "done",
		assigneeId: "m2",
		priority: "normal",
		due: "2026-11-11"
	},
	{
		id: "t3",
		eventId: "e1",
		title: "Brief the morning volunteers",
		column: "doing",
		assigneeId: "m5",
		priority: "high",
		due: "2026-11-14"
	},
	{
		id: "t4",
		eventId: "e1",
		title: "Arrange juice and biscuits",
		column: "todo",
		assigneeId: "m2",
		priority: "normal",
		due: "2026-11-14"
	},
	{
		id: "t5",
		eventId: "e2",
		title: "Book the main auditorium",
		column: "done",
		assigneeId: "m1",
		priority: "high",
		due: "2026-11-08"
	},
	{
		id: "t6",
		eventId: "e2",
		title: "Draft the problem set",
		column: "doing",
		assigneeId: "m4",
		priority: "high",
		due: "2026-11-16"
	},
	{
		id: "t7",
		eventId: "e2",
		title: "Sponsor banners and backdrop",
		column: "doing",
		assigneeId: "m3",
		priority: "normal",
		due: "2026-11-18"
	},
	{
		id: "t8",
		eventId: "e2",
		title: "Lock the judging panel",
		column: "todo",
		assigneeId: null,
		priority: "high",
		due: "2026-11-18"
	},
	{
		id: "t9",
		eventId: "e2",
		title: "Open the registration form",
		column: "todo",
		assigneeId: "m4",
		priority: "normal",
		due: "2026-11-14"
	},
	{
		id: "t10",
		eventId: "e2",
		title: "Order sprint snacks",
		column: "todo",
		assigneeId: "m2",
		priority: "normal",
		due: "2026-11-20"
	},
	{
		id: "t11",
		eventId: "e3",
		title: "Draw the stage plot",
		column: "todo",
		assigneeId: "m3",
		priority: "high",
		due: "2026-11-25"
	},
	{
		id: "t12",
		eventId: "e3",
		title: "Book the sound vendor",
		column: "todo",
		assigneeId: "m2",
		priority: "high",
		due: "2026-11-20"
	},
	{
		id: "t13",
		eventId: "e3",
		title: "Collect the performer call sheet",
		column: "doing",
		assigneeId: "m3",
		priority: "normal",
		due: "2026-11-28"
	},
	{
		id: "t14",
		eventId: "e3",
		title: "File the security permission",
		column: "todo",
		assigneeId: "m1",
		priority: "high",
		due: "2026-11-18"
	},
	{
		id: "t15",
		eventId: "e4",
		title: "Print the lab route map",
		column: "done",
		assigneeId: "m3",
		priority: "normal",
		due: "2026-11-08"
	},
	{
		id: "t16",
		eventId: "e4",
		title: "Pair freshers with mentors",
		column: "doing",
		assigneeId: "m1",
		priority: "high",
		due: "2026-11-10"
	},
	{
		id: "t17",
		eventId: "e4",
		title: "Count the welcome kits",
		column: "todo",
		assigneeId: "m2",
		priority: "normal",
		due: "2026-11-11"
	}
];
var SEED_VOLUNTEERS = [
	{
		id: "v1",
		name: "Ananya Rao",
		phone: "99000 10001",
		dept: "CSE",
		year: "3rd year"
	},
	{
		id: "v2",
		name: "Karthik P",
		phone: "99000 10002",
		dept: "ECE",
		year: "2nd year"
	},
	{
		id: "v3",
		name: "Meera Shah",
		phone: "99000 10003",
		dept: "MBA",
		year: "1st year"
	},
	{
		id: "v4",
		name: "Aisha Khan",
		phone: "99000 10004",
		dept: "CSE",
		year: "2nd year"
	},
	{
		id: "v5",
		name: "Dev Patel",
		phone: "99000 10005",
		dept: "ISE",
		year: "3rd year"
	},
	{
		id: "v6",
		name: "Nisha Gowda",
		phone: "99000 10006",
		dept: "ECE",
		year: "4th year"
	},
	{
		id: "v7",
		name: "Rohan Iyer",
		phone: "99000 10007",
		dept: "Civil",
		year: "2nd year"
	},
	{
		id: "v8",
		name: "Fatima S",
		phone: "99000 10008",
		dept: "BBA",
		year: "3rd year"
	},
	{
		id: "v9",
		name: "Priya N",
		phone: "99000 10009",
		dept: "CSE",
		year: "1st year"
	}
];
var SEED_SHIFTS = [
	{
		id: "s1",
		eventId: "e1",
		volunteerId: "v1",
		role: "Registration",
		slot: "Morning · 9–12",
		status: "confirmed"
	},
	{
		id: "s2",
		eventId: "e1",
		volunteerId: "v2",
		role: "Floor",
		slot: "Morning · 9–12",
		status: "confirmed"
	},
	{
		id: "s3",
		eventId: "e1",
		volunteerId: "v3",
		role: "Refreshments",
		slot: "Morning · 9–12",
		status: "pending"
	},
	{
		id: "s4",
		eventId: "e2",
		volunteerId: "v4",
		role: "Registration",
		slot: "Morning · 9–12",
		status: "confirmed"
	},
	{
		id: "s5",
		eventId: "e2",
		volunteerId: "v5",
		role: "Floor",
		slot: "Full day",
		status: "pending"
	},
	{
		id: "s6",
		eventId: "e2",
		volunteerId: "v6",
		role: "Help desk",
		slot: "Afternoon · 12–4",
		status: "confirmed"
	},
	{
		id: "s7",
		eventId: "e3",
		volunteerId: "v7",
		role: "Usher",
		slot: "Evening · 4–8",
		status: "pending"
	},
	{
		id: "s8",
		eventId: "e3",
		volunteerId: "v8",
		role: "Stage",
		slot: "Evening · 4–8",
		status: "pending"
	},
	{
		id: "s9",
		eventId: "e4",
		volunteerId: "v9",
		role: "Guide",
		slot: "Afternoon · 12–4",
		status: "confirmed"
	},
	{
		id: "s10",
		eventId: "e4",
		volunteerId: "v1",
		role: "Guide",
		slot: "Afternoon · 12–4",
		status: "confirmed"
	}
];
var KEY = "eventhive.v1";
function cloneSeed() {
	return {
		events: structuredClone(SEED_EVENTS),
		tasks: structuredClone(SEED_TASKS),
		volunteers: structuredClone(SEED_VOLUNTEERS),
		shifts: structuredClone(SEED_SHIFTS),
		meId: "m1"
	};
}
function isPersisted(value) {
	if (!value || typeof value !== "object") return false;
	const row = value;
	return Array.isArray(row.events) && Array.isArray(row.tasks) && Array.isArray(row.volunteers) && Array.isArray(row.shifts) && typeof row.meId === "string";
}
function uid(prefix) {
	return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}
function personName(id, volunteers) {
	if (!id) return "Unassigned";
	const member = MEMBERS.find((item) => item.id === id);
	if (member) return member.name;
	return volunteers.find((item) => item.id === id)?.name ?? "Removed";
}
function memberById(id) {
	return MEMBERS.find((item) => item.id === id) ?? MEMBERS[0];
}
var useHive = create((set, get) => {
	const save = () => {
		const { events, tasks, volunteers, shifts, meId } = get();
		localStorage.setItem(KEY, JSON.stringify({
			events,
			tasks,
			volunteers,
			shifts,
			meId
		}));
	};
	const patch = (recipe) => {
		const { events, tasks, volunteers, shifts, meId } = get();
		set(recipe({
			events,
			tasks,
			volunteers,
			shifts,
			meId
		}));
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
					const parsed = JSON.parse(raw);
					if (isPersisted(parsed)) {
						const meId = MEMBERS.some((member) => member.id === parsed.meId) ? parsed.meId : "m1";
						set({
							...parsed,
							meId,
							booted: true
						});
						return;
					}
				}
			} catch {}
			set({ booted: true });
		},
		setMe: (id) => {
			if (!MEMBERS.some((member) => member.id === id)) return;
			set({ meId: id });
			save();
		},
		reset: () => {
			localStorage.removeItem(KEY);
			set({
				...cloneSeed(),
				booted: true
			});
		},
		addEvent: (input) => {
			const id = uid("e");
			patch((state) => ({ events: [...state.events, {
				...input,
				id
			}] }));
			return id;
		},
		updateEvent: (id, next) => {
			patch((state) => ({ events: state.events.map((event) => event.id === id ? {
				...event,
				...next
			} : event) }));
		},
		deleteEvent: (id) => {
			patch((state) => ({
				events: state.events.filter((event) => event.id !== id),
				tasks: state.tasks.filter((task) => task.eventId !== id),
				shifts: state.shifts.filter((shift) => shift.eventId !== id)
			}));
		},
		addTask: (input) => {
			patch((state) => ({ tasks: [...state.tasks, {
				...input,
				id: uid("t")
			}] }));
		},
		updateTask: (id, next) => {
			patch((state) => ({ tasks: state.tasks.map((task) => task.id === id ? {
				...task,
				...next
			} : task) }));
		},
		moveTask: (id, column) => {
			patch((state) => ({ tasks: state.tasks.map((task) => task.id === id ? {
				...task,
				column
			} : task) }));
		},
		takeTask: (id) => {
			const meId = get().meId;
			patch((state) => ({ tasks: state.tasks.map((task) => task.id === id ? {
				...task,
				assigneeId: meId,
				column: task.column === "todo" ? "doing" : task.column
			} : task) }));
		},
		deleteTask: (id) => {
			patch((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) }));
		},
		addVolunteer: (input) => {
			const id = uid("v");
			patch((state) => ({ volunteers: [...state.volunteers, {
				...input,
				id
			}] }));
			return id;
		},
		deleteVolunteer: (id) => {
			patch((state) => ({
				volunteers: state.volunteers.filter((volunteer) => volunteer.id !== id),
				shifts: state.shifts.filter((shift) => shift.volunteerId !== id),
				tasks: state.tasks.map((task) => task.assigneeId === id ? {
					...task,
					assigneeId: null
				} : task)
			}));
		},
		addShift: (input) => {
			patch((state) => ({ shifts: [...state.shifts, {
				...input,
				id: uid("s")
			}] }));
		},
		setShiftStatus: (id, status) => {
			patch((state) => ({ shifts: state.shifts.map((shift) => shift.id === id ? {
				...shift,
				status
			} : shift) }));
		},
		deleteShift: (id) => {
			patch((state) => ({ shifts: state.shifts.filter((shift) => shift.id !== id) }));
		}
	};
});
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Button({ variant = "primary", className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn("inline-flex h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-colors disabled:opacity-50", {
			primary: "bg-honey text-surface hover:opacity-90",
			soft: "bg-honey-soft text-honey hover:opacity-90",
			moss: "bg-moss-soft text-moss hover:opacity-90",
			ghost: "bg-transparent text-ink hover:bg-paper"
		}[variant], className),
		...props
	});
}
var fieldClass = "h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none transition-colors placeholder:text-muted focus-visible:border-honey";
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex flex-col gap-1.5 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-medium text-ink",
			children: label
		}), children]
	});
}
function Pill({ tone, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", {
			honey: "bg-honey-soft text-honey",
			moss: "bg-moss-soft text-moss",
			muted: "bg-paper text-muted"
		}[tone]),
		children
	});
}
function Meter({ value, moss = false }) {
	const width = Math.max(0, Math.min(100, value));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-1.5 overflow-hidden rounded-full bg-paper",
		role: "progressbar",
		"aria-valuenow": width,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-full", moss ? "bg-moss" : "bg-honey"),
			style: { width: `${width}%` }
		})
	});
}
function Modal({ open, title, onClose, children }) {
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (event) => {
			if (event.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onClose]);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-3 sm:items-center",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "dialog-title",
			className: "max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-line bg-surface p-5",
			onClick: (event) => event.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "dialog-title",
					className: "font-display text-2xl font-medium text-ink",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 px-3 text-sm text-muted",
					onClick: onClose,
					children: "Close"
				})]
			}), children]
		})
	});
}
var NAV = [
	{
		href: "/",
		label: "Overview",
		icon: LayoutDashboard
	},
	{
		href: "/events",
		label: "Events",
		icon: CalendarDays
	},
	{
		href: "/volunteers",
		label: "Volunteers",
		icon: Users
	},
	{
		href: "/research",
		label: "Research",
		icon: BookOpen
	}
];
function isActive(path, href) {
	if (href === "/") return path === "/";
	return path === href || path.startsWith(`${href}/`);
}
function Shell({ children }) {
	const path = useRouterState({ select: (state) => state.location.pathname });
	const boot = useHive((state) => state.boot);
	const meId = useHive((state) => state.meId);
	const setMe = useHive((state) => state.setMe);
	const reset = useHive((state) => state.reset);
	const [armed, setArmed] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		boot();
	}, [boot]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen bg-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-line bg-surface lg:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex h-16 items-center gap-2.5 px-5 text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-7 text-honey" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl font-medium",
						children: "EventHive"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex flex-1 flex-col gap-1 px-3",
					children: NAV.map((item) => {
						const Icon = item.icon;
						const active = isActive(path, item.href);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.href,
							"aria-current": active ? "page" : void 0,
							className: cn("flex h-11 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors", active ? "bg-honey-soft text-honey" : "text-ink hover:bg-paper"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-4",
								"aria-hidden": "true"
							}), item.label]
						}, item.href);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-line p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Batch 6 · Lab G1"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-2 h-11 text-left text-sm text-honey",
							onClick: () => {
								if (!armed) {
									setArmed(true);
									return;
								}
								reset();
								setArmed(false);
							},
							children: armed ? "Click again to restore" : "Restore sample board"
						}),
						armed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "h-11 text-sm text-muted",
							onClick: () => setArmed(false),
							children: "Cancel"
						}) : null
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-20 border-b border-line bg-surface lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-14 items-center justify-between px-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-2 text-ink",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-6 text-honey" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg font-medium",
							children: "EventHive"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 px-2 text-sm text-muted",
						onClick: () => {
							if (!armed) {
								setArmed(true);
								return;
							}
							reset();
							setArmed(false);
						},
						children: armed ? "Confirm restore" : "Restore"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "grid grid-cols-4 border-t border-line",
					children: NAV.map((item) => {
						const Icon = item.icon;
						const active = isActive(path, item.href);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.href,
							"aria-current": active ? "page" : void 0,
							className: cn("flex h-14 flex-col items-center justify-center gap-1 text-xs font-medium", active ? "text-honey" : "text-muted"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-4",
								"aria-hidden": "true"
							}), item.label]
						}, item.href);
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Same board for the whole team. Switch who you are viewing as."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 font-medium text-ink",
							children: "Viewing as"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: cn(fieldClass, "sm:w-72"),
							value: meId,
							onChange: (event) => setMe(event.target.value),
							children: MEMBERS.map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: member.id,
								children: [
									member.name,
									" · ",
									member.role
								]
							}, member.id))
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children })]
			})]
		})]
	});
}
var styles_default = "/assets/styles-CJnihLcm.css";
var Route$5 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "EventHive" },
			{
				name: "description",
				content: "Plan campus events, assign tasks, and coordinate volunteers on one shared board."
			},
			{
				name: "theme-color",
				content: "#8a3d0c"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,560;9..144,650&family=Outfit:wght@400;500;600&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$4 = () => import("./routes-QG4GfPZY.mjs");
var Route$4 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./events-B3htO7EH.mjs");
var Route$3 = createFileRoute("/events")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./research-DKGz9nVz.mjs");
var Route$2 = createFileRoute("/research")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./volunteers-Clzs9WKg.mjs");
var Route$1 = createFileRoute("/volunteers")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./events._eventId-ruizFOYr.mjs");
var Route = createFileRoute("/events/$eventId")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$4.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$5
});
var EventsRoute = Route$3.update({
	id: "/events",
	path: "/events",
	getParentRoute: () => Route$5
});
var ResearchRoute = Route$2.update({
	id: "/research",
	path: "/research",
	getParentRoute: () => Route$5
});
var VolunteersRoute = Route$1.update({
	id: "/volunteers",
	path: "/volunteers",
	getParentRoute: () => Route$5
});
var EventsRouteChildren = { EventsEventIdRoute: Route.update({
	id: "/$eventId",
	path: "/$eventId",
	getParentRoute: () => EventsRoute
}) };
var rootRouteChildren = {
	IndexRoute,
	EventsRoute: EventsRoute._addFileChildren(EventsRouteChildren),
	ResearchRoute,
	VolunteersRoute
};
var routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { Meter as a, fieldClass as c, SHIFT_ROLES as d, SLOTS as f, useHive as g, personName as h, Field as i, cn as l, memberById as m, Route as n, Modal as o, STATUS_LABEL as p, Button as r, Pill as s, router_exports as t, MEMBERS as u };
