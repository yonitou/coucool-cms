import { type ObjectInputProps } from "sanity";
import styled from "styled-components";

import { isTitleLetter } from "../types/titleLetter.interface";

const Preview = styled.span`
	display: block;
	font-family: Farce;
	font-size: 3rem;
	text-align: center;
`;

const LetterPreviewInput = (props: ObjectInputProps): React.ReactElement => {
	const { renderDefault, value } = props;

	return (
		<>
			{isTitleLetter(value) && <Preview style={{ fontWeight: value.fontWeight }}>{value.letter}</Preview>}
			{renderDefault(props)}
		</>
	);
};

export default LetterPreviewInput;
