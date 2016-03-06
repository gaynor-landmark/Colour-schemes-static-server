var express = require('express')
var path = require('path')
var cors = require('cors')
var passport = require('passport')
var Strategy = require('passport-github')
var uuid = require('uuid')
var $ = require('jquery')
var bodyParser = require('body-parser')
var dotenv = require('dotenv')

var routes = require('./routes.js')

dotenv.load()
var app = express()

passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/github/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log("in strategy function")
    return cb(null, profile);
  }));


  // serialize and deserialize
  passport.serializeUser(function(user, cb) {
  console.log("serialize user")
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  console.log ('deserialize user')
  cb(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());





app.use(bodyParser.json());

app.use(express.static('public'));



routes(app)


app.set('port', 3000)

var server = app.listen(app.get('port'), function(){
  var port = server.address().port
  console.log('listening on ' + port)
})
