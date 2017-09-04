var rp = require('request-promise');

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
      var options = {
        uri: api_path + '/presenter/' + presenterID + '/sessions',
        qs: {
          ts: new Date()
        },
        json: true
      };
      return rp(options);
    }

  };

  return PresenterService;
};