var request = require('superagent')
var appendPalettes = require('./appendPalettes')

module.exports = function getPalettes(appendPalettes) {
	request.get('http://localhost:3000/palettes')
				.end(function(err, res){
					appendPalettes(res.body)
				})
}
