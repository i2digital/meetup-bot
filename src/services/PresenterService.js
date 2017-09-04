var rp = require('request-promise');
var SessionService = require('./SessionService');

module.exports = function () {

  api_path = process.env.MEETUPBOT_API_URL;

  PresenterService = {

    getDetails: function (presenterID) {
      var options = {
        uri: api_path + '/presenter/' + presenterID,
        qs: {
          ts: new Date()
        },
        json: true
      };
      return rp(options);
    },

    getPresenterSessions: function (presenterID) {
      return SessionService.find({
        presenter_id: presenterID
      });
    }

  };

  return PresenterService;
};