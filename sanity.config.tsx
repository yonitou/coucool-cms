import { defineConfig, definePlugin } from "sanity";
import { ListItem, structureTool } from "sanity/structure";
import { colorInput } from "@sanity/color-input";
import { imageHotspotArrayPlugin } from "sanity-plugin-hotspot-array";
import { schemaTypes } from "./schemas";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { CogIcon, MasterDetailIcon, PinIcon, RocketIcon, UserIcon } from "@sanity/icons";

const sharedConfig = definePlugin({
	name: "sharedConfig",
	document: {
		newDocumentOptions: (prev, { creationContext }) => {
			if (creationContext.type === "global") {
				return prev.filter((templateItem) => templateItem.templateId !== "siteSettings");
			}
			return prev;
		},
		actions: (prev, context) => {
			const actionsWithoutUnpublish = prev.filter((a) => a.action !== "unpublish");
			return context.schemaType === "siteSettings"
				? [
						...actionsWithoutUnpublish.filter(
							(originalAction) =>
								originalAction.action !== "delete" && originalAction.action !== "duplicate",
						),
					]
				: actionsWithoutUnpublish;
		},
	},
	plugins: [
		imageHotspotArrayPlugin(),
		colorInput(),
		structureTool({
			defaultDocumentNode: (S, context) => {
				if (context.schemaType == "step") {
					// Give all documents of type myDocument the JSON preview,
					// as well as the default form view

					return S.document().views([S.view.form()]);
				}
			},
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
							// @ts-ignore
							S,
							context,
							title: "Sections",
							icon: MasterDetailIcon,
						}) as ListItem,
						...S.documentTypeListItems().filter(
							(listItem) => !["siteSettings", "section"].includes(listItem.getId() as string),
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
