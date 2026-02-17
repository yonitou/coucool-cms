import { defineCliConfig } from "sanity/cli";

// ts-prune-ignore-next
export default defineCliConfig({
	api: {
		dataset: "staging",
		projectId: "4durckeb",
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
