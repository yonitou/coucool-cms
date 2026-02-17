import { type fontWeightEnum } from "./fontWeightEnum";

export interface TitleLetter {
	_key: string;
	fontWeight: fontWeightEnum;
	letter: string;
}

export const isTitleLetter = (value: unknown): value is TitleLetter =>
	typeof value === "object" && value !== null && "letter" in value && "fontWeight" in value;

export const isTitleLetterArray = (value: unknown): value is TitleLetter[] =>
	Array.isArray(value) && value.every((v) => isTitleLetter(v));
