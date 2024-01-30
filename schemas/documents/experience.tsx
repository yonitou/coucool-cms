import { Box } from "@sanity/ui";
import { SchemaType, defineField, defineType, useSchema } from "sanity";
import { HotspotTooltipProps } from "sanity-plugin-hotspot-array";

export function HotspotPreview({ value, renderPreview, schemaType }: HotspotTooltipProps) {
	return (
		<Box padding={2} style={{ minWidth: 200 }}>
			{renderPreview({
				value,
				schemaType,
				layout: "default",
			})}
		</Box>
	);
}

export default defineType({
	name: "experience",
	title: "Expérience",
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
			name: `hotspots`,
			type: `array`,
			// @ts-ignore
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
			secondCharacter: "hotspots.1.character.slug.current",
			thirdCharacter: "hotspots.2.character.slug.current",
			fourthCharacter: "hotspots.3.character.slug.current",
		},
		prepare({ firstCharacter, secondCharacter, thirdCharacter, fourthCharacter }) {
			const authors = [firstCharacter, secondCharacter, thirdCharacter].filter(Boolean);
			const title = authors.length > 0 ? authors.join(" -> ") : "";
			const hasMoreCharacters = Boolean(fourthCharacter);
			return {
				title: hasMoreCharacters ? `${title}…` : title,
			};
		},
	},
});
