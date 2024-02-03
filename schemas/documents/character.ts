import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
	name: "character",
	type: "document",
	title: "Personnage",
	icon: UserIcon,
	fields: [
		defineField({
			title: "Nom",
			name: "slug",
			type: "slug",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			title: "Personnage gagnant",
			name: "inFlow",
			type: "boolean",
			initialValue: true,
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "content",
			type: "array",
			title: "Contenu",
			of: [{ type: "story" }],
			validation: (Rule) =>
				Rule.custom((value, context) => {
					const inFlow = context.document && context.document.inFlow;
					if (inFlow)
						return (value as unknown[]).length > 0 || "Au moins un contenu audio par personnage gagnant";
					return (value as unknown[]).length === 1 || "Un seul contenu audio par personnage non gagnant";
				}),
		}),
		defineField({
			title: "Texte du bouton",
			name: "ctaLabel",
			type: "string",
			validation: (Rule) =>
				Rule.custom((value, context) => {
					const inFlow = context.document && context.document.inFlow;
					return Boolean(!inFlow && !value) || Boolean(inFlow && !!value) || "Bouton obligatoire";
				}),
		}),
	],
	preview: {
		select: {
			title: "slug",
			content: "content",
		},
		prepare({ title, content }) {
			return {
				title: title?.current,
				subtitle: `${content?.length} parties`,
			};
		},
	},
});
