// calcaulate a value that is i.e. 1/3 of the way between a and b
// a = 12, b = 0, num = 1, den = 3 returns 4
// a = 20, b = 10, num = 1, den = 4 returns 12.5
const calcIntermediate = (a, b, num, den) => {
	const diff = a - b;
	return ((diff * num) / den + b);
};

export default calcIntermediate;
