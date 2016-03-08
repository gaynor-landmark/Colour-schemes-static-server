var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './db/colourschemes.sqlite'
  },
  useNullAsDefault: true
})

var dropSqlUsers = 'DROP TABLE IF EXISTS users;'
var dropSqlPalettes = 'DROP TABLE IF EXISTS palettes;'

var createSqlUsers = [
  'CREATE TABLE users (',
	'UserID VARCHAR(255) PRIMARY KEY ASC,',
	'LastName VARCHER(255),',
	'FirstName VARCHER(255),',
	'Email VARCHAR(255),',
	'Password_Hash VARCHER(255)',
  ');'
].join(' ')

var createSqlPalettes = [
  'CREATE TABLE palettes (',
	'PaletteID VARCHAR(255) PRIMARY KEY ASC,',
	'UserID VARCHAR(255),',
	'PaletteName VARCHER(255),',
  'Colour1 VARCHER(255),',
  'Colour2 VARCHER(255),',
  'Colour3 VARCHER(255),',
  'Colour4 VARCHER(255),',
  'Colour5 VARCHER(255)',
  ');'
].join(' ')


knex.raw(dropSqlUsers).then(function (resp) {
  return knex.raw(createSqlUsers)
}).then(function (resp) {
	  knex.raw(dropSqlPalettes).then(function (resp) {
	  return knex.raw(createSqlPalettes)
	}).then(function (resp) {
	  process.exit()
	})
})
