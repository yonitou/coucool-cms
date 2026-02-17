import { ArrowRightIcon, EnvelopeIcon, LaunchIcon, LinkIcon } from "@sanity/icons";
import { type BlockListDefinition, type BlockStyleDefinition } from "@sanity/types";
import styled from "styled-components";

interface BlockAnnotation {
	component: (props: { children: React.ReactElement; href: string }) => React.ReactElement;
	name: string;
	type: string;
}

interface BlockEditorConfig {
	lists: BlockListDefinition[];
	marks: {
		annotations: BlockAnnotation[];
	};
	styles: BlockStyleDefinition[];
}

const Title = styled.h3`
	font-weight: normal;
	margin: 0;
`;

const ExternalLinkRender = ({ children, href }: { children: React.ReactElement; href: string }): React.ReactElement => (
	<span>
		{children} &nbsp;
		{href.startsWith("mailto:") ? <EnvelopeIcon /> : <LaunchIcon />}
	</span>
);

const InternalLinkRender = ({ children }: { children: React.ReactElement }): React.ReactElement => (
	<span>
		{children} &nbsp;
		<LinkIcon />
	</span>
);

const blockEditor: BlockEditorConfig = {
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
			icon: ArrowRightIcon,
			title: "Fléchée",
			value: "arrow",
		},
	],
	marks: {
		annotations: [
			{
				component: InternalLinkRender,
				name: "internalLink",
				type: "internalLink",
			},
			{
				component: ExternalLinkRender,
				name: "externalLink",
				type: "externalLink",
			},
		],
	},
	styles: [
		{
			title: "Normal",
			value: "normal",
		},
		{
			component: ({ children }: { children: React.ReactElement }) => <Title>{children}</Title>,
			title: "H3",
			value: "h3",
		},
	],
};

export default blockEditor;
