var $ = require('jquery')
var ColorPicker = require('simple-color-picker');
var rgb2hex = require('./rgb2hex.js')

module.exports = function(){
  //create the colour picker
  var colorPicker = new ColorPicker();
  colorPicker.appendTo(document.querySelector("#picker"))       // append the picker to the document
  colorPicker.on('update', function(){

    var colString = colorPicker.getHexString()
     console.log("picker clicked", colString)

    for (var i = 1; i < 7; i++){
      myswatch = "#swatch" + i
      mycolour = "#colour" + i
      //console.log(myswatch, document.querySelector(myswatch).style.background)
      var hexcol = rgb2hex($(myswatch).css('background-color'))
      console.log(myswatch, hexcol, typeof hexcol)
      // console.log(myswatch, rgb2hex(document.querySelector(myswatch).style.background))
      if (hexcol.toUpperCase() === '#FFFFFF'){
        document.querySelector(myswatch).style.background = colString
        document.querySelector(mycolour).style.background = colString

        break
       }
    }
  })
  // listener
  
  $('#colour1').click(function (e){
    console.log('click1', e.target.id)
    $('#siteTemplate').css("background-color", document.querySelector('#colour1').style.background)
  })
  $('#colour2').click(function (e){
    console.log('click', e.target.id)
    $('#siteTemplate').css("background-color", document.querySelector('#colour2').style.background)
  })
  $('#colour3').click(function (e){
    console.log('click1', e.target.id)
    $('#siteTemplate').css("background-color", document.querySelector('#colour3').style.background)
  })
  $('#colour4').click(function (e){
    console.log('click1', e.target.id)
    $('#siteTemplate').css("background-color", document.querySelector('#colour4').style.background)
  })
  $('#colour5').click(function (e){
    console.log('click1', e.target.id)
    $('#siteTemplate').css("background-color", document.querySelector('#colour5').style.background)
  })

}
