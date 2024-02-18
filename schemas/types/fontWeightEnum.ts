export enum fontWeightEnum {
	normal = "400",
	light = "300",
	bold = "700",
	medium = "500",
}

export const fontWeightList = Object.entries(fontWeightEnum).map(([title, value]) => ({ title, value }));
