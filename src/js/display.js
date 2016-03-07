var $ = require('jquery')
var colourlovers = require('colourlovers')
var ColorPicker = require('simple-color-picker')

var rgb2hex = require('./rgb2hex.js')
var hex2rgb = require('./hex2rgb.js')
var clearPalette = require('./clearPalette.js')
var savePalette = require('./savePalette.js')
var handlebars = require('handlebars')

var request = require('superagent')

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
  clearPalette()
 welcome("Guest")



function addFromColourLoversPalette(target) {
  var which = target.id
  var clColString = target.style.background
  var added = false

  // add the colour to the next available swatch
  for (var i = 1; i< 6; i++) {
    var myswatch = "#swatch" + i
    var mycolour = "#colour" + i
    var myhex = "#hex" + i
    var hexcol = rgb2hex($(myswatch).css('background-color'))
    if (hexcol.toUpperCase() === '#FFFFFF'){
        document.querySelector(myswatch).style.background = clColString
        clColString = rgb2hex(clColString).toUpperCase()
        console.log("cl", clColString)
        $(myhex).text(clColString)
        added = true
        break
       }
    }
    if (!added) alert("The palette is full. Click on a colour to remove it before adding another.")
}


// add the picked colour to the palette
  function addToPalette(which){
    console.log("add to pal")
      var myswatch = "#" + which
      var mycolour = myswatch.replace("swatch", "colour")
      var myhex = mycolour.replace("colour", "hex")
      var hexcol = rgb2hex($(myswatch).css('background-color'))

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

  $('#randomButton').click(function(e){inspirePalette()})

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


  $('#tryButton').click(function(e){
    var qString = createQueryString()
    window.location = './tryItOut.html' + qString
  })

  $('#myPalettesButton').click(function(){
    console.log("listen mypalettes")
    appendPalettes()
    // window.location = './myPalettes.html' + paletteQueryString()
  })

}

function welcome(name){
  //get the current user

//  getRequest('http://localhost:3000/user', welcomeTemplate)

  function welcomeTemplate (err, res) {
    var theTemplateScript = $("#myUser-Template").html()
    //Compile the template​
    var theTemplate = handlebars.compile(theTemplateScript)
    console.log("data", res)
    $("#welcome").append(theTemplate({user: name}))
  }
}

const inspirePalette = () => {
  // retrieve a set of the 50 top palettes from colourlovers.com
  $.getJSON('http://www.colourlovers.com/api/palettes/top?jsonCallback=?&numResults=50', function(data){
    var clPalette = data[Math.floor(Math.random()*50)];   // choose one randomly to display
    $("#clname").text(clPalette["title"] + ' by ' + clPalette["userName"])
    for (var c = 1; c < 6; c++){
      myswatch = "#swatch" + c * 10
      myhex = myswatch.replace("swatch", "hex")
      document.querySelector(myswatch).style.background =  hex2rgb(clPalette["colors"][c - 1])
      $(myhex).text('#' + clPalette["colors"][c - 1])
    }
  });
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
