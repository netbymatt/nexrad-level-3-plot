const fs = require('fs');
const { plot, writePngToFile } = require('../src');

// sizes to produce
const sizes = [100, 400, 900, 1350, 1800];

// get a list of all data files
const files = fs.readdirSync('./data/');

// plot each file
(async () => {
	await Promise.allSettled(files.map(async (file) => {
		console.log(file);
		try {
			const rawFile = fs.readFileSync(`./data/${file}`);
			// plot for each size
			return sizes.map((size) => {
				console.log(`${file} ${size}`);
				try {
					const level3Plot = plot(rawFile, { size });
					console.log(level3Plot);
					// test for returned image
					if (!level3Plot) return false;

					// write to disk
					return writePngToFile(`./output/${file}-${size}.png`, level3Plot);
				} catch (e) {
					console.error(e.message);
					return false;
				}
			});
		} catch (e) {
			console.error(e.message);
			return false;
		}
	}).flat());
})();
