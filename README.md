# nexrad-level-3-plot

> A javascript implementation for plotting Nexrad Level III data parsed via [nexrad-level-3-data](https://github.com/netbymatt/nexrad-level-3-data/).

# Work in Progress
This package is currently incomplete. It will plot raster data created by the package mentioned above but there are several limitations that will be addressed in future releases.
- Color scales do not dynamically change when needed such as with total precipitation products.
- The size of the output image is hard coded to 1800x1800
- Background color/transparency is hard coded
- Only some products are [supported](#supported-products)

## Supported Products
|ID|Code|Description|
|---|---|---|
78|N1P|One-hour precipitation
80|NTP|Storm total precipitation
170|DAA|Digital One Hour Accumulation
172|DTA|Digital Total Accumulation

# Demos
Test code and data is provided in the `./demo` folder. `test.js` can be used to test any one of the products by commenting/uncommenting the appropriate line in the file. All images will be output as PNG to `./output`. A `test-all.js` is also provided to plot all of the products provided in the `./data/` folder.

# Acknowledgements
The code for this project is based upon:
- [nexrad-level-3-data](https://github.com/netbymatt/nexrad-level-3-data/)
- [Unidata](https://github.com/Unidata/thredds/blob/master/cdm/src/main/java/ucar/nc2/iosp/nexrad2/)
- [nexrad-radar-data](https://github.com/bartholomew91/nexrad-radar-data)
- And my own fork of the above [netbymatt/nexrad-level-2-data](https://github.com/netbymatt/nexrad-level-2-data)