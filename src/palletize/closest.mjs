// return the index of the closest color match in the palette

// memoize results by provided key.
const cache = {};

const closest = (match, palette, key) => {
	// generate cache key
	if (!cache[key]) cache[key] = {};

	// short circuit previously calculated matches
	const asHex = match[0].toString(16).padStart(2, '0') + match[1].toString(16).padStart(2, '0') + match[2].toString(16).padStart(2, '0');
	if (cache[key][asHex]) return cache[key][asHex];

	// initial conditions
	let closestIndex = 0;
	let closestDist = Infinity;
	// loop through array
	for (let i = 0; i < palette.length; i += 4) {
		const dist = geometricDistance(match, palette.slice(i, i + match.length));
		// test for closer
		if (dist < closestDist) {
			closestDist = dist;
			closestIndex = i / 4;
			// short circuit on exact match
			if (dist === 0) break;
		}
	}
	// store closest match to speed up next iteration
	cache[key][asHex] = closestIndex;
	return closestIndex;
};

const geometricDistance = (a, b) => a.reduce((acc, val, idx) => acc + (val - b[idx]) ** 2, 0);

export default closest;
