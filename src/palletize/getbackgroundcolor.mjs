import { createCanvas } from 'canvas';

// get the background color by drawing a 1x1 pixel image
// this allows any form of color accepted by canvas.ctx to be used
const getBackgroundColor = (color) => {
	// make the canvas
	const canvas = createCanvas(1, 1);
	const ctx = canvas.getContext('2d');

	// fill the canvas
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, 1, 1);

	// get the color
	return ctx.getImageData(0, 0, 1, 1).data;
};

export default getBackgroundColor;
