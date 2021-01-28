const empty = {
	start: { x: 3, y: 10 },
	end: { x: 17, y: 10 },
	walls: [],
};

const walledStartOrtho = {
	start: { x: 3, y: 10 },
	end: { x: 17, y: 10 },
	walls: [
		{ x: 4, y: 10 },
		{ x: 3, y: 11 },
		{ x: 2, y: 10 },
		{ x: 3, y: 9 },
	],
};

const walledEndOrtho = {
	start: { x: 3, y: 10 },
	end: { x: 17, y: 10 },
	walls: [
		{ x: 18, y: 10 },
		{ x: 17, y: 11 },
		{ x: 16, y: 10 },
		{ x: 17, y: 9 },
	],
};


export default {
	empty,
	walledStartOrtho,
	walledEndOrtho,
};