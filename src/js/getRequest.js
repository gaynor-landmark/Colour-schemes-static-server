var request = require('superagent')

module.exports = function getRequest(geturl, callback) {
	console.log("in get request", geturl)
	request.get(geturl)
				.end(function(err, res){
					console.log("in get request .end", res.body)
					callback(res.body)
				})
}
