import { Fragment, useEffect, useState } from "react";
import { DefaultDocumentNodeContext } from "sanity/desk";
import { stepType } from "../types/step.types";
import styled from "styled-components";
import { getPossiblePaths } from "../../utils/getPossiblePaths";

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
	gap: 10px;
	margin-bottom: 10px;
	align-items: center;
`;

const Image = styled.img<{ isCurrent: boolean }>`
	width: 100%;
	height: 100%;
	grid-column: span 3;
	border: ${(props) => (props.isCurrent ? "2px solid green" : "2px solid transparent")};
`;

const Wrapper = styled.div`
	padding: 1rem;
`;

const Linker = styled.div`
	height: 1px;
	background: white;
	grid-column: span 1;
`;

const Title = styled.h4`
	margin: 20px 0;
`;

const StepVizualizer = ({ context }: { context: DefaultDocumentNodeContext }): JSX.Element => {
	const [steps, setSteps] = useState<stepType[]>([]);
	const client = context.getClient({ apiVersion: "2021-10-21" });
	const stepId = context.documentId as string;
	const currentStep = steps?.find((s) => s._id === stepId) as stepType;
	const possiblePaths =
		steps.length > 0
			? getPossiblePaths(steps)
					?.filter((p) => p.includes(currentStep?._id))
					?.sort((a, b) => a.length - b.length)
			: [];

	useEffect(() => {
		const loadSteps = async (): Promise<void> => {
			const steps = await client.fetch(
				'*[_type == "step"]{ end,start, _id, answers,"imageUrl": image.asset->url}'
			);
			console.log(steps);
			setSteps(steps);
		};
		loadSteps();
	}, []);

	return (
		<Wrapper>
			{steps?.length > 0 &&
				possiblePaths?.map((path, i) => {
					const hasSuccessStep = path.find((stepId) => steps.find((s) => s._id === stepId)?.end);
					return (
						<Fragment key={i}>
							<Title>
								Chemin {i + 1} - {hasSuccessStep ? "✅" : "❌"}
							</Title>
							<Grid>
								{path?.map((stepId) => {
									const step = steps.find((s) => s._id === stepId) as stepType;
									return (
										<Fragment key={step._id}>
											<Linker />
											<Image src={step.imageUrl} isCurrent={step._id === currentStep._id} />
										</Fragment>
									);
								})}
							</Grid>
						</Fragment>
					);
				})}
		</Wrapper>
	);
};

export default StepVizualizer;
