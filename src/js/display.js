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

 // function addListeners(){
 //   $('#clearButton').click(function(e){clearPalette()})
 //
 //   $('#saveButton').click(function(e){
 //     var paletteJson = {}
 //     paletteJson.Name = $('#palettename').val()
 //     if (!paletteJson.Name.trim()){
 //       alert("Your palette needs a name before it can be saved.")
 //     } else {
 //       coloursString = ""
 //       for (var c = 1; c < 6; c++){
 //         var myswatch = "#swatch" + c
 //         coloursString += (rgb2hex(document.querySelector(myswatch).style.background)) + "|"
 //       }
 //       paletteJson.Colours = coloursString
 //       savePalette(paletteJson)
 //     }
 //   })
 //
 //   for (var c = 1; c < 6; c++) {
 //     var mycolour = "#colour" + c
 //     $(mycolour).click(function (e){
 //       updateElement(document.querySelector(mycolour).style.background)
 //     })
 //   }
 //
 //   // add listeners to custom palette
 //   for (var a = 1; a < 6; a++) {
 //     var myswatch = "#swatch" + a
 //     $(myswatch).click(function(e){addToPalette(e.target.id)})
 //   }
 //   // add listeners to colourlovers palette
 //   for (var b = 1; b < 6; b++) {
 //     var myswatch = "#swatch" + (b * 10)
 //     $(myswatch).click(function(e){addFromColourLoversPalette(e.target)})
 //   }
 //   $('#randomButton').click(function(e){inspirePalette()})
 //
 //   $('#tryButton').click(function(e){
 //     var qString = createQueryString()
 //     window.location = './tryItOut.html' + qString
 //   })
 //
 //   $('#myPalettesButton').click(function(){
 //     appendPalettes()
 //   })
 //
 // }

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
