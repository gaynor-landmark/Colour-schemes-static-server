var express = require('express')
var path = require('path')
var cors = require('cors')
var passport = require('passport')
var Strategy = require('passport-instagram')
var uuid = require('uuid')
var $ = require('jquery')
var bodyParser = require('body-parser')


var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './db/colourschemes.sqlite'
  },
  useNullAsDefault: true
})

module.exports = function routes(app){


  app.post('/palettes', function(req, res) {
  var newId = uuid.v4()
  var colours = req.body.Colours.split('|')
    knex('palettes').insert({
          PaletteID: newId ,
          PaletteName: req.body.Name,
          // UserID: req.body.userId,
          Colour1: colours[0],
          Colour2: colours[1],
          Colour3: colours[2],
          Colour4: colours[3],
          Colour5: colours[4]
        }).then(function(resp) {
          res.send('Saved')
        })
  })

  app.get('/palettes', function(req, res) {

    knex('palettes').select('*')
    .then(function(resp) {
      console.log("in GET", resp)
          res.send(resp)
    })
  })

  app.get('/', function (req, res) {
    res.send('Hello World!')
  })







}
