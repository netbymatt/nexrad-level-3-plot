const code = 80;
const abbreviation = 'NTP';
const description = 'Storm total precipitation';

// 4-bit palette
// same as 78 N1P
const { palette } = await import('../78/index.mjs');

export {
	code,
	abbreviation,
	description,
	palette,
};
