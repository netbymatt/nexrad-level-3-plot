// palletize an image
const { createCanvas } = require('canvas');
const generatePalette = require('./generatepalette');
const closest = require('./closest');

// default options
const DEFAULT_OPTIONS = {
	generate: 0,
	palette: [],
};

const palletize = (sourceCtx, product, _options) => {
	// combine options and defaults
	const options = combineOptions(_options, product);

	// always call the generate palette function
	// it will return a key for caching purposes and add the necessary transparent index
	const { palette, key } = generatePalette(options.palette, options.generate, _options.background, product);

	// get original image data
	const sourceImageData = sourceCtx.getImageData(0, 0, _options.size, _options.size);

	// create indexed canvas
	const indexedCanvas = createCanvas(_options.size, _options.size);
	const indexedCtx = indexedCanvas.getContext('2d', { pixelFormat: 'A8' });
	const indexedImageData = indexedCtx.getImageData(0, 0, _options.size, _options.size);

	// loop through each pixel
	indexedImageData.data.forEach((val, idx) => {
		indexedImageData.data[idx] = closest(sourceImageData.data.slice(idx * 4, idx * 4 + 3), palette, key);
	});

	// write new data
	indexedCtx.putImageData(indexedImageData, 0, 0);

	// attach palette and return
	indexedCanvas.palette = palette;
	return indexedCanvas;
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
