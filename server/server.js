var express = require('express')
var path = require('path')
var cors = require('cors')
var passport = require('passport')
var Strategy = require('passport-instagram')
var uuid = require('uuid')
var $ = require('jquery')
var bodyParser = require('body-parser')

var routes = require('./routes.js')
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






var app = express()

app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:9966'
}))



routes(app)


app.set('port', 3000)

var server = app.listen(app.get('port'), function(){
  var port = server.address().port
  console.log('listening on ' + port)
})
