import { ArrowRightIcon, EnvelopeIcon, LaunchIcon, LinkIcon } from "@sanity/icons";

const ExternalLinkRender = ({ children, href }: { children: JSX.Element; href: string }) => (
	<span>
		{children} &nbsp;
		{href?.startsWith("mailto:") ? (
			<EnvelopeIcon onResize={undefined} onResizeCapture={undefined} />
		) : (
			<LaunchIcon onResize={undefined} onResizeCapture={undefined} />
		)}
	</span>
);

const InternalLinkRender = ({ children }: { children: JSX.Element }) => (
	<span>
		{children} &nbsp;
		<LinkIcon onResize={undefined} onResizeCapture={undefined} />
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
		},
		{
			title: "H5",
			value: "h5",
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
