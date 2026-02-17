import { LinkIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
	fields: [
		defineField({
			name: "reference",
			title: "Section",
			to: [
				{
					type: "section",
				},
			],
			type: "reference",
			validation: (Rule) => Rule.required(),
		}),
	],
	icon: LinkIcon,
	name: "internalLink",
	title: "Lien interne",
	type: "object",
});
