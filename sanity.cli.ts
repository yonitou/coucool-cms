import { defineCliConfig } from "sanity/cli";

// ts-prune-ignore-next
export default defineCliConfig({
	api: {
		dataset: "staging",
		projectId: "4durckeb",
	},
	deployment: {
		appId: "1cecbbc8f236f2ea88fb524d",
	},
	graphql: [
		{
			id: "production",
			source: "production",
			workspace: "production",
		},
		{
			id: "staging",
			source: "staging",
			workspace: "staging",
		},
	],
	studioHost: "coucool",
});
