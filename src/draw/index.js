const { createCanvas } = require('canvas');
const Palette = require('./palette');

const DEFAULT_OPTIONS = {
	// must be a square image
	size: 1800,
	background: 'black',
};

const draw = (data, product, _options) => {
	// combine options with defaults
	const options = {
		...DEFAULT_OPTIONS,
		..._options,
	};

	// calculate scale
	if (options.size > DEFAULT_OPTIONS.size) throw new Error(`Upsampling is not supported. Provide a size <= ${DEFAULT_OPTIONS.size}`);
	if (options.size < 1) throw new Error('Provide a size > 0');
	const scale = DEFAULT_OPTIONS.size / options.size;

	// create the canvas and context
	const canvas = createCanvas(options.size, options.size);
	const ctx = canvas.getContext('2d');

	// fill background with black
	ctx.fillStyle = options.background;
	ctx.fillRect(0, 0, options.size, options.size);

	// canvas settings
	ctx.imageSmoothingEnabled = true;
	// minimum line width of 2
	ctx.lineWidth = Math.max(2, 4 / scale);
	ctx.translate(options.size / 2, options.size / 2);
	ctx.rotate(-Math.PI / 2);

	// generate a palette
	const palette = Palette.generate(product.palette);
	// calculate scaling paramater with respect to pallet's designed criteria
	const paletteScale = (data?.productDescription?.plot?.maxDataValue ?? 255) / (product.palette.baseScale ?? data?.productDescription?.plot?.maxDataValue ?? 1);
	// use the raw values to avoid scaling and un-scaling
	data.radialPackets[0].radials.forEach((radial) => {
		const startAngle = radial.startAngle * (Math.PI / 180);
		const endAngle = startAngle + radial.angleDelta * (Math.PI / 180);
		// track max value for downsampling
		let maxDownsample = 0;
		let lastRemainder = 0;
		// for each bin
		radial.bins.forEach((bin, idx) => {
			// skip null values
			if (bin === null) return;
			let thisSample;
			// if test for downsampling
			if (scale !== 1) {
				const remainder = idx % scale;
				// test for rollover in scaling
				if (remainder < lastRemainder) {
					// plot this point and reset values
					thisSample = maxDownsample;
					maxDownsample = 0;
				}
				// store this sample
				maxDownsample = Math.max(bin, maxDownsample);
				// store for rollover tracking
				lastRemainder = remainder;
			} else {
				thisSample = bin;
			}
			// see if there's a sample to plot
			if (!thisSample) return;
			ctx.beginPath();
			ctx.strokeStyle = palette[Math.round(thisSample * paletteScale)];
			ctx.arc(0, 0, (idx + data.radialPackets[0].firstBin) / scale, startAngle, endAngle);
			ctx.stroke();
		});
	});

	return canvas;
};

module.exports = draw;
