import { defineType, defineField } from "sanity";

import "../../styles/global.css";

export default defineType({
	name: "step",
	type: "document",
	title: "Étape - BD",
	fields: [
		defineField({
			name: "question",
			type: "text",
			title: "Question",
			rows: 3,
		}),
		defineField({
			name: "slug",
			type: "slug",
			title: "Nom de l'étape",
			description:
				"Ajoutez ici un nom d'étape. Celui-ci ne sera pas utilisé sur le site mais est uniquement pour faciliter la distinction entre les différentes étapes",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			title: "Texte de la bulle",
			name: "text",
			rows: 3,
			type: "text",
		}),
		defineField({
			title: "Dialogue",
			name: "dialog",
			description:
				"En activant cette option, une petite forme sera ajoutée sur le côté de la bulle afin d'illustrer que le personnage parle",
			type: "boolean",
			initialValue: false,
		}),
		defineField({
			title: "Image",
			name: "image",
			type: "image",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "answers",
			type: "array",
			title: "Réponses possibles",
			of: [
				defineField({
					name: "answer",
					title: "Réponse",
					type: "answer",
				}),
			],
		}),
		defineField({
			name: "end",
			title: "Étape finale",
			type: "boolean",
			readOnly: true,
			options: {
				layout: "checkbox",
			},

			initialValue: false,
		}),
		defineField({
			name: "start",
			title: "Première étape",
			type: "boolean",
			readOnly: true,
			options: {
				layout: "checkbox",
			},
			initialValue: false,
		}),
	],
	preview: {
		select: {
			title: "slug.current",
			media: "image.asset",
			subtitle: "text",
		},
		prepare({ title, media, subtitle }) {
			return {
				title: title,
				subtitle: subtitle || "-",
				media,
			};
		},
	},
});
