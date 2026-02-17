import { getImageDimensions } from "@sanity/asset-utils";
import { defineArrayMember, defineField, defineType } from "sanity";

import blockEditor from "../blockEditor";
import TitleLetterInput from "../components/TitleLetterInput";

export default defineType({
	fields: [
		defineField({
			group: "social",
			name: "title",
			rows: 3,
			title: "Titre principal",
			type: "text",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			group: "content",
			name: "footer",
			rows: 3,
			title: "Footer",
			type: "text",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			components: {
				input: TitleLetterInput,
			},
			description: "Ce texte sera affiché dans le header au niveau du menu",
			name: "menuLabel",
			of: [
				defineArrayMember({
					name: "content",
					title: "Contenu",
					type: "content",
				}),
			],
			title: "Label du menu",
			type: "array",
			validation: (Rule) => Rule.required().min(1),
		}),
		defineField({
			components: {
				input: TitleLetterInput,
			},
			description:
				"Ce texte sera le titre de la section 'Informations Importantes' affiché près de l'encart weezevent",
			name: "importantInfosLabel",
			of: [
				defineArrayMember({
					name: "content",
					title: "Contenu",
					type: "content",
				}),
			],
			title: "Label du titre",
			type: "array",
			validation: (Rule) => Rule.required().min(1),
		}),
		defineField({
			group: "tickets",
			name: "ticketingInfos",
			of: [
				{
					lists: blockEditor.lists,
					marks: blockEditor.marks,
					styles: blockEditor.styles,
					type: "block",
				},
			],
			title: "Informations de billetterie",
			type: "array",
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			group: "social",
			name: "whatsapp",
			title: "Lien vers la communauté WhatsApp",
			type: "url",
			validation: (Rule) => Rule.required().uri({}),
		}),
		defineField({
			group: "social",
			name: "instagram",
			title: "Lien vers la page Instagram",
			type: "url",
			validation: (Rule) => Rule.required().uri({}),
		}),
		defineField({
			description: "Cette balise est très importante car Google lira ce contenu pour référencer le site",
			group: "seo",
			name: "seoTitle",
			title: "Balise SEO - Title",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			description: "Cette balise est très importante car Google lira ce contenu pour référencer le site",
			group: "seo",
			name: "seoDescription",
			title: "Balise SEO - Description",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			description:
				"Cette image sera utilisée pour créer la boucle de couleur. La première couleur sera utilisée dans les metadata SEO (256x1px)",
			group: "seo",
			name: "gradient",
			options: {
				hotspot: false,
			},
			title: "Gradient de couleur",
			type: "image",
			validation: (Rule) =>
				Rule.required().custom((value) => {
					if (!value?.asset?._ref) {
						return true;
					}

					const { height, width } = getImageDimensions(value.asset._ref);

					if (width !== 256 || height !== 1) {
						return `L'image doit faire 256x1px (actuellement ${String(width)}x${String(height)}px)`;
					}

					return true;
				}),
		}),
		defineField({
			description: "Cette image sera affichée lorsque le lien du site sera partagé sur Facebook ou autre ..",
			group: "seo",
			name: "ogImage",
			options: {
				hotspot: false,
			},
			title: "Image de partage (1200x630px)",
			type: "image",
			validation: (Rule) =>
				Rule.required().custom((value) => {
					if (!value?.asset?._ref) {
						return true;
					}

					const { height, width } = getImageDimensions(value.asset._ref);

					if (width !== 1200 || height !== 630) {
						return `L'image doit faire 1200x630px (actuellement ${String(width)}x${String(height)}px)`;
					}

					return true;
				}),
		}),
	],
	groups: [
		{
			name: "seo",
			title: "SEO",
		},
		{
			name: "social",
			title: "Réseaux sociaux",
		},
		{
			name: "content",
			title: "Contenu",
		},
		{
			name: "tickets",
			title: "Billetterie",
		},
	],
	name: "siteSettings",
	title: "Site Settings",
	type: "document",
});
