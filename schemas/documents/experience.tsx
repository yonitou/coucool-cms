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
import { fontSizeMultiplier } from "../../utils/fontSizeMultiplier";
import { fontEnum } from "../types/fontEnum";

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

const SectionTitlePreview = styled.h2`
	font-size: 4rem;
	margin: 0;
	font-weight: unset;
	text-align: center;
`;

const PreviewLetter = styled.span<{ fontFamily: fontEnum }>`
	text-transform: uppercase;
	font-family: ${(props) => props.fontFamily};
	font-size: ${(props) => `${fontSizeMultiplier[props.fontFamily]}em`};
`;

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

interface TitleLetter {
	letter: string;
	fontFamily: fontEnum;
	_key: string;
}

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
			title: "Titre (Fenêtre introductive)",
			components: {
				input: (props: ArrayOfPrimitivesInputProps<string | number | boolean, ArraySchemaType<unknown>>) => {
					const { value, renderDefault } = props;
					return (
						<>
							<SectionTitlePreview>
								{value &&
									value.map((l) => {
										const letter = l as unknown as TitleLetter;
										return (
											// eslint-disable-next-line no-underscore-dangle
											<PreviewLetter fontFamily={letter.fontFamily} key={letter._key}>
												{letter.letter}
											</PreviewLetter>
										);
									})}
							</SectionTitlePreview>
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
			name: "description",
			type: "string",
			validation: (Rule) => Rule.required(),
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
		defineField({
			type: "image",
			name: "layerImage",
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
