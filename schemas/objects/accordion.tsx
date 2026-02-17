import { StackIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import blockEditor from "../blockEditor";

export default defineType({
	fields: [
		defineField({
			name: "title",
			title: "Titre",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "answers",
			of: [
				{
					lists: blockEditor.lists,
					marks: blockEditor.marks,
					styles: blockEditor.styles,
					type: "block",
				},
			],
			title: "Réponses",
			type: "array",
			validation: (Rule) => Rule.required(),
		}),
	],
	icon: StackIcon,
	name: "accordion",
	title: "Accordéon",
	type: "object",
});
