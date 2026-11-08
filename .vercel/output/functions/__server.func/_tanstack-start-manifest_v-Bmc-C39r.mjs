//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-Bmc-C39r.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "/workspace/src/routes/__root.tsx",
		children: [
			"/",
			"/events",
			"/research",
			"/volunteers"
		],
		preloads: ["/assets/index-D4q7Pzke.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-D4q7Pzke.js"
		} }]
	},
	"/": {
		filePath: "/workspace/src/routes/index.tsx",
		children: void 0,
		preloads: ["/assets/routes-DpeXThJV.js", "/assets/dates-DlByscbS.js"]
	},
	"/events": {
		filePath: "/workspace/src/routes/events.tsx",
		children: ["/events/$eventId"],
		preloads: ["/assets/events-C2-lUsLe.js", "/assets/dates-DlByscbS.js"]
	},
	"/research": {
		filePath: "/workspace/src/routes/research.tsx",
		children: void 0,
		preloads: ["/assets/research-C84Cync8.js"]
	},
	"/volunteers": {
		filePath: "/workspace/src/routes/volunteers.tsx",
		children: void 0,
		preloads: ["/assets/volunteers-C3U58eAB.js"]
	},
	"/events/$eventId": {
		filePath: "/workspace/src/routes/events.$eventId.tsx",
		children: void 0,
		preloads: ["/assets/events._eventId-ed5lT5jG.js"]
	}
} });
//#endregion
export { tsrStartManifest };
