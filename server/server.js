var express = require('express')
var path = require('path')
var cors = require('cors')
var passport = require('passport')
var Strategy = require('passport-instagram')

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

app.get('/palettes', function(req, res) {
//  var newId = = uuid.v4()
  knex('palettes').select('name', req.body)({
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
