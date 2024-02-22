import { useMemo } from "react";
import createImageUrlBuilder from "@sanity/image-url";

import {
	ArrayOfPrimitivesInputProps,
	ArraySchemaType,
	ImageValue,
	ObjectInputProps,
	ObjectSchemaType,
	defineArrayMember,
	defineField,
	defineType,
	useClient,
} from "sanity";
import { HotspotTooltipProps } from "sanity-plugin-hotspot-array";
import styled from "styled-components";
import { ImageIcon } from "@sanity/icons";
import TitlePreview from "../components/TitlePreview";
import { TitleLetter } from "../types/titleLetter.interface";

const HotspotPreview = ({ value, renderPreview, schemaType }: HotspotTooltipProps): JSX.Element => {
	return (
		<>
			{renderPreview({
				value,
				schemaType,
				layout: "default",
			})}
		</>
	);
};

const Layer = styled.div<{ $url: string }>`
	width: 100%;
	height: 30vh;
	background-image: ${(props) => `url(${props.$url})`};
	background-color: hsla(333.6585365853658, 51.898734177215225%, 84.50980392156863%, 1);
	background-size: contain;
	background-blend-mode: multiply;
	background-position: center;
	background-repeat: no-repeat;
`;

const PreviewImage = (props: ObjectInputProps<ImageValue, ObjectSchemaType>): JSX.Element => {
	const client = useClient({ apiVersion: "2021-03-25" });
	const { renderDefault, value } = props;

	const imgSrc = useMemo((): string => {
		// eslint-disable-next-line no-underscore-dangle
		const ref = value?.asset?._ref;
		if (!ref) return "";
		return createImageUrlBuilder(client).image(ref).url();
	}, [value, client]);

	return (
		<>
			{renderDefault(props)}
			{imgSrc && <Layer $url={imgSrc} />}
		</>
	);
};

export default defineType({
	name: "experience",
	title: "Expérience",
	icon: () => <ImageIcon />,
	__experimental_formPreviewTitle: false,
	type: "document",
	fields: [
		defineField({
			type: "image",
			name: "image",
			title: "Fresque",
			options: {
				hotspot: false,
			},
			validation: (rule) => rule.required().assetRequired(),
		}),
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
			type: "image",
			name: "layerImage",
			description:
				"Cette image sera fusionnée avec l'image de la fresque afin de donner un effet de décoloration",
			title: "Image de fusion",
			options: {
				hotspot: false,
			},
			components: {
				input: PreviewImage,
			},

			validation: (rule) => rule.required().assetRequired(),
		}),
		defineField({
			name: `hotspots`,
			description: "Les zones cliquables de l'expérience",
			type: `array`,
			of: [{ type: "spot" }],

			options: {
				imageHotspot: {
					imagePath: `image`,
					tooltip: HotspotPreview,
				},
			},
		}),
	],
	preview: {
		select: {
			firstCharacter: "hotspots.0.character.slug.current",
			firstCharacterInFlow: "hotspots.0.character.inFlow",
			secondCharacter: "hotspots.1.character.slug.current",
			secondCharacterInFlow: "hotspots.1.character.inFlow",
			thirdCharacter: "hotspots.2.character.slug.current",
			thirdCharacterInFlow: "hotspots.2.character.inFlow",
			fourthCharacter: "hotspots.3.character.slug.current",
			fourthCharacterInFlow: "hotspots.3.character.inFlow",
		},
		prepare({
			firstCharacter,
			secondCharacter,
			thirdCharacter,
			fourthCharacter,
			firstCharacterInFlow,
			secondCharacterInFlow,
			thirdCharacterInFlow,
			fourthCharacterInFlow,
		}) {
			const authors = [
				firstCharacterInFlow && firstCharacter,
				secondCharacterInFlow && secondCharacter,
				thirdCharacterInFlow && thirdCharacter,
			].filter(Boolean);
			const title = authors.length > 0 ? authors.join(" -> ") : "";
			const hasMoreCharacters = Boolean(fourthCharacterInFlow && fourthCharacter);
			return {
				title: hasMoreCharacters ? `${title}…` : title,
			};
		},
	},
});
