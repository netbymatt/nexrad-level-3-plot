// palletize an image
const generatePalette = require('./generatepalette');

// default options
const DEFAULT_OPTIONS = {
	generate: 0,
	palette: [],
};

const cache = {};

const palletize = (image, product, _options) => {
	// combine options and defaults
	const options = combineOptions(_options, product);

	// always call the generate palette function
	// it will return a key for caching purposes and add the necessary transparent index
	const { palette, key } = generatePalette(options.palette, options.generate, _options.background, product);
};

// manually combine options
const combineOptions = (_options, product) => {
	let options = _options;
	if (typeof _options.palletize === 'boolean') {
		// use all defaults
		options = DEFAULT_OPTIONS;
	} else {
		// combine provided options with defaults
		options = {
			...DEFAULT_OPTIONS,
			_options,
		};
	}
	// load the product's palette if none provided
	if (!options.palette || options.palette.length === 0) {
		options.palette = product.palette;
	}
	return options;
};

module.exports = palletize;
