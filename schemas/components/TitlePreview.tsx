import { styled } from "styled-components";

import { type fontWeightEnum } from "../types/fontWeightEnum";
import { isTitleLetterArray } from "../types/titleLetter.interface";

const Wrapper = styled.h2`
	font-size: 4rem;
	margin: 0;
	text-align: center;
`;

const Letter = styled.span<{ fontWeight: fontWeightEnum }>`
	font-family: Farce;
	font-weight: ${(props) => props.fontWeight};
`;

interface TitlePreviewProperties {
	value: unknown;
}

const TitlePreview = ({ value }: TitlePreviewProperties): null | React.ReactElement => {
	if (!isTitleLetterArray(value)) {
		return null;
	}

	return (
		<Wrapper>
			{value.map((l) => {
				return (
					<Letter fontWeight={l.fontWeight} key={l._key}>
						{l.letter}
					</Letter>
				);
			})}
		</Wrapper>
	);
};

export default TitlePreview;
