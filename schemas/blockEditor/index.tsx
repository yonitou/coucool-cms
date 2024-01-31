import { ArrowRightIcon, EnvelopeIcon, LaunchIcon, LinkIcon } from "@sanity/icons";
import styled from "styled-components";

const Title = styled.h3`
	font-weight: normal;
	margin: 0;
`;

const ExternalLinkRender = ({ children, href }: { children: JSX.Element; href: string }): JSX.Element => (
	<span>
		{children} &nbsp;
		{href?.startsWith("mailto:") ? <EnvelopeIcon /> : <LaunchIcon />}
	</span>
);

const InternalLinkRender = ({ children }: { children: JSX.Element }): JSX.Element => (
	<span>
		{children} &nbsp;
		<LinkIcon />
	</span>
);

export default {
	marks: {
		annotations: [
			{
				name: "internalLink",
				type: "internalLink",
				component: InternalLinkRender,
			},
			{
				name: "externalLink",
				type: "externalLink",
				component: ExternalLinkRender,
			},
		],
	},
	styles: [
		{
			title: "Normal",
			value: "normal",
		},
		{
			title: "H3",
			value: "h3",
			component: ({ children }: { children: JSX.Element }) => <Title>{children}</Title>,
		},
	],
	lists: [
		{
			title: "Puces",
			value: "bullet",
		},
		{
			title: "Numéros",
			value: "number",
		},
		{
			title: "Fléchée",
			value: "arrow",
			icon: ArrowRightIcon,
		},
	],
};
