var $ = require('jquery')
var ColorPicker = require('simple-color-picker');

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
      console.log(myswatch, document.querySelector(myswatch).style.background)
      // if (document.querySelector("#swatch1").style.background == 'white'){
        document.querySelector(myswatch).style.background = colString
        document.querySelector(mycolour).style.background = colString

        break
      // }
    }
  })
  // listener
  $('#colour1').click(function (e){
    console.log('click1', e.target.id)
    $('#siteTemplate').css("background-color", document.querySelector(mycolour).style.background)
  })
  $('#colour2').click(function (e){
    console.log('click1', e.target.id)
    $('#siteTemplate').css("background-color", document.querySelector(mycolour).style.background)
  })
  $('#colour3').click(function (e){
    console.log('click1', e.target.id)
    $('#siteTemplate').css("background-color", document.querySelector(mycolour).style.background)
  })
  $('#colour4').click(function (e){
    console.log('click1', e.target.id)
    $('#siteTemplate').css("background-color", document.querySelector(mycolour).style.background)
  })
  $('#colour5').click(function (e){
    console.log('click1', e.target.id)
    $('#siteTemplate').css("background-color", document.querySelector(mycolour).style.background)
  })

}
