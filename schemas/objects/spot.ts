import { defineField } from "sanity";

export default defineField({
	name: "spot",
	type: "object",
	fields: [
		{
			name: "x",
			type: "number",
			readOnly: true,
			validation: (Rule) => Rule.required().min(0).max(100),
		},
		{
			name: "y",
			type: "number",
			readOnly: true,
			validation: (Rule) => Rule.required().min(0).max(100),
		},
		defineField({
			name: "character",
			type: "reference",
			title: "Personnage",
			validation: (Rule) => Rule.required(),
			to: [
				{
					type: "character",
				},
			],
		}),
	],
	preview: {
		select: {
			title: "character.slug",
			x: "x",
			y: "y",
		},
		prepare({ title, x, y }) {
			return {
				title: title?.current,
				subtitle: x && y ? `${x}% / ${y}%` : "",
			};
		},
	},
});
