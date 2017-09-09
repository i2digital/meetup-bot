var rp = require('request-promise');

module.exports = function () {

  api_path = process.env.MEETUPBOT_API_URL;
  event_id = process.env.MEETUPBOT_API_EVENT_ID;

  function str_pad(n) {
    return String("00" + n).slice(-2);
  }

  SessionService = {

    getDetails: function (sessionId) {
      return this.find({
        session_id: sessionId
      });
    },
    find: function (params) {
      params.ts = new Date();
      var options = {
        uri: api_path + '/event/' + event_id + '/sessions',
        qs: params,
        json: true
      };
      return rp(options);
    },
    getToday: function () {
      date = new Date();
      date_string = date.getFullYear();
      date_string += '-' + str_pad((date.getMonth() + 1)) + '-';
      return this.find({
        start: date_string + str_pad(date.getDate()) + 'T00:00:00',
        end: date_string + str_pad(date.getDate() + 1) + 'T00:00:00'
      });
    },
    getTomorrow: function () {
      date = new Date();
      date_string = date.getFullYear();
      date_string += '-' + str_pad((date.getMonth() + 1)) + '-';
      return this.find({
        start: date_string + str_pad(date.getDate() + 1) + 'T00:00:00',
        end: date_string + str_pad(date.getDate() + 2) + 'T00:00:00'
      });
    },
    getSearch: function (keyword) {
      date = new Date();
      date_string = date.getFullYear();
      date_string += '-' + str_pad((date.getMonth() + 1)) + '-';
      return this.find({
        start: date_string + str_pad(date.getDate()) + 'T00:00:00',
        search: keyword
      });
    },
    getCurrent: function () {
      var options = {
        uri: api_path + '/event/' + event_id + '/session/current',
        qs: {
          ts: new Date()
        },
        json: true
      };
      return rp(options);
    },
    getNext: function () {
      var options = {
        uri: api_path + '/event/' + event_id + '/session/next',
        qs: {
          ts: new Date()
        },
        json: true
      };
      return rp(options);
    }

  };

  return SessionService;

};