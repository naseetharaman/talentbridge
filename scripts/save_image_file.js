var fs = require('fs');
//var decode64 = require('base64').decode;

//read file and convert to base64; 

//read the base64 content and convert to binary image file again and save it

var base64Data = fs.readFileSync('./Tulips.jpg','base64');

//console.log(base64Data);
//process.exit();
var buffer = new Buffer(base64Data,'base64');
//var buffer = Buffer.from(base64Data,'base64');

console.log(buffer);
fs.writeFileSync('./Tulips_new.jpeg',buffer, 'binary');
