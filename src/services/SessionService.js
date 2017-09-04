var rp = require('request-promise');

module.exports = function () {

  api_path = process.env.MEETUPBOT_API_URL;

  SessionService = {

    getDetails: function (sessionId) {
      var options = {
        uri: api_path + '/session/' + sessionId,
        qs: {
          ts: new Date()
        },
        json: true
      };
      return rp(options);
    },
    getToday: function () {
      var options = {
        uri: api_path + '/event/117/session/today',
        qs: {
          ts: new Date()
        },
        json: true
      };
      return rp(options);
    },
    getTomorrow: function () {
      var options = {
        uri: api_path + '/event/117/session/tomorrow',
        qs: {
          ts: new Date()
        },
        json: true
      };
      return rp(options);
    },
    getCurrent: function () {
      var options = {
        uri: api_path + '/event/117/session/current',
        qs: {
          ts: new Date()
        },
        json: true
      };
      return rp(options);
    },
    getNext: function () {
      var options = {
        uri: api_path + '/event/117/session/next',
        qs: {
          ts: new Date()
        },
        json: true
      };
      return rp(options);
    },
    getSearch: function (keyword) {
      var options = {
        uri: api_path + '/event/117/session/search',
        qs: {
          keywords: keyword,
          ts: new Date()
        },
        json: true
      };
      return rp(options);
    },

  };

  return SessionService;

};