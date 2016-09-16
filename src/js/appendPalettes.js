var $ = require('jquery')
var getRequest = require('./getRequest.js')
var handlebars = require('handlebars')

module.exports = function() {
  console.log('in append')
  getRequest('http://colour-schemes-static-server.herokuapp.com/palettes', appendToList)

  function appendToList(data){
console.log("appendtolist", data)

    $('#palettelist').empty('')
    var theTemplateScript = $("#myPalettes-Template").html()
    //Compile the template​
    var theTemplate = handlebars.compile(theTemplateScript)
    console.log("data", data)
    $("#palettelist").append(theTemplate(data))
  }
}
