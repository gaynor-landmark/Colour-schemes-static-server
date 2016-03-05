var $ = require('jquery')

module.exports = function (){
  for (var i= 1; i < 6; i++){
    var myswatch = "#swatch" + i
    var mycolour = "#colour" + i
    $(myswatch).css('background-color', '#FFFFFF')  // set to white
    $(mycolour).css('background-color', '#FFFFFF')  // set to white
  }
}
