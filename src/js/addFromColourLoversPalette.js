var $ = require('jquery')

module.exports = function (target) {
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
