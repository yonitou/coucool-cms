import { defineConfig, definePlugin } from "sanity";
import { deskTool } from "sanity/desk";
import { colorInput } from "@sanity/color-input";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { CogIcon, MasterDetailIcon, RocketIcon, UserIcon } from "@sanity/icons";

const sharedConfig = definePlugin({
	name: "sharedConfig",
	plugins: [
		colorInput(),
		deskTool({
			structure: (S, context) =>
				S.list()
					.title("Contenu")
					.items([
						S.listItem()
							.title("Paramètres événement")
							.child(S.document().schemaType("siteSettings").documentId("siteSettings"))
							.icon(CogIcon),
						orderableDocumentListDeskItem({
							type: "section",
							S,
							context,
							title: "Sections",
							icon: () => <MasterDetailIcon onResize={undefined} onResizeCapture={undefined} />,
						}),
					]),
		}),
		visionTool(),
	],
	schema: {
		types: schemaTypes,
	},
});

// ts-prune-ignore-next
export default defineConfig([
	{
		name: "production",
		title: "Coucool - Public",
		icon: () => <RocketIcon onResize={undefined} onResizeCapture={undefined} />,
		projectId: "4durckeb",
		dataset: "production",
		basePath: "/production",
		subtitle: "production",
		plugins: [sharedConfig()],
	},
	{
		name: "staging",
		title: "Coucool - Test",
		icon: () => <UserIcon onResize={undefined} onResizeCapture={undefined} />,
		projectId: "4durckeb",
		dataset: "staging",
		basePath: "/staging",
		subtitle: "staging",
		plugins: [sharedConfig()],
	},
]);
