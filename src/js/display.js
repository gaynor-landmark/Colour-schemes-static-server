var $ = require('jquery')
var colourlovers = require('colourlovers')
var ColorPicker = require('simple-color-picker')
var handlebars = require('handlebars')
var request = require('superagent')

var rgb2hex = require('./rgb2hex.js')
var hex2rgb = require('./hex2rgb.js')
var clearPalette = require('./clearPalette.js')
var savePalette = require('./savePalette.js')
var loadCustomPalette = require('./loadCustomPalette.js')
var appendPalettes = require('./appendPalettes.js')
var addFromColourLoversPalette = require('./addFromColourLoversPalette.js')
var addToPalette = require('./addToPalette.js')
var updateElement = require('./updateElement.js')
var inspirePalette = require('./inspirePalette.js')
var addListeners = require('./addListeners.js')

module.exports = function(){
  //create the colour picker
  var colorPicker = new ColorPicker();
  colorPicker.appendTo(document.querySelector("#picker"))       // append the picker to the document
  var colString = colorPicker.getHexString()
  colorPicker.on('update', function(){
    colString = colorPicker.getHexString()
  })
  inspirePalette()
  clearPalette()
  loadCustomPalette()


  addListeners()


  // add listeners to custom palette
  for (var a = 1; a < 6; a++) {
    var myswatch = "#swatch" + a
    $(myswatch).click(function(e){addToCustomPalette(e.target.id)})
  }


  function addToCustomPalette(which){
    console.log("add to pal")
      var myswatch = "#" + which
      var mycolour = myswatch.replace("swatch", "colour")
      var myhex = mycolour.replace("colour", "hex")
      var hexcol = rgb2hex($(myswatch).css('background-color'))
      console.log('hexcol', hexcol)

      if (hexcol.toUpperCase() === '#FFFFFF'){
        var pickColString = colorPicker.getHexString()
        document.querySelector(myswatch).style.background = pickColString
        $(myhex).text(pickColString.toUpperCase())

       }
       else {
         //return to white
         document.querySelector(myswatch).style.background = '#FFFFFF'
         $(myhex).text('#FFFFFF')
       }
  }

}



function welcome(name){
  //get the current user
  function welcomeTemplate (err, res) {
    var theTemplateScript = $("#myUser-Template").html()
    //Compile the template​
    var theTemplate = handlebars.compile(theTemplateScript)
    console.log("data", res)
    $("#welcome").append(theTemplate({user: name}))
  }
}


function createQueryString(){
  var qString = "?"
  for (var i = 1; i< 6; i++) {
    myswatch = "#swatch" + i
    var hexcol = rgb2hex($(myswatch).css('background-color'))
    if (i === 5){
      qString += hexcol
    } else {
      qString += hexcol + "|"
    }
  }
  return qString
}
