var $ = require('jquery')

module.exports = function (col){
  console.log("update element")
  if ($("#selectElement").val() === "BCK") {
    $('#siteTemplate').css("background-color", col)
  } else if ($("#selectElement").val() === "ART") {
    $('#siteText').css("background-color", col)
  } else if ($("#selectElement").val() === "FNT") {
    $('body').css("color", col)
  } else if ($("#selectElement").val() === "FOO") {
    $('footer').css("background-color", col)
  } else if ($("#selectElement").val() === "SEC") {
    $('#secondaryText').css("background-color", col)
  }
}
