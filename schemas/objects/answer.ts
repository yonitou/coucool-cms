import { CustomValidatorResult, SanityDocument, defineField, defineType } from "sanity";
import { getPossiblePaths } from "../../utils/getPossiblePaths";
import { stepType } from "../types/step.types";

export default defineType({
	name: "answer",
	type: "object",
	title: "Réponse",
	preview: {
		select: {
			title: "label",
			media: "reference.image.asset",
		},
	},
	fields: [
		defineField({
			name: "reference",
			type: "reference",
			title: "Étape suivante",
			validation: (Rule) =>
				Rule.required().custom(async (_duration, context): Promise<CustomValidatorResult> => {
					try {
						const client = context.getClient({ apiVersion: "2021-10-21" });
						const steps: stepType[] = await client.fetch(
							'*[_type == "step"]{ end,start, _id, answers,"imageUrl": image.asset->url, slug}'
						);
						const possiblePathsLength = getPossiblePaths(
							steps?.map((s) => ({ ...s, _id: s._id.replace("drafts.", "") }))
						)?.map((p) => p.length);
						const maxPathLength = Math.max.apply(null, possiblePathsLength);
						if (maxPathLength > 10) {
							return `Le nombre maxium d'étapes est de 10. Actuellement : ${maxPathLength}`;
						}
						return true;
					} catch (e) {
						return "Logique d'étapes infinie";
					}
				}),

			options: {
				filter: ({ document }: { document: SanityDocument }) => {
					return {
						filter: "_id != $documentId",
						params: {
							documentId: document._id,
						},
					};
				},
			},
			to: [
				{
					type: "step",
				},
			],
		}),
		defineField({
			name: "label",
			type: "string",
			title: "Réponse",
			validation: (Rule) => Rule.required(),
		}),
	],
});
