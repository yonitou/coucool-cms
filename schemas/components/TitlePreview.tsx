import { styled } from "styled-components";
import { fontWeightEnum } from "../types/fontWeightEnum";
import { TitleLetter } from "../types/titleLetter.interface";

const Wrapper = styled.h2`
	font-size: 4rem;
	margin: 0;
	text-align: center;
`;

const Letter = styled.span<{ fontWeight: fontWeightEnum }>`
	font-family: Farce;
	font-weight: ${(props) => props.fontWeight};
`;

interface TitlePreviewProps {
	value: TitleLetter[];
}

const TitlePreview = ({ value }: TitlePreviewProps): JSX.Element => {
	return (
		<Wrapper>
			{value &&
				value.map((l) => {
					return (
						// eslint-disable-next-line no-underscore-dangle
						<Letter fontWeight={l.fontWeight} key={l._key}>
							{l.letter}
						</Letter>
					);
				})}
		</Wrapper>
	);
};

export default TitlePreview;
