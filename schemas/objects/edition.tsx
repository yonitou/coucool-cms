import { StarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
	name: "edition",
	type: "object",
	icon: () => <StarIcon onResize={undefined} onResizeCapture={undefined} />,
	title: "Ancienne Édition",
	fields: [
		defineField({
			name: "year",
			type: "date",
			title: "Année",
			options: {
				dateFormat: "YYYY",
			},
			validation: (Rule) => Rule.required().min("2016-01-01T00:00:00.000Z").max(new Date().toISOString()),
		}),
	],
	preview: {
		select: {
			year: "year",
		},
		prepare({ year }) {
			return {
				title: year?.split("-")?.[0],
			};
		},
	},
});
