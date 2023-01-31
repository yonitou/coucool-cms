import { defineField, defineType } from "sanity";
import "../../styles/global.css";
import { fontSizeMultiplier } from "../../utils/fontSizeMultiplier";
import { fontEnum } from "../types/fontEnum";

export default defineType({
	name: "content",
	title: "Contenu",
	type: "object",
	preview: {
		select: {
			title: "letter",
			subtitle: "fontFamily",
		},
		prepare({ title, subtitle }) {
			return {
				title,
				subtitle,
				media: (
					<span
						className="preview-letter"
						style={{
							fontFamily: subtitle,
							fontSize: `${fontSizeMultiplier[subtitle as fontEnum]}em`,
						}}
					>
						{title}
					</span>
				),
			};
		},
	},
	fields: [
		defineField({
			name: "letter",
			title: "Lettre",
			type: "string",
			validation: (Rule) => Rule.required().min(1).max(1),
		}),
		defineField({
			title: "Police",
			name: "fontFamily",
			type: "string",
			validation: (Rule) => Rule.required(),
			options: {
				list: Object.values(fontEnum).map((font) => {
					return { title: font, value: font };
				}),
			},
		}),
	],
});
