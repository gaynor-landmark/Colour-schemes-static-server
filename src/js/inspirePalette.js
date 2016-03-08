var $ = require('jquery')
var hex2rgb = require('./hex2rgb.js')

module.exports = function(){
  // retrieve a set of the 50 top palettes from colourlovers.com
  $.getJSON('http://www.colourlovers.com/api/palettes/top?jsonCallback=?&numResults=50', function(data){
    var clPalette = data[Math.floor(Math.random()*50)]  // choose one randomly to display
    $("#clname").text(clPalette["title"] + ' by ' + clPalette["userName"])
    for (var c = 1; c < 6; c++){
      myswatch = "#swatch" + c * 10
      myhex = myswatch.replace("swatch", "hex")
      document.querySelector(myswatch).style.background =  hex2rgb(clPalette["colors"][c - 1])
      $(myhex).text('#' + clPalette["colors"][c - 1])
    }
  })
}
