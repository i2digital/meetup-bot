var rp = require('request-promise');

module.exports = function () {

    //TODO refactor. let API_PATH be in the ENV file.
    api_path = process.env.API_PATH;

    LocationService = {

        listLocations : function(){
            var options = {
            uri: api_path + '/event/117/locations',
            qs: {
              ts: new Date()
            },
            json: true
          };
          return rp(options);
        },

        getLocationById : function (locationId) {
            var options = {
            uri: api_path + '/location/' + locationId,
            qs: {
              ts: new Date()
            },
            json: true
          };
          return rp(options);
        }

    }

    return LocationService;
}