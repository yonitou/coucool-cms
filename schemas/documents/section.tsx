import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import styled from "styled-components";
import {
	defineType,
	defineField,
	SortOrdering,
	defineArrayMember,
	ArrayOfPrimitivesInputProps,
	ArraySchemaType,
} from "sanity";
import blockEditor from "../blockEditor";
import { fontEnum } from "../types/fontEnum";
import "../../styles/global.css";
import { fontSizeMultiplier } from "../../utils/fontSizeMultiplier";

const SectionTitlePreview = styled.h2`
	font-size: 4rem;
	margin: 0;
	font-weight: unset;
	text-align: center;
`;

const PreviewLetter = styled.span<{ fontFamily: fontEnum }>`
	text-transform: uppercase;
	font-family: ${(props) => props.fontFamily};
	font-size: ${(props) => `${fontSizeMultiplier[props.fontFamily]}em`};
`;

interface TitleLetter {
	letter: string;
	fontFamily: fontEnum;
	_key: string;
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
				input: (props: ArrayOfPrimitivesInputProps<string | number | boolean, ArraySchemaType<unknown>>) => {
					const { value, renderDefault } = props;
					return (
						<>
							<SectionTitlePreview>
								{value &&
									value.map((l) => {
										const letter = l as unknown as TitleLetter;
										return (
											// eslint-disable-next-line no-underscore-dangle
											<PreviewLetter fontFamily={letter.fontFamily} key={letter._key}>
												{letter.letter}
											</PreviewLetter>
										);
									})}
							</SectionTitlePreview>
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
