var $ = require('jquery')
var ColorPicker = require('simple-color-picker');

module.exports = function(){
  var colorPicker = new ColorPicker();

  colorPicker.appendTo(document.querySelector("#picker"))
  // listener
  $('#colour1').click(function (e){
    console.log('click1', e.target.id)
    $('#siteTemplate').css("background-color", "white")





  })

}
