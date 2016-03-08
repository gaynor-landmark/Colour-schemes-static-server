var $ = require('jquery')

module.exports = function (which){
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
