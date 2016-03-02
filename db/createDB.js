var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './db/colourschemes.sqlite'
  },
  useNullAsDefault: true
})

// https://www.sqlite.org/lang_droptable.html
var dropSqlUsers = 'DROP TABLE IF EXISTS users;'
var dropSqlPalettes = 'DROP TABLE IF EXISTS palettes;'
// https://www.sqlite.org/lang_createtable.html
// See also: https://www.sqlite.org/datatype3.html

var createSqlUsers = [
  'CREATE TABLE users (',
	'UserID INTEGER PRIMARY KEY ASC,',
	'LastName VARCHER(255),',
	'FirstName VARCHER(255),',
	'Email VARCHAR(255),',
	'Password_Hash VARCHER(255)',
  ');'
].join(' ')

var createSqlPalettes = [
  'CREATE TABLE palettes (',
	'PaletteID INTEGER PRIMARY KEY ASC,',
	'UserID INTEGER,',
	'PaletteName VARCHER(255),',
  'Colours VARCHER(255)',
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
