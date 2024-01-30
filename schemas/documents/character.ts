import { defineField, defineType } from "sanity";

export default defineType({
	name: "character",
	type: "document",
	title: "Personnage",
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
			// @ts-ignore
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
		},
		prepare({ title }) {
			return {
				title: title?.current,
				subtitle: title?.current,
			};
		},
	},
});
