# nexrad-level-3-plot

> A javascript implementation for plotting Nexrad Level III data parsed via [nexrad-level-3-data](https://github.com/netbymatt/nexrad-level-3-data/).

# Use
## Install
```bash
npm -i nexrad-level-3-plot
```

## Call
```javascript
const fs = require('fs');
const { plot, writeToPngFile } = require('nexrad-level-3-plot');

// read a file
const file = fs.readFileSync('<path to data>');
// parse and plot
const level3Plot = plot(file);
// use bundled utility to write to disk
(async () => {
	await writePngToFile('<path to output>.png');
})();
```
# Data
Level three data is available from NOAA free of charge. [nexrad-level-3-data](https://github.com/netbymatt/nexrad-level-3-data/#background-information) has additional details about these data sources.

# Work in Progress
This package is currently incomplete. It will plot raster data created by the package mentioned above but there are several limitations that will be addressed in future releases.
- Color scales do not dynamically change when needed such as with total precipitation products.
- Only some products are [supported](#supported-products)

## Supported Products
|ID|Code|Description|
|---|---|---|
78|N1P|One-hour precipitation
80|NTP|Storm total precipitation
170|DAA|Digital One Hour Accumulation
172|DTA|Digital Total Accumulation

# Demos
Test code and data is provided in the `./demo` folder. `test.js` can be used to test any one of the products by commenting/uncommenting the appropriate line in the file. All images will be output as PNG to `./output`. A `test-all.js` is also provided to plot all of the products provided in the `./data/` folder. This test will product images in multiple sizes to show scaling built-in scaling functionality.

# API

## plot(file, options)
Returns a [Canvas](https://www.npmjs.com/package/canvas) object.

|Paramater|Type|Default|Description|
|---|---|---|---|
file|Buffer or ReadableStream||A NOAA Nexrad level 3 data file to plot. See [data](#data).
options.size|integer|1800|1 to 1800. Size of the x and y axis in pixels. The image must be square so only a single integer is needed. See [downsampling](#downsampling)
options.background|string|#000000|Background color of the image. This can be transparent by using #RGBA notation. See [ctx.fillStyle](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle) for more information.

### Downsampling
A full size plot is 1800 x 1800 pixels. This corresponds to the maximum range of the radar ~250 mi * maximum resolution 0.25 mi/bin * 2 (east and west side of radar).

options.size < 1800 will internally scale the image to the selected size. The scaling algorithm is specific to radar data and returns the maximum value over the range of bins that are combined due to the scaling factor. This ensures that maximum reflectivity or maximum velocity are preserved during the scaling process. Using an image scaling package is not preferred in this case as the scaling algorithm used my mask important data.

options.size > 1800 is invalid as this would cause data to be interpolated and would not be a true representation of the data returned by the radar. If you need this functionality it's recommended to use an image scaling package such as [jimp](https://www.npmjs.com/package/jimp) or [gm](https://www.npmjs.com/package/gm) on the Canvas returned by plot().

## writePngToFile(fileName, canvas)
Returns a Promise which resolves to the written file name.
Writes a PNG file to disk. Provided as a convenience function for production and testing.
|Paramater|Type|Description|
|---|---|---|
fileName|string|A file name or path used by [fs.createWriteStream()](https://nodejs.org/api/fs.html#fs_fs_createwritestream_path_options).
canvas|[Canvas](https://www.npmjs.com/package/canvas)|Typically the output of [plot()](#plotfile-options).

# Acknowledgements
The code for this project is based upon:
- [nexrad-level-3-data](https://github.com/netbymatt/nexrad-level-3-data/)
- [Unidata](https://github.com/Unidata/thredds/blob/master/cdm/src/main/java/ucar/nc2/iosp/nexrad2/)
- [nexrad-radar-data](https://github.com/bartholomew91/nexrad-radar-data)
- And my own fork of the above [netbymatt/nexrad-level-2-data](https://github.com/netbymatt/nexrad-level-2-data)