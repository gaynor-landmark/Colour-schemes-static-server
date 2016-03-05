var $ = require('jquery')
var ColorPicker = require('simple-color-picker');
var rgb2hex = require('./rgb2hex.js')
var hex2rgb = require('./hex2rgb.js')
var clearPalette = require('./clearPalette.js')
var savePalette = require('./savePalette.js')
var colourlovers = require('colourlovers')
var appendPalettes = require('./appendPalettes.js')

module.exports = function(){
  //create the colour picker
  var colorPicker = new ColorPicker();
  colorPicker.appendTo(document.querySelector("#picker"))       // append the picker to the document
  var colString = colorPicker.getHexString()
  colorPicker.on('update', function(){
    colString = colorPicker.getHexString()
  })
  inspirePalette()
  setSwatchesToWhite()

function addFromColourLoversPalette(target) {
  var which = target.id
  clColString = target.style.background
    var added = false
    for (var i = 1; i< 6; i++) {
      myswatch = "#swatch" + i
      mycolour = "#colour" + i
      var hexcol = rgb2hex($(myswatch).css('background-color'))
      if (hexcol.toUpperCase() === '#FFFFFF'){
        //change the part of the site example based on the option selected
        document.querySelector(myswatch).style.background = clColString
  //      document.querySelector(mycolour).style.background = clColString
        added = true
        break
       }
    }
    if (!added) alert("The palette is full. Click on a colour to remove it before adding another.")

}

 function setSwatchesToWhite(){
   for (var i = 1; i< 6; i++) {
     myswatch = "#swatch" + i
     document.querySelector(myswatch).style.background = 'rgb(255,255,255)'
   }
 }

  // listen to the add button
  function addToPalette(which){

    console.log("addToPalette", which)
      var myswatch = "#" + which
      var mycolour = myswatch.replace("swatch", "colour")
      var hexcol = rgb2hex($(myswatch).css('background-color'))
      if (hexcol.toUpperCase() === '#FFFFFF'){
        //change the part of the site example based on the option selected
        document.querySelector(myswatch).style.background = colString
      //  document.querySelector(mycolour).style.background = colString
        added = true
       }
       else {
         //return to white
         document.querySelector(myswatch).style.background = '#FFFFFF'
      //   document.querySelector(mycolour).style.background = '#FFFFFF'
       }
  }



 function updateElement(col){
   console.log("update element")
   if ($("#selectElement").val() === "BCK") {
     $('#siteTemplate').css("background-color", col)
   } else if ($("#selectElement").val() === "ART") {
     $('#siteText').css("background-color", col)
   } else if ($("#selectElement").val() === "FNT") {
     $('body').css("color", col)
   } else if ($("#selectElement").val() === "FOO") {
     $('footer').css("background-color", col)
   } else if ($("#selectElement").val() === "SEC") {
     $('#secondaryText').css("background-color", col)
   }
 }



  $('#colour1').click(function (e){
    updateElement(document.querySelector('#colour1').style.background)
  })
  $('#colour2').click(function (e){
    updateElement(document.querySelector('#colour2').style.background)
  })
  $('#colour3').click(function (e){
    updateElement(document.querySelector('#colour3').style.background)
  })
  $('#colour4').click(function (e){
    updateElement(document.querySelector('#colour4').style.background)
  })
  $('#colour5').click(function (e){
    updateElement(document.querySelector('#colour5').style.background)
  })


  $('#clearButton').click(function(e){clearPalette()})

  $('#saveButton').click(function(e){
    var paletteJson = {}
    paletteJson.Name = $('#palettename').val()
    coloursString = ""
    for (var c = 1; c < 6; c++){
      var myswatch = "#swatch" + c
      console.log("click", mycolour)
      coloursString += (document.querySelector(myswatch).style.background) + "|"
    }

    paletteJson.Colours = coloursString
    console.log(paletteJson)
    savePalette(paletteJson)
  })

  $('#randomButton').click(function(e){inspirePalette()})
  for (var a = 1; a < 6; a++) {
    var myswatch = "#swatch" + a
    $(myswatch).click(function(e){addToPalette(e.target.id)})
  }
  for (var b = 1; b < 6; b++) {
    var myswatch = "#swatch" + (b * 10)
    $(myswatch).click(function(e){addFromColourLoversPalette(e.target)})
  }
  $('.createButton').click(function(){
    console.log("return")
    window.location = './index.html'
  })
  $('#tryButton').click(function(e){
    console.log("intry")
    var qString = createQueryString()
    window.location = './tryItOut.html' + qString
  })

  $('#myPalettesButton').click(function(){
    console.log("click")
    appendPalettes()
    // window.location = './myPalettes.html' + paletteQueryString()
  })
}

var inspirePalette = () => {
  // console.log("inspire")
// retrieve a set of the 50 top palettes from colourlovers.com
$.getJSON('http://www.colourlovers.com/api/palettes/top?jsonCallback=?&numResults=50', function(data){
    var clPalette = data[Math.floor(Math.random()*50)];   // choose one randomly to display
    for (var c = 1; c < 6; c++){
      myswatch = "#swatch" + c * 10
      document.querySelector(myswatch).style.background =  hex2rgb(clPalette["colors"][c - 1])
    }
  });
}

function createQueryString(){
  var qString = "?"
  for (var i = 1; i< 6; i++) {
    myswatch = "#swatch" + i
    var hexcol = rgb2hex($(myswatch).css('background-color'))
    console.log(myswatch, hexcol, typeof hexcol)

    if (i === 5){
      qString += hexcol
    } else {
      qString += hexcol + "|"
    }
   }
   console.log(qString)
  return qString
}
