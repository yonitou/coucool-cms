import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import {
	defineType,
	defineField,
	SortOrdering,
	defineArrayMember,
	ArrayOfPrimitivesInputProps,
	ArraySchemaType,
} from "sanity";
import blockEditor from "../blockEditor";
import "../../styles/global.css";
import { fontWeightEnum } from "../types/fontWeightEnum";
import TitlePreview from "../components/TitlePreview";
import { TitleLetter } from "../types/titleLetter.interface";

export default defineType({
	name: "section",
	type: "document",
	orderings: [orderRankOrdering as SortOrdering],
	title: "Section",
	fields: [
		orderRankField({ type: "section" }),
		defineField({
			name: "name",
			type: "array",
			title: "Nom",
			components: {
				input: (props: ArrayOfPrimitivesInputProps<string | number | boolean, ArraySchemaType<unknown>>) => {
					const { value, renderDefault } = props;
					return (
						<>
							<TitlePreview value={value as unknown as TitleLetter[]} />
							{renderDefault(props)}
						</>
					);
				},
			},
			of: [
				defineArrayMember({
					name: "content",
					title: "Contenu",
					type: "content",
				}),
			],
			validation: (Rule) => Rule.required().min(1),
		}),
		defineField({
			title: "Slug",
			name: "slug",
			type: "slug",
			validation: (Rule) => Rule.required(),
			options: {
				slugify: (input) => {
					const newInput = input as unknown as TitleLetter[];
					const slug = newInput
						.map((d: TitleLetter) => d.letter.toLowerCase())
						.join("")
						.replace(/[^A-zÀ-ú]+/g, "-")
						.slice(0, 200);

					return slug;
				},
				source: "name",
				maxLength: 50,
			},
		}),
		defineField({
			name: "content",
			type: "array",
			title: "Contenu",
			of: [
				{
					type: "block",
					...blockEditor,
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
			],
		}),
	],
	preview: {
		select: {
			title: "name",
		},
		prepare({ title }) {
			return {
				title: title?.map((l: TitleLetter) => l.letter.toUpperCase()).join(""),

				media: (
					<span
						className="preview-letter"
						style={{
							fontWeight: `${title?.[0].fontWeight as fontWeightEnum}`,
						}}
					>
						{title[0].letter}
					</span>
				),
			};
		},
	},
});
