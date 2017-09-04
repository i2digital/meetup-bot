var request = require('request');

module.exports = function (userId) {

  var options = {
    "method": "GET",
    "url": 'https://graph.facebook.com/v2.10/' + userId + '?fields=first_name,last_name&access_token='
    + process.env.FB_PAGE_TOKEN,
    "headers": {
      "Accept": "application/json"
    }
  };

  return {
    req: function (cb) {
      request(options, function (err, response) {
        var body = response.body;
        cb(null, body);
        return body;
      });
    }
  };
};