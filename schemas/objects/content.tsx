import { defineField, defineType } from "sanity";
import "../../styles/global.css";
import { fontWeightEnum } from "../types/fontWeightEnum";

export default defineType({
	name: "content",
	title: "Contenu",
	type: "object",
	preview: {
		select: {
			title: "letter",
			subtitle: "fontWeight",
		},
		prepare({ title, subtitle }) {
			return {
				title,
				subtitle,
				media: (
					<span
						className="preview-letter"
						style={{
							fontWeight: `${subtitle as fontWeightEnum}`,
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
			title: "Style",
			name: "fontWeight",
			type: "string",
			validation: (Rule) => Rule.required(),
			options: {
				list: Object.values(fontWeightEnum).map((font) => {
					return { title: font, value: font };
				}),
			},
		}),
	],
});
