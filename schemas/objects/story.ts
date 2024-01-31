import { defineField, defineType } from "sanity";

export default defineType({
	name: "story",
	type: "object",
	title: "Histoire",
	fields: [
		defineField({
			name: "label",
			type: "text",
			title: "Texte",
			rows: 3,
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "sound",
			type: "file",
			title: "Fichier audio",
			options: {
				accept: "audio/*",
			},
			validation: (Rule) => Rule.required().assetRequired(),
		}),
	],
});
