import { stepType } from "../schemas/types/step.types";

export const getPossiblePaths = (steps: stepType[]): string[][] => {
	const obj: Record<string, stepType> = {};
	steps?.forEach((step) => {
		obj[step._id] = step;
	});

	const firstStepId = (steps.find((s) => s.start) as stepType)._id;

	let paths = obj[firstStepId]?.answers?.map(() => [firstStepId].filter((a) => a));
	let complete = false;

	while (!complete) {
		complete = true;

		const result: string[][] = [];

		paths?.forEach((path) => {
			if (!(path?.length > 0)) return;
			const lastElementOfPath = path[path.length - 1];
			const nextPathDirections = obj[lastElementOfPath]?.answers;

			if (nextPathDirections?.length > 0) {
				Array.from(new Set(nextPathDirections)).forEach((nextPathElement) => {
					if (path.includes(nextPathElement?.reference?._ref)) throw new Error("infinite loop");
					result.push([...path, nextPathElement?.reference?._ref]);

					if (nextPathElement?.reference?._ref) {
						complete = false;
					}
				});
			} else {
				result.push([...path]);
			}
		});

		paths = result;
	}
	return paths;
};
