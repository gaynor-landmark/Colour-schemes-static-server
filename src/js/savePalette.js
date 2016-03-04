var $ = require('jquery')
var request = require('superagent')
// save the palette by name
module.exports = function savePalette(palette){

  console.log("in save", palette)

  request.post('http://localhost:3000/palettes')
  .send(palette)
  .end(function(err, res){
    console.log("response")
  })

}
