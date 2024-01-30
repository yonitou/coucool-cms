import accordion from "./objects/accordion";
import edition from "./objects/edition";
import externalLink from "./objects/externalLink";
import internalLink from "./objects/internalLink";
import section from "./documents/section";
import siteSettings from "./documents/siteSettings";
import content from "./objects/content";
import story from "./objects/story";
import spot from "./objects/spot";
import experience from "./documents/experience";
import character from "./documents/character";

export const schemaTypes = [
	internalLink,
	externalLink,
	edition,
	content,
	spot,
	story,
	experience,
	character,
	section,
	accordion,
	siteSettings,
];
