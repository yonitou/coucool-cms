import { ArrayOfPrimitivesInputProps, ArraySchemaType, defineArrayMember, defineField, defineType } from "sanity";

import { ImageIcon } from "@sanity/icons";
import TitlePreview from "../components/TitlePreview";
import { TitleLetter } from "../types/titleLetter.interface";

export default defineType({
	name: "experience",
	title: "Expérience",
	icon: () => <ImageIcon />,
	type: "document",
	fields: [
		defineField({
			name: "title",
			type: "array",
			description: "Ce texte sera affiché en titre de la popin d'introduction à l'ouverture de l'expérience",
			title: "Titre (Fenêtre introductive)",
			components: {
				input: (props: ArrayOfPrimitivesInputProps<string | number | boolean, ArraySchemaType<unknown>>) => {
					const { value, renderDefault } = props;
					return (
						<>
							<TitlePreview value={value as unknown as TitleLetter[]} />
							{renderDefault(props)}
						</>
					);
				},
			},
			of: [
				defineArrayMember({
					name: "content",
					title: "Contenu",
					type: "content",
				}),
			],
			validation: (Rule) => Rule.required().min(1),
		}),
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
			name: `acts`,
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
