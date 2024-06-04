import { glob } from 'glob';

// load all products in folder automatically
const allDescriptors = await glob('/descriptors/**/*.mjs', { root: import.meta.dirname, windowsPathsNoEscape: true });
const productsRaw = await Promise.all(allDescriptors.map((descriptor) => import(`file:///${descriptor}`)));

// make up a list of products by integer type
const products = {};
productsRaw.forEach((product) => {
	if (products[product.code]) { throw new Error(`Duplicate product code ${product.code}`); }
	products[product.code] = product;
});

// list of available product code abbreviations for type-checking
const productAbbreviations = productsRaw.map((product) => product.abbreviation).flat();

export {
	products,
	productAbbreviations,
};
