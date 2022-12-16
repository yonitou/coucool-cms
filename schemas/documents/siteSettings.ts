import { defineField, defineType } from "sanity";
import blockEditor from "../blockEditor";

export default defineType({
	name: "siteSettings",
	title: "Site Settings",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Titre",
			type: "string",
			validation: (Rule) => Rule.required(),
		},
		{
			name: "eventLink",
			title: "Lien vers l'évènement",
			type: "url",
			validation: (Rule) => Rule.required().uri(),
		},
		{
			name: "facebook",
			title: "Lien vers la page Facebook",
			type: "url",
			validation: (Rule) => Rule.required().uri(),
		},
		{
			name: "instagram",
			title: "Lien vers la page Instagram",
			type: "url",
			validation: (Rule) => Rule.required().uri(),
		},
		defineField({
			name: "content",
			type: "array",
			title: "Sous-titre",
			validation: (Rule) => Rule.required(),
			of: [
				{
					type: "block",
					...blockEditor,
				},
			],
		}),
	],
});
