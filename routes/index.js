var express = require('express');
var path = require('path');

console.log("Hello");


module.exports = function(router) {
  console.log("Hello");
  //Prepare a landing page for home page to show information about MyTransport application
  router.get('/',function(req,res,next){
  	res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
  })
}
