var $ = require('jquery')
var getRequest = require('./getRequest.js')
var handlebars = require('handlebars')

module.exports = function() {
  getRequest('http://localhost:3000/palettes', appendToList)

  function appendToList(data){
    $('#palettelist').empty('')
    var theTemplateScript = $("#myPalettes-Template").html()
    //Compile the template​
    var theTemplate = handlebars.compile(theTemplateScript);
    console.log("data", data)
    $("#palettelist").append(theTemplate(data));
  }
}
