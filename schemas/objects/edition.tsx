import { StarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
	fields: [
		defineField({
			name: "year",
			options: {
				dateFormat: "yyyy",
			},
			title: "Année",
			type: "date",
			validation: (Rule) => {
				return Rule.required().min("2016-01-01T00:00:00.000Z").max(new Date().toISOString());
			},
		}),
	],
	icon: StarIcon,
	name: "edition",
	preview: {
		prepare({ year }) {
			return {
				title: String(year).split("-")[0],
			};
		},
		select: {
			year: "year",
		},
	},
	title: "Ancienne Édition",
	type: "object",
});
