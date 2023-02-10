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
			initialValue: false,
		}),
		defineField({
			name: "start",
			title: "Première étape",
			type: "boolean",
			readOnly: true,
			initialValue: false,
		}),
	],
	preview: {
		select: {
			title: "question",
			media: "image.asset",
			subtitle: "text",
		},
		prepare({ title, media, subtitle }) {
			return {
				title: title || "Sans question",
				subtitle: subtitle || "Sans bulle",
				media,
			};
		},
	},
});
