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
    filename: '../db/pets.sqlite'
  },
  useNullAsDefault: true
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
