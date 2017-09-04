var rp = require('request-promise');

module.exports = function () {

  api_path = process.env.MEETUPBOT_API_URL;

  LocationService = {

    listLocations: function () {
      var options = {
        uri: api_path + '/event/117/locations',
        qs: {
          ts: new Date()
        },
        json: true
      };
      return rp(options);
    },

    getLocationById: function (locationId) {
      var options = {
        uri: api_path + '/location/' + locationId,
        qs: {
          ts: new Date()
        },
        json: true
      };
      return rp(options);
    }

  };

  return LocationService;
};