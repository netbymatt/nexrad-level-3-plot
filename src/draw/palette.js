// pallette utilities

// generate a palette as rgb[a](r,g,b)
// input can be rgb (3) or rgba (4) palette[] elements per color
// output can be structured the same as input
const generate = (palette = [], _options) => {
	// combine options with defaults
	const options = {
		inSize: 3,
		outSize: 4,
		..._options,
	};

	const output = [];
	for (let i = 0; i < palette.length; i += options.inSize) {
		const color = palette.slice(i, i + options.inSize);
		if (options.outSize === 3) output.push(`rgb(${color[0]},${color[1]},${color[2]})`);
		if (options.outSize === 4) output.push(`rgba(${color[0]},${color[1]},${color[2]},${(color[3] ?? 255) / 255})`);
	}
	return output;
};

module.exports = {
	generate,
};
