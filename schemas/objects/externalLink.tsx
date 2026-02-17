import { LaunchIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
	fields: [
		defineField({
			description:
				"Si vous voulez que le lien redirige vers un envoi d'email à une adresse mail, il faut l'écrire comme ceci : mailto:eros@cou.cool",
			name: "href",
			title: "URL",
			type: "url",
			validation: (Rule) =>
				Rule.required().uri({
					scheme: ["https", "http", "mailto"],
				}),
		}),
		defineField({
			initialValue: true,
			name: "blank",
			title: "Ouvrir dans un nouvel onglet",
			type: "boolean",
		}),
	],
	icon: LaunchIcon,
	name: "externalLink",
	title: "Lien externe",
	type: "object",
});
