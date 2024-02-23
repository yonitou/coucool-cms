import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { getImageDimensions } from "@sanity/asset-utils";

export default defineType({
	name: "character",
	type: "document",
	title: "Personnage",
	icon: UserIcon,
	fields: [
		defineField({
			title: "Nom",
			name: "slug",
			description: "Le nom du personnage doit être unique",
			type: "slug",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			title: "Personnage gagnant",
			description:
				"Cette option permet de définir si le personnage est inclus dans un parcours gagnant ou s'il va juste jouer du son",
			name: "inFlow",
			type: "boolean",
			initialValue: true,
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "content",
			type: "array",
			description:
				"Le contenu joué/affiché par le personnage lorsqu'il sera sélectionné. Chaque partie du contenu sera affichée indépendamment dans une slide",
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
			type: "image",
			name: "image",
			description:
				"Cette image représente un PNG contenant le personnage détouré. Ce PNG doit faire la taille de la fresque",
			title: "Image du personnage détouré",
			options: {
				hotspot: false,
			},

			validation: (Rule) =>
				Rule.custom((value, context) => {
					const isValidImage =
						!!value?.asset &&
						// eslint-disable-next-line no-underscore-dangle
						getImageDimensions(value.asset._ref)?.width === 3200 &&
						// eslint-disable-next-line no-underscore-dangle
						getImageDimensions(value.asset._ref)?.height === 2240;
					const inFlow = context.document && context.document.inFlow;
					if (inFlow)
						return (
							(!!value && isValidImage) || "Un PNG de 3200x2240 par personnage gagnant est obligatoire"
						);
					return !value || "Pas de PNG possible pour les faux personnages";
				}),
		}),
		defineField({
			title: "Texte du bouton",
			description: "Le texte affiché sur le bouton de la popin de contenu lorsque le personnage aura été cliqué",
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
