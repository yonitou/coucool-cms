export enum fontWeightEnum {
	bold = "700",
	light = "300",
	medium = "500",
	normal = "400",
}

export const fontWeightList = Object.entries(fontWeightEnum).map(([title, value]) => ({ title, value }));

const fontWeightValues = new Set<string>(Object.values(fontWeightEnum));

export const isFontWeight = (value: unknown): value is fontWeightEnum =>
	typeof value === "string" && fontWeightValues.has(value);
