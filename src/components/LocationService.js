var rp = require('request-promise');

module.exports = function () {

    api_path = 'http://dev-tip-2017-bot.pantheonsite.io/api';

    LocationService = {

        listLocations : function(){
            var options = {
            uri: api_path + '/location',
            qs: {
              ts: new Date()
            },
            json: true
          };
          return rp(options);
        },

    }

    return LocationService;
}