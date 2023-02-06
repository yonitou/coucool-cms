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
			title: "Identifiant de l'étape",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			title: "Texte de la bulle",
			name: "text",
			rows: 3,
			type: "text",
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
			initialValue: false,
		}),
		defineField({
			name: "start",
			title: "Première étape",
			type: "boolean",
			initialValue: false,
		}),
	],
	preview: {
		select: {
			title: "slug.current",
			media: "image.asset",
		},
	},
});
