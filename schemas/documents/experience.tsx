import { useMemo } from "react";
import createImageUrlBuilder from "@sanity/image-url";

import { ImageValue, ObjectInputProps, ObjectSchemaType, defineField, defineType, useClient } from "sanity";
import { HotspotTooltipProps } from "sanity-plugin-hotspot-array";
import styled from "styled-components";
import { ImageIcon } from "@sanity/icons";

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
