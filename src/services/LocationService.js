var rp = require('request-promise');
var SessionService = require('./SessionService');

module.exports = function () {

  api_path = process.env.MEETUPBOT_API_URL;
  event_id = process.env.MEETUPBOT_API_EVENT_ID;

  LocationService = {

    getSearch: function (keyword) {
      return this.find({
        search: keyword
      });
    },

    find: function (params) {
      params.ts = new Date();
      var options = {
        uri: api_path + '/event/' + event_id + '/locations',
        qs: params,
        json: true
      };
      return rp(options);
    },

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

    getLocationSessions: function (locationId) {
      return SessionService().find({
        location_id: locationId
      });
    }

  };

  return LocationService;
};