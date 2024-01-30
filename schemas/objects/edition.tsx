import { StarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
	name: "edition",
	type: "object",
	icon: () => <StarIcon />,
	title: "Ancienne Édition",
	fields: [
		defineField({
			name: "year",
			type: "date",
			title: "Année",
			options: {
				dateFormat: "yyyy",
			},
			validation: (Rule) => {
				return Rule.required().min(new Date("2016-01-01T00:00:00.000Z").getTime()).max(new Date().getTime());
			},
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
