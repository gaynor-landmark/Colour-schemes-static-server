var request = require('superagent')

module.exports = function getRequest(geturl, callback) {
	console.log("in get request", geturl)
	request.get(geturl)
				.end(function(err, res){
					callback(res.body)
				})
}
