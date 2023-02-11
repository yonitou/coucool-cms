import { defineField, defineType } from "sanity";
import { createImageField, fields } from "sanity-pills";

export default defineType({
	groups: [
		{
			name: "seo",
			title: "SEO",
		},
	],
	fieldsets: [
		{
			name: "social",
			title: "Réseaux sociaux",
			options: {
				collapsible: true,
				collapsed: false,
			},
		},
	],
	name: "siteSettings",
	title: "Site Settings",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Titre principal",
			type: "text",
			rows: 3,
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "footer",
			title: "Footer",
			description: "Ce texte défilera en bas de page du site",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "eventLink",
			fieldset: "social",
			title: "Lien vers l'évènement",
			type: "url",
			validation: (Rule) => Rule.required().uri({}),
		}),

		defineField({
			name: "facebook",
			title: "Lien vers la page Facebook",
			fieldset: "social",
			type: "url",
			validation: (Rule) => Rule.required().uri({}),
		}),
		defineField({
			name: "instagram",
			title: "Lien vers la page Instagram",
			fieldset: "social",
			type: "url",
			validation: (Rule) => Rule.required().uri({}),
		}),
		defineField({
			name: "seoTitle",
			title: "Balise SEO - Title",
			type: "string",
			validation: (Rule) => Rule.required(),
			group: "seo",
		}),
		defineField({
			name: "seoDescription",
			title: "Balise SEO - Description",
			type: "string",
			validation: (Rule) => Rule.required(),
			group: "seo",
		}),
		defineField({
			name: "color",
			title: "Balise SEO - Couleur dominante",
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
	],
});
