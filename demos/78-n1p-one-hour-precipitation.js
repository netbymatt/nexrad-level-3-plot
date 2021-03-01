const fs = require('fs');
const { plot } = require('../src');
const { writePngToFile } = require('../src/utils/file');

// read file
const fileName = 'LOT_N1P_2021_01_31_11_06_30';
const file = fs.readFileSync(`./demos/data/${fileName}`);

// pass to plotting engine as a string or buffer
const level3Plot = plot(file);

(async () => {
	writePngToFile(`./output/${fileName}.png`, level3Plot);
})();

console.log(level3Plot);
console.log();
