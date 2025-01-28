import { ArrayOfPrimitivesInputProps, ArraySchemaType, defineArrayMember, defineField } from "sanity";
import { TitleLetter } from "../types/titleLetter.interface";
import TitlePreview from "../components/TitlePreview";

export default defineField({
	name: "act",
	type: "object",
	fields: [
		{
			name: "title",
			type: "string",
			title: "Émotion",
			validation: (Rule) => Rule.required(),
		},
		defineField({
			name: "actLabel",
			type: "array",
			description: "Ce texte sera affiché lors du début de la vidéo",
			title: "Label de l'acte en cours",
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
		{
			name: "validIntention",
			type: "number",
			title: "Intention correcte",
			description: "0 équivaut à la première vidéo, 1 à la seconde, 2 à la 3ème",
			validation: (Rule) => Rule.required().integer().min(0).max(2),
		},
		defineField({
			name: "color",
			title: "Couleur du texte de l'acte",
			type: "color",
			validation: (Rule) => Rule.required(),
		}),
		{
			name: "video",
			type: "file",
			title: "Vidéo de l'acte utilisée sur desktop",
			options: {
				accept: "video/*",
			},
			validation: (Rule) => Rule.required().assetRequired(),
		},
		{
			name: "mobileVideo",
			type: "file",
			title: "Vidéo de l'acte utilisée sur mobile",
			options: {
				accept: "video/*",
			},
			validation: (Rule) => Rule.required().assetRequired(),
		},
		{
			name: "subtitle",
			type: "file",
			title: "Sous titres des vidéos",
			options: {
				accept: "text/vtt",
			},
			validation: (Rule) => Rule.required().assetRequired(),
		},
	],
	preview: {
		select: {
			title: "title",
			actLabel: "actLabel",
		},
		prepare({ title, actLabel }) {
			return {
				title,
				subtitle: actLabel?.map((l: TitleLetter) => l.letter.toUpperCase()).join(""),
			};
		},
	},
});
