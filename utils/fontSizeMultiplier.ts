import { fontEnum } from "../schemas/types/fontEnum";

export const fontSizeMultiplier: { [key in fontEnum]: number } = {
	[fontEnum.SolideMirageEtroit]: 0.95,
	[fontEnum.SKFemmeFatale]: 1,
	[fontEnum.WonkyRegular]: 1,
	[fontEnum.AsfenRegular]: 1,
	[fontEnum.PPMondwestRegular]: 1.1,
	[fontEnum.RemboyRegular]: 1,
	[fontEnum.Adversal]: 0.95,
	[fontEnum.DTRandomDisplayRegular]: 1.1,
	[fontEnum.WriggleRegular]: 1,
};
