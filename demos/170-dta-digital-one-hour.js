const fs = require('fs');
const { plot } = require('../src');
const { writePngToFile } = require('../src/utils/file');

// read file
const fileName = 'LOT_DAA_2021_02_28_12_14_47';
const file = fs.readFileSync(`./demos/data/${fileName}`);

// pass to plotting engine as a string or buffer
const level3Plot = plot(file);

(async () => {
	writePngToFile(`./demos/output/${fileName}.png`, level3Plot);
})();

console.log(level3Plot);
console.log();
