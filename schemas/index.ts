import accordion from "./objects/accordion";
import edition from "./objects/edition";
import externalLink from "./objects/externalLink";
import internalLink from "./objects/internalLink";
import section from "./documents/section";
import siteSettings from "./documents/siteSettings";
import content from "./objects/content";
import answer from "./objects/answer";
import step from "./documents/step";

export const schemaTypes = [
	internalLink,
	answer,
	externalLink,
	edition,
	content,
	section,
	accordion,
	siteSettings,
	step,
];
