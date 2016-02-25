var $ = require('jquery')
var ColorPicker = require('simple-color-picker');
var rgb2hex = require('./rgb2hex.js')

module.exports = function(){
  //create the colour picker
  var colorPicker = new ColorPicker();
  colorPicker.appendTo(document.querySelector("#picker"))       // append the picker to the document
  var colString = colorPicker.getHexString()
  colorPicker.on('update', function(){
    colString = colorPicker.getHexString()

     console.log("picker clicked", colString)

  })

  // listen to the add button
  $("#add").on("click", function addToPalette(){
    var added = false
    for (var i = 1; i < 7; i++){
      myswatch = "#swatch" + i
      mycolour = "#colour" + i
      //console.log(myswatch, document.querySelector(myswatch).style.background)
      var hexcol = rgb2hex($(myswatch).css('background-color'))
      console.log(myswatch, hexcol, typeof hexcol)
      // console.log(myswatch, rgb2hex(document.querySelector(myswatch).style.background))
      if (hexcol.toUpperCase() === '#FFFFFF'){
        //change the part of the site example based on the option selected
        document.querySelector(myswatch).style.background = colString
        document.querySelector(mycolour).style.background = colString
        added = true
        break
       }
    }
    if (!added) alert("The palette is full.")
  })

  // // listen to the coloured buttons
  // for (var c = 1; c < 7; c++){
  //   var myColourButton = '#colour' + c
  //   $(myColourButton).click(function (e){
  //     if ($("#selectElement").val() === "BCK") {
  //       $('#siteTemplate').css("background-color", document.querySelector(myColourButton).style.background)
  //     } else if ($("#selectElement").val() === "ART") {
  //       $('#siteText').css("background-color", document.querySelector(myColourButton).style.background)
  //     } else if ($("#selectElement").val() === "FNT") {
  //       $('body').css("color", document.querySelector(myColourButton).style.background)
  //     }
  //   })
  // }

 function updateElement(col){
   if ($("#selectElement").val() === "BCK") {
     $('#siteTemplate').css("background-color", col)
   } else if ($("#selectElement").val() === "ART") {
     $('#siteText').css("background-color", col)
   } else if ($("#selectElement").val() === "FNT") {
     $('body').css("color", col)
   }
 }


//refactored
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
  $('#colour6').click(function (e){
    updateElement(document.querySelector('#colour6').style.background)
  })

}
