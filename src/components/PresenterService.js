var rp = require('request-promise');
var env = require('node-env-file');
env('./src/.env');

module.exports = function () {

    api_path = process.env.API_PATH;

    PresenterService = {

        getDetails : function(presenterID){
            var options = {
            uri: api_path + '/presenter/' + presenterID,
            qs: {
              ts: new Date()
            },
            json: true
          };
          return rp(options);
        },

    }

    return PresenterService ;
}