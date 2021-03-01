const fs = require('fs');
// write a canvas to a Png file
const writePngToFile = (fileName, canvas) => new Promise((resolve, reject) => {
	const writeStream = fs.createWriteStream(fileName);
	canvas.createPNGStream().pipe(writeStream);
	writeStream.on('finish', () => resolve(fileName));
	writeStream.on('error', (e) => reject(e));
});

module.exports = {
	writePngToFile,
};
