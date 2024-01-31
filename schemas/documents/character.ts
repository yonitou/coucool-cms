import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
	name: "character",
	type: "document",
	title: "Personnage",
	icon: UserIcon,
	fields: [
		defineField({
			title: "Nom",
			name: "slug",
			type: "slug",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "content",
			type: "array",
			title: "Contenu",
			of: [{ type: "story" }],
		}),
		defineField({
			title: "Label bouton",
			name: "ctaLabel",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		select: {
			title: "slug",
			content: "content",
		},
		prepare({ title, content }) {
			return {
				title: title?.current,
				subtitle: `${content?.length} parties`,
			};
		},
	},
});
