var rp = require('request-promise');
var SessionService = require('./SessionService');

module.exports = function () {

  api_path = process.env.MEETUPBOT_API_URL;
  event_id = process.env.MEETUPBOT_API_EVENT_ID;

  PresenterService = {

    getSearch: function (keyword) {
      return this.find({
        search: keyword
      });
    },
    find: function (params) {
      params.ts = new Date();
      var options = {
        uri: api_path + '/event/' + event_id + '/presenters',
        qs: params,
        json: true
      };
      return rp(options);
    },

    getDetails: function (presenterID) {
      return this.find({
        id: presenterID
      });
    },

    getPresenterSessions: function (presenterID) {
      return SessionService().find({
        presenter_id: presenterID
      });
    }

  };

  return PresenterService;
};