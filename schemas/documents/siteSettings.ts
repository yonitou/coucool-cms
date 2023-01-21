import { defineField, defineType } from "sanity";
import blockEditor from "../blockEditor";
import { createImageField, fields } from "sanity-pills";

export default defineType({
	groups: [
		{
			name: "seo",
			title: "SEO",
		},
	],
	name: "siteSettings",
	title: "Site Settings",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Header",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "seoTitle",
			title: "Titre",
			type: "string",
			validation: (Rule) => Rule.required(),
			group: "seo",
		}),
		defineField({
			name: "seoDescription",
			title: "Description",
			type: "string",
			validation: (Rule) => Rule.required(),
			group: "seo",
		}),
		defineField({
			name: "color",
			title: "Couleur dominante",
			type: "color",
			group: "seo",
			validation: (Rule) => Rule.required(),
		}),
		...fields({
			ogImage: createImageField({
				title: "Image de partage (1200px x 630px)",
				group: "seo",
				options: {
					hotspot: false,
				},
				validations: {
					required: true,
					minWidth: 1200,
					minHeight: 630,
					maxWidth: 1200,
					maxHeight: 630,
				},
			}),
		}),

		defineField({
			name: "eventLink",
			title: "Lien vers l'évènement",
			type: "url",
			validation: (Rule) => Rule.required().uri({}),
		}),

		defineField({
			name: "facebook",
			title: "Lien vers la page Facebook",
			type: "url",
			validation: (Rule) => Rule.required().uri({}),
		}),
		defineField({
			name: "instagram",
			title: "Lien vers la page Instagram",
			type: "url",
			validation: (Rule) => Rule.required().uri({}),
		}),
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
