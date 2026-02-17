import { colorInput } from "@sanity/color-input";
import { CogIcon, ColorWheelIcon, MasterDetailIcon, RocketIcon } from "@sanity/icons";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { defineConfig, definePlugin } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./schemas";

const sharedConfig = definePlugin({
	document: {
		actions: (previous, context) => {
			const actionsWithoutUnpublish = previous.filter((a) => a.action !== "unpublish");

			return context.schemaType === "siteSettings"
				? actionsWithoutUnpublish.filter(
						(originalAction) => originalAction.action !== "delete" && originalAction.action !== "duplicate",
					)
				: actionsWithoutUnpublish;
		},
		newDocumentOptions: (previous, { creationContext }) => {
			if (creationContext.type === "global") {
				return previous.filter((templateItem) => templateItem.templateId !== "siteSettings");
			}

			return previous;
		},
	},
	name: "sharedConfig",
	plugins: [
		colorInput(),
		structureTool({
			structure: (S, context) =>
				S.list()
					.title("Contenu")
					.items([
						S.listItem()
							.title("Paramètres événement")
							.child(S.document().schemaType("siteSettings").documentId("siteSettings"))
							.icon(CogIcon),
						orderableDocumentListDeskItem({
							context,
							icon: MasterDetailIcon,
							S,
							title: "Sections",
							type: "section",
						}),
						...S.documentTypeListItems().filter(
							(listItem) => !["section", "siteSettings"].includes(listItem.getId() as string),
						),
					]),
		}),
	],

	schema: {
		types: schemaTypes,
	},
});

// ts-prune-ignore-next
export default defineConfig([
	{
		basePath: "/production",
		dataset: "production",
		icon: RocketIcon,
		name: "production",
		plugins: [sharedConfig()],
		projectId: "4durckeb",
		subtitle: "production",
		title: "Coucool - Public",
	},
	{
		basePath: "/staging",
		dataset: "staging",
		icon: ColorWheelIcon,
		name: "staging",
		plugins: [sharedConfig()],
		projectId: "4durckeb",
		subtitle: "staging",
		title: "Coucool - Test",
	},
]);
