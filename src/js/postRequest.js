var request = require('superagent')

module.exports = function (url, data, callback){
  console.log('in POST', url, data, callback)
  request.post(url)
  .send(data)
  .end(function(err, res){
    callback(res)
  })

}
