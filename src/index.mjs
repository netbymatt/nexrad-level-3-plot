import NexradLevel3Data from 'nexrad-level-3-data';
import { products, productAbbreviations } from './products/index.mjs';
import { draw } from './draw/index.mjs';
import palletize from './palletize/index.mjs';
import { writePngToFile } from './utils/file.mjs';

const plotAndData = (file, _options) => {
	const options = combineOptions(_options);
	// parse the file
	const data = NexradLevel3Data(file);
	// test the product code and product type
	if (!productAbbreviations.includes(data.textHeader.type)) throw new Error(`Unsupported product ${data.textHeader.type}`);
	// get the product
	const product = products[data.productDescription.code];
	if (!product) throw new Error(`Unsupported product code ${data.productDescription.code}`);

	// test for a null product code
	if (data.productDescription.nullProductFlag) {
		return {
			image: null,
			data,
		};
	}
	// call the draw function
	const image = draw(data, product, options);

	// stop here if not asking for a palletized image
	if (!options?.palletize) {
		return {
			image, data,
		};
	}

	// palletize image, but fail gracefully if the palletize function is configured incorrectly
	try {
		const palletized = palletize(image.getContext('2d'), product, options);
		return {
			image,
			palletized,
			data,
		};
	} catch (e) {
	// don't return the failed palletized image
		options.logger.error(e.stack);
		return {
			image,
			data,
		};
	}
};

const plot = (file, options) => {
	const { image, palletized } = plotAndData(file, options);
	return palletized ?? image;
};

// combine options and defaults
const combineOptions = (newOptions) => {
	let logger = newOptions?.logger ?? console;
	if (logger === false) logger = nullLogger;
	return {
		...newOptions, logger,
	};
};

// null logger for options.logger = false
const nullLogger = {
	log: () => {},
	error: () => {},
};

export {
	plot,
	writePngToFile,
	plotAndData,
};
