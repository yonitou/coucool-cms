import { defineField, defineType } from "sanity";

import LetterPreviewInput from "../components/LetterPreviewInput";
import { fontWeightList, isFontWeight } from "../types/fontWeightEnum";

export default defineType({
	components: {
		input: LetterPreviewInput,
	},
	fields: [
		defineField({
			name: "letter",
			title: "Lettre",
			type: "string",
			validation: (Rule) => Rule.required().min(1).max(1),
		}),
		defineField({
			name: "fontWeight",
			options: {
				list: fontWeightList,
			},
			title: "Style",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
	],
	name: "content",
	preview: {
		prepare({ subtitle, title }) {
			const letter = String(title);
			const fontWeight = isFontWeight(subtitle) ? subtitle : undefined;

			return {
				media: (
					<span
						className="preview-letter"
						style={{
							fontWeight,
						}}
					>
						{letter}
					</span>
				),
				subtitle: fontWeightList.find((f) => f.value === fontWeight)?.title ?? String(subtitle),
				title: letter,
			};
		},
		select: {
			subtitle: "fontWeight",
			title: "letter",
		},
	},
	title: "Contenu",
	type: "object",
});
