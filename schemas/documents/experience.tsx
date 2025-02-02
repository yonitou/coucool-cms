import { defineField, defineType } from "sanity";

import { ImageIcon } from "@sanity/icons";

export default defineType({
	name: "experience",
	title: "Expérience",
	icon: () => <ImageIcon />,
	type: "document",
	fields: [
		defineField({
			title: "Description (Fenêtre Introductive)",
			description:
				"Ce texte sera affiché en description de la popin d'introduction à l'ouverture de l'expérience",
			name: "description",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			type: "image",
			name: "layerImage",
			description: "Cette image sera fusionnée avec la vidéo afin de créer un bruit.",
			title: "Image de fusion",
			options: {
				accept: "image/gif",
				hotspot: false,
			},
			validation: (rule) => rule.required().assetRequired(),
		}),
		defineField({
			name: "sound",
			type: "file",
			title: "Audio d'ambiance",
			description: "Cet audio sera joué en fond de l'expérience",
			options: {
				accept: "audio/*",
			},
			validation: (Rule) => Rule.required().assetRequired(),
		}),
		defineField({
			name: "acts",
			description: "Les actes de l'expérience",
			type: `array`,
			of: [{ type: "act" }],
			validation: (rule) => rule.required().min(3).max(3),
		}),
	],
	preview: {
		select: {
			firstEmotion: "acts.0.title",
			secondEmotion: "acts.1.title",
			thirdEmotion: "acts.2.title",
		},
		prepare({ firstEmotion, secondEmotion, thirdEmotion }) {
			const emotions = [firstEmotion, secondEmotion, thirdEmotion]?.filter(Boolean);
			const title = emotions.length > 0 ? emotions.join(" -> ") : "";
			return {
				title,
			};
		},
	},
});
