var $ = require('jquery')
var postRequest = require('./postRequest')
// save the palette by name
module.exports = function savePalette(palette){
  console.log("in save", palette)
  postRequest('http://localhost:3000/palettes', palette, saved)

  function saved(resp){
    console.log(resp)
    alert("Saved!")
  }
}
