var rp = require('request-promise');
var env = require('node-env-file');
env('./src/.env');

module.exports = function () {

  api_path = process.env.API_PATH;

  SessionService = {

    getToday: function () {
      var options = {
        uri: api_path + '/session/today',
        qs: {
          ts: new Date()
        },
        json: true
      };
      return rp(options);
    },
    getTomorrow: function () {
      var options = {
        uri: api_path + '/session/tomorrow',
        qs: {
          ts: new Date()
        },
        json: true
      };
      return rp(options);
    },
    getCurrent: function () {
      var options = {
        uri: api_path + '/session/current',
        qs: {
          ts: new Date()
        },
        json: true
      };
      return rp(options);
    },
    getNext: function () {
      var options = {
        uri: api_path + '/session/next',
        qs: {
          ts: new Date()
        },
        json: true
      };
      return rp(options);
    },
    getSearch: function (keyword) {
      var options = {
        uri: api_path + '/session/search',
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