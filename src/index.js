const NexradLevel3Data = require('nexrad-level-3-data');
const { products, productAbbreviations } = require('./products');
const draw = require('./draw');
const { writePngToFile } = require('./utils/file');

const plotAndData = (file, options) => {
	// parse the file
	const data = NexradLevel3Data(file);
	// test the product code and product type
	if (!productAbbreviations.includes(data.textHeader.type)) throw new Error(`Unsupported product ${data.textHeader.type}`);
	// get the product
	const product = products[data.productDescription.code];
	if (!product) throw new Error(`Unsupported product code ${data.productDescription.code}`);

	// call the draw function
	const image = draw(data, product, options);

	return {
		image,
		data,
	};
};

const plot = (file, options) => {
	const { image } = plotAndData(file, options);
	return image;
};

module.exports = {
	plot,
	writePngToFile,
	plotAndData,
};
