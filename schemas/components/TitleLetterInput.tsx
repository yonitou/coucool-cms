import { type ArrayOfObjectsInputProps } from "sanity";

import TitlePreview from "./TitlePreview";

const TitleLetterInput = (props: ArrayOfObjectsInputProps): React.ReactElement => {
	const { renderDefault, value } = props;

	return (
		<>
			<TitlePreview value={value} />
			{renderDefault(props)}
		</>
	);
};

export default TitleLetterInput;
