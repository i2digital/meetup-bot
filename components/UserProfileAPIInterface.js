var request = require('request');

module.exports = (userId) => {

    if()

    let options = {
        "method":"GET",
            "url": 'https://graph.facebook.com/v2.9/'+userId+'?fields=first_name&access_token='
            +process.env.FB_PAGE_TOKEN_DEV,
            "headers": {
            "Accept": "application/json"
        }
    };

    var returnBody = {

        req : (cb) => {
            request(options, (err, response) => {
                var body = response.body;
                cb(null, body);
                return body;
            });
        }
    };

    return returnBody;
};