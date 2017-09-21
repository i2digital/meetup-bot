const LocationService = require('../services/LocationService');
var FacebookUI = require('../UI/FacebookUI');
var BotUI = require('../UI/BotUI');
var rmDupli = require('../utils/removeDuplicates');

module.exports.condition = function(params) {
  if (params.message.type === 'facebook_postback'
    && params.message.payload.includes('sessions_in_location_')) {
    return true;
  }
  else {
    return false;
  }
}

module.exports.run = function (controller) {

  let message = params.message;
  let bot = params.bot;
  let locationID = message.payload.substr(message.payload.lastIndexOf('_') + 1);

  bot.startTyping(message, function () {

    LocationService().getLocationSessions(locationID)
      .then(function (items) {

        let noDuplicateItems = rmDupli(items, 'id');

        BotUI().formatSessionsCarrousel(bot, message, noDuplicateItems);
      })
      .catch(function (err) {
        console.log('Error in LocationService.getLocationSessions()');
        console.log(err);
      });
  });
};