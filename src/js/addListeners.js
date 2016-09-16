var $ = require('jquery')
var rgb2hex = require('./rgb2hex')
var savePalette = require('./savePalette')
var updateElement = require('./updateElement')
var hex2rgb = require('./hex2rgb.js')
var clearPalette = require('./clearPalette.js')
var loadCustomPalette = require('./loadCustomPalette.js')
var appendPalettes = require('./appendPalettes.js')
var addFromColourLoversPalette = require('./addFromColourLoversPalette.js')
var addToPalette = require('./addToPalette.js')
var inspirePalette = require('./inspirePalette')

module.exports = function (){
  $('#clearButton').click(function(e){clearPalette()})

  $('#saveButton').click(function(e){
    var paletteJson = {}
    paletteJson.Name = $('#palettename').val()
    if (!paletteJson.Name.trim()){
      alert("Your palette needs a name before it can be saved.")
    } else {
      coloursString = ""
      for (var c = 1; c < 6; c++){
        var myswatch = "#swatch" + c
        coloursString += (rgb2hex(document.querySelector(myswatch).style.background)) + "|"
      }
      paletteJson.Colours = coloursString
      savePalette(paletteJson)
    }
  })

  for (var c = 1; c < 6; c++) {
    var mycolour = "#colour" + c
    $(mycolour).click(function (e){
      updateElement(document.querySelector(mycolour).style.background)
    })
  }


  // add listeners to colourlovers palette
  for (var b = 1; b < 6; b++) {
    var myswatch = "#swatch" + (b * 10)
    $(myswatch).click(function(e){addFromColourLoversPalette(e.target)})
  }
  $('#randomButton').click(function(e){inspirePalette()})

  $('#tryButton').click(function(e){
    var qString = createQueryString()
    window.location = './tryItOut.html' + qString
  })

  $('#myPalettesButton').click(function(){
    appendPalettes()
  })

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
