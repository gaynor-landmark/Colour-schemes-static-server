var test = require('tape')
var tapspec = require('tap-spec')
var supertest = require('supertest')
var getrequest = require('../src/js/getRequest.js')


// a palette has been set up in the db
var expectedPalette =  { UserID : '1',
      PaletteID : '1',
      PaletteName : 'test palette',
      Colour1 : '#A3A948',
      Colour2 : '#EDB92E',
      Colour3 : '#F85931',
      Colour4 : '#CE1836',
      Colour5 : '#009989'
}

test("returns the correct palette", function(t){
  // a palette has been set up in the db
  console.log("in the test")
  getrequest('http://localhost:3000/palettes/1', function (res){
    var actualPalette = res
      console.log("res", res)
      t.deepEqual( actualPalette, expectedPalette)
      t.end()
  })

})
