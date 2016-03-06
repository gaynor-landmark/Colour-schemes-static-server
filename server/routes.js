var express = require('express')
var path = require('path')
var cors = require('cors')
var passport = require('passport')
var Strategy = require('passport-instagram')
var uuid = require('uuid')
var $ = require('jquery')
var bodyParser = require('body-parser')
var display = require('../src/js/display.js')

var user = {}


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
  console.log(user.id) 
  var colours = req.body.Colours.split('|')
    knex('palettes').insert({
          PaletteID: newId ,
          PaletteName: req.body.Name,
          UserID: user.id,
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
    console.log(user)
    knex('palettes').where('UserID', user.id).select('*')
    .then(function(resp) {
      console.log("in GET", resp)
          res.send(resp)
    })
  })


  app.get('/', function(req, res){
    console.log("returning with user", req.user)
    res.redirect('/auth/github', { user: req.user });
  })

  // app.get('/login',
  //   function(req, res){
  //     console.log("in /login")
  //     res.redirect('login.html');
  //   });

  app.get('/auth/github',
    passport.authenticate('github'))

  app.get('/auth/github/return',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
      console.log("in /login/github/callback after authenticate", req.user.id, req.user.displayName)
      user['id'] = req.user.id
      console.log(user)
    //  passport.session.name = req.user.displayname
    //  welcome(req.user.displayname)
      res.redirect('/');
    });



// app.get('/profile',
//   require('connect-ensure-login').ensureLoggedIn(),
//   function(req, res){
//     console.log("in /profile")
//     res.render('profile', { user: req.user });
//   });

  app.get('/logout', function(req, res){
    console.log("in logout")
    req.logout();
    res.redirect('/');
  });





  var urlencodedParser = bodyParser.urlencoded({ extended: false })

    app.use(bodyParser.json())

    // app.post('/api/v1/artists', urlencodedParser, function (req, res) {
    //   console.log('request', req.body)
    //   db.add('artists', req.body, function (err, resp) {
    //     res.json(resp)
    //    })
    // })


  app.post('/sign-in', urlencodedParser, function(req, res){
    //find the user in the db (matching on their email) and pass their ID to the session object
    console.log('in get sign-in', req.body.email)
     knex('users').where(
      'Email', req.body.email)
      .select('Password_Hash', 'userID').then(function(resp) {
       // if the user's email is not found, redirect to the signup page
       if (resp.length <= 0) {
         console.log('not found')
         res.redirect('http://localhost:3000/signup.html')
       } else {
         console.log("found")
         if (req.body.password === resp[0].Password_Hash){
           req.session.userId = resp[0].id
           res.redirect('http://localhost:3000/index.html')
         } else {
           res.redirect('http://localhost:3000/signin.html')
         }
       }
     })
   })

   app.post('/sign-up', function(req, res) {
     console.log('inget signup')
     console.log(req.body)
     console.log(req.body.email)
     console.log(req.body.password)
   //   bcrypt.genSalt(10, function(err, salt) {
   //     bcrypt.hash(req.body.password, salt, function(err, hash) {
   //       console.log(hash)
   //       var newId = uuid.v4()
   //       knex('users').insert({
   //         id: newId,
   //         email: req.body.email,
   //         password_hash: hash
   //       }).then(function(resp) {
   //         req.session.userId = newId
   //         res.redirect('/secret')
   //       })
   //     })
   //   })
    })


  // app.post('/sign-up', function(req, res){
  //   console.log('in body', req.headers.query, req.headers.body )
  //   console.log(req.body.firstname)
  //   console.log(req.body.lastname)
  //   console.log(req.body.email)
  //   console.log(req.body.password)
  //   var newId = uuid.v4()
  //   knex('users').insert({
  //     UserID: newId,
  //     Email: req.body.email,
  //     Password_Hash: req.body.password,
  //     FirstName: req.body.firstname,
  //     LastName: req.body.lastname
  //     })
  //     .then(function(resp) {
  //     req.session.userId = newId
  //     res.redirect('http://localhost:9966/index.html')
  //     })
  //   })



  // bcrypt.genSalt(10, function(err, salt) {
  //   bcrypt.hash(req.body.password, salt, function(err, hash) {
  //     console.log(hash)






  app.get('/sign-in', function(req, res){
    console.log(req.body)
  })







}
