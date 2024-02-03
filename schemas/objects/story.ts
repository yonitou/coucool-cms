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
			validation: (Rule) =>
				Rule.custom((value, context) => {
					const inFlow = context.document && context.document.inFlow;
					if (inFlow) {
						return !!value || "Le texte est obligatoire pour les personnages gagnants";
					}
					return !value || "Pas de texte pour les faux personnages";
				}),
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
	preview: {
		select: {
			title: "label",
			subtitle: "sound",
		},
		prepare({ title, subtitle }) {
			return {
				title,
				// eslint-disable-next-line no-underscore-dangle
				subtitle: subtitle && subtitle.asset._ref,
			};
		},
	},
});
