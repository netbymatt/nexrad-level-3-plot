const fs = require('fs');
const { plot } = require('../src');

// read file
const file = fs.readFileSync('./demos/data/LOT_N1P_2021_01_31_11_06_30');

// pass to plotting engine as a string or buffer
const level3Plot = plot(file);

console.log(level3Plot);
console.log();
