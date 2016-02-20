var $ = require('jquery')

module.exports = function(){

  $('#colour1').click(function (){
    console.log('click1')
    $('#siteTemplate').css("background-color", "orange")
  })
  $('#colour2').click(function (){
    console.log('click1')
    $('#siteTemplate').css("background-color", "white")
  })
  $('#colour3').click(function (){
    console.log('click1')
    $('#siteTemplate').css("background-color", "blue")
  })
}
