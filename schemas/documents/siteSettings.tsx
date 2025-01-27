import { ArrayOfPrimitivesInputProps, ArraySchemaType, defineArrayMember, defineField, defineType } from "sanity";
import { createImageField, fields } from "sanity-pills";
import blockEditor from "../blockEditor";
import TitlePreview from "../components/TitlePreview";
import { TitleLetter } from "../types/titleLetter.interface";

export default defineType({
	groups: [
		{
			name: "seo",
			title: "SEO",
		},
		{
			name: "social",
			title: "Réseaux sociaux",
		},
		{
			name: "content",
			title: "Contenu",
		},
		{
			name: "tickets",
			title: "Billetterie",
		},
	],
	name: "siteSettings",
	title: "Site Settings",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Titre principal",
			type: "text",
			rows: 3,
			group: "social",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "footer",
			title: "Footer",
			type: "text",
			rows: 3,
			group: "content",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "menuLabel",
			type: "array",
			description: "Ce texte sera affiché dans le header au niveau du menu",
			title: "Label du menu",
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
			name: "importantInfosLabel",
			type: "array",
			description:
				"Ce texte sera le titre de la section 'Informations Importantes' affiché près de l'encart weezevent",
			title: "Label du titre",
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
			name: "ticketingInfos",
			type: "array",
			group: "tickets",
			title: "Informations de billetterie",
			validation: (Rule) => Rule.required(),
			of: [
				{
					type: "block",
					...blockEditor,
				},
			],
		}),

		defineField({
			name: "facebook",
			title: "Lien vers la page Facebook",
			type: "url",
			group: "social",
			validation: (Rule) => Rule.required().uri({}),
		}),
		defineField({
			name: "instagram",
			title: "Lien vers la page Instagram",
			type: "url",
			group: "social",
			validation: (Rule) => Rule.required().uri({}),
		}),
		defineField({
			name: "seoTitle",
			title: "Balise SEO - Title",
			description: "Cette balise est très importante car Google lira ce contenu pour référencer le site",
			type: "string",
			validation: (Rule) => Rule.required(),
			group: "seo",
		}),
		defineField({
			name: "seoDescription",
			title: "Balise SEO - Description",
			description: "Cette balise est très importante car Google lira ce contenu pour référencer le site",
			type: "string",
			validation: (Rule) => Rule.required(),
			group: "seo",
		}),
		...fields({
			gradient: createImageField({
				// @ts-expect-error Issue with sanity
				title: "Gradient de couleur",
				description:
					"Cette image sera utilisée pour créer la boucle de couleur. La première couleur sera utilisée dans les metadata SEO",
				group: "seo",
				options: {
					hotspot: false,
				},
				validations: {
					required: true,
					minWidth: 256,
					minHeight: 1,
					maxWidth: 256,
					maxHeight: 1,
				},
			}),
		}),
		...fields({
			ogImage: createImageField({
				// @ts-expect-error Issue with sanity
				title: "Image de partage (1200px x 630px)",
				description: "Cette image sera affichée lorsque le lien du site sera partagé sur Facebook ou autre ..",
				group: "seo",
				options: {
					hotspot: false,
				},
				validations: {
					required: true,
					minWidth: 1200,
					minHeight: 630,
					maxWidth: 1200,
					maxHeight: 630,
				},
			}),
		}),
	],
});
