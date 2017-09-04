var rp = require('request-promise');
var SessionService = require('./SessionService');

module.exports = function () {

  api_path = process.env.MEETUPBOT_API_URL;
  event_id = process.env.MEETUPBOT_API_EVENT_ID;

  LocationService = {

    listLocations: function () {
      var options = {
        uri: api_path + '/event/' + event_id + '/locations',
        qs: {
          ts: new Date()
        },
        json: true
      };
      return rp(options);
    },

    getLocationById: function (locationId) {
      return SessionService().find({
        location_id: locationId
      });
    }

  };

  return LocationService;
};