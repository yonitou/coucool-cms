export interface stepType {
	_id: string;
	imageUrl: string;
	answers: {
		reference: { _ref: string };
		label: string;
	}[];
	start: boolean;
	end: boolean;
}
