var express = require('express')
var path = require('path')
var cors = require('cors')

var $ = require('jquery')
var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:9965'
}))

var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './db/colourschemes.sqlite'
  },
  useNullAsDefault: true
})


app.post('/palettes', function(req, res) {
//  var newId = = uuid.v4()
  knex('palettes').insert({
        PaletteID: newId ,
        PaletteName: req.body.name,
        UserID: req.body.userId,
        Colours: req.body.colours
      }).then(function(resp) {
        res.send('Saved')
      })
})


app.set('port', 3000)

//app.use(express.static(path.join(__dirname,'public')))

var server = app.listen(app.get('port'), function(){
  var port = server.address().port
  console.log('listening on ' + port)
})

app.get('/', function (req, res) {
  res.send('Hello World!')
})
