import accordion from "./objects/accordion";
import edition from "./objects/edition";
import externalLink from "./objects/externalLink";
import internalLink from "./objects/internalLink";
import section from "./documents/section";
import siteSettings from "./documents/siteSettings";
import content from "./objects/content";
import act from "./objects/act";
import experience from "./documents/experience";

export const schemaTypes = [
	internalLink,
	externalLink,
	edition,
	content,
	act,
	experience,
	section,
	accordion,
	siteSettings,
];
