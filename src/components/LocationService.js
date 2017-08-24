var rp = require('request-promise');

module.exports = function () {

    api_path = 'http://dev-tip-2017-bot.pantheonsite.io/api/event/117';

    LocationService = {

        listLocations : function(){
            var options = {
            uri: api_path + '/locations',
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