const code = 172;
const abbreviation = 'DTA';
const description = 'Digital Total Accumulation';

// 4-bit palette
// same as 78 N1P
const palette = [];
for (let i = 0; i < 256; i += 1) {
	palette.push(0, 0, i * 4);
}

module.exports = {
	code,
	abbreviation,
	description,
	palette,
};
