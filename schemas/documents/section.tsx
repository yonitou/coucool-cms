import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineArrayMember, defineField, defineType } from "sanity";

import blockEditor from "../blockEditor";
import TitleLetterInput from "../components/TitleLetterInput";
import { isTitleLetterArray } from "../types/titleLetter.interface";

export default defineType({
	fields: [
		orderRankField({ type: "section" }),
		defineField({
			components: {
				input: TitleLetterInput,
			},
			name: "name",
			of: [
				defineArrayMember({
					name: "content",
					title: "Contenu",
					type: "content",
				}),
			],
			title: "Nom",
			type: "array",
			validation: (Rule) => Rule.required().min(1),
		}),
		defineField({
			name: "slug",
			options: {
				maxLength: 50,
				slugify: (input) => {
					if (!isTitleLetterArray(input)) {
						return "";
					}

					return input
						.map((d) => d.letter.toLowerCase())
						.join("")
						.replaceAll(/[^A-zÀ-ú]+/g, "-")
						.slice(0, 200);
				},
				source: "name",
			},
			title: "Slug",
			type: "slug",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "content",
			of: [
				{
					lists: blockEditor.lists,
					marks: blockEditor.marks,
					styles: blockEditor.styles,
					type: "block",
				},
				defineField({
					name: "accordion",
					title: "Accordéon",
					type: "accordion",
				}),
				defineField({
					name: "edition",
					title: "Ancienne édition",
					type: "edition",
				}),
				defineField({
					name: "button",
					title: "Bouton",
					type: "button",
				}),
			],
			title: "Contenu",
			type: "array",
		}),
	],
	name: "section",
	orderings: [orderRankOrdering],
	preview: {
		prepare({ title }) {
			if (!isTitleLetterArray(title)) {
				return { title: "" };
			}

			return {
				media: (
					<span
						className="preview-letter"
						style={{
							fontWeight: title[0]?.fontWeight,
						}}
					>
						{title[0]?.letter}
					</span>
				),
				title: title.map((l) => l.letter.toUpperCase()).join(""),
			};
		},
		select: {
			title: "name",
		},
	},
	title: "Section",
	type: "document",
});
