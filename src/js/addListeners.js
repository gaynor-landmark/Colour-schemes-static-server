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

  // add listeners to custom palette
  for (var a = 1; a < 6; a++) {
    var myswatch = "#swatch" + a
    $(myswatch).click(function(e){addToPalette(e.target.id)})
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
