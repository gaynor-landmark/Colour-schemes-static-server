var express = require('express')
var path = require('path')
var cors = require('cors')
var passport = require('passport')
var Strategy = require('passport-instagram')
var uuid = require('uuid')

//dotenv.load()
// passport.use(new Strategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: 'http://localhost:3000/login/instagram/return'
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     console.log("in strategy function")
//     return cb(null, profile);
//   }));




var $ = require('jquery')
var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:9966'
}))

var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './db/colourschemes.sqlite'
  },
  useNullAsDefault: true
})


app.post('/palettes', function(req, res) {
var newId = uuid.v4()
console.log("req body", req.body)
var colours = req.body.Colours.split('|')
console.log(req.body, newId)
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
//  var newId = = uuid.v4()
  knex('palettes').select('name', req.body)({
        PaletteID: newId ,
        PaletteName: req.body.name,
        UserID: req.body.userId,
        Colour1: req.body.colours[0],
        Colour2: req.body.colours[1],
        Colour3: req.body.colours[2],
        Colour4: req.body.colours[3],
        Colour5: req.body.colours[4]
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
