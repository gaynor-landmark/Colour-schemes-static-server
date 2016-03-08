var $ = require('jquery')

module.exports = function() {
  console.log("precload", window.location.href.indexOf('?'), colourString)
  if (window.location.href.indexOf('?') >= 0) {
    var colourString = window.location.href.slice(window.location.href.indexOf('?') + 1)
    console.log("cload", colourString)
    if (colourString.length > 0){
      var arr = colourString.split('|')
      for (var c = 1; c < 6; c++){
        myswatch = "#swatch" + c
        myhex = myswatch.replace("swatch", "hex")
        document.querySelector(myswatch).style.background =  hex2rgb(arr[c - 1])
        $(myhex).text('#' + arr[c - 1])
      }
    }
  }
}
