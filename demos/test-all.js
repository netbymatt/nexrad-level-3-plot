const fs = require('fs');
const { plot, writePngToFile } = require('../src');

// get a list of all data files
const files = fs.readdirSync('./data/');

// plot each file
(async () => {
	await Promise.allSettled(files.map(async (file) => {
		console.log(file);
		try {
			const rawFile = fs.readFileSync(`./data/${file}`);
			const level3Plot = plot(rawFile);
			console.log(level3Plot);
			// write to disk
			await writePngToFile(`./output/${file}.png`, level3Plot);
		} catch (e) {
			console.error(e.message);
		}
	}));
})();
