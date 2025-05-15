import { defineCliConfig } from "sanity/cli";

// ts-prune-ignore-next
export default defineCliConfig({
	studioHost: "coucool",
	api: {
		projectId: "4durckeb",
		dataset: "staging",
	},
	graphql: [
		{
			id: "production",
			workspace: "production",
			source: "production",
		},
		{
			id: "staging",
			workspace: "staging",
			source: "staging",
		},
	],
});
