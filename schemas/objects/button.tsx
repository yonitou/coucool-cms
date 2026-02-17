import { LaunchIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
	fields: [
		defineField({
			name: "label",
			title: "Label",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "url",
			title: "URL",
			type: "url",
			validation: (Rule) => Rule.required().uri({ scheme: ["https"] }),
		}),
	],
	icon: LaunchIcon,
	name: "button",
	preview: {
		prepare({ label, url }) {
			return {
				subtitle: typeof url === "string" ? url : "",
				title: typeof label === "string" ? label : "Bouton",
			};
		},
		select: {
			label: "label",
			url: "url",
		},
	},
	title: "Bouton externe",
	type: "object",
});
