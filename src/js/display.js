var $ = require('jquery')
//this will be called when the document has loaded (short form of $(document).ready())
$(function(){
  console.log('loaded')
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
)
