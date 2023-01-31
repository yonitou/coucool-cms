import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineType, defineField, SortOrdering } from "sanity";
import blockEditor from "../blockEditor";
import { fontEnum } from "../types/fontEnum";
import "../../styles/global.css";
import { fontSizeMultiplier } from "../../utils/fontSizeMultiplier";

interface TitleLetter {
	letter: string;
	fontFamily: fontEnum;
	_key: string;
}
function MyPreviewComponent(props: any) {
	return (
		<>
			<h2 className="section-title-preview">
				{props.value &&
					props.value.map((l: TitleLetter) => (
						<span
							className="preview-letter"
							style={{ fontFamily: l.fontFamily, fontSize: `${fontSizeMultiplier[l.fontFamily]}em` }}
							key={l._key}
						>
							{l.letter}
						</span>
					))}
			</h2>
			{props.renderDefault(props)}
		</>
	);
}

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
				input: MyPreviewComponent,
			},
			of: [
				defineField({
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
				slugify: (input: any) => {
					const slug = input
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
		prepare({ title }: Record<string, any>) {
			return {
				title: title?.map((l: TitleLetter) => l.letter).join(""),

				media: (
					<span
						className="preview-letter"
						style={{
							fontFamily: title[0].fontFamily,
							fontSize: `${fontSizeMultiplier[title?.[0].fontFamily as fontEnum]}em`,
						}}
					>
						{title[0].letter}
					</span>
				),
			};
		},
	},
});
