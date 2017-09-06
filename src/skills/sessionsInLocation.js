const LocationService = require('../services/LocationService');
var FacebookUI = require('../UI/FacebookUI');
var BotUI = require('../UI/BotUI');

module.exports = function (controller) {

  controller.hears(['sessions_in_location_' + '(.*)'], ['message_received'], function (bot, message) {

    locationID = message.match[1];

    bot.startTyping(message, function() {

        LocationService().getLocationSessions(locationID)
        .then(function(items) {
            console.log(items);
            BotUI().formatSessionsCarrousel(bot, message, items);
        })
        .catch(function(err){
            console.log('Error in SessionService.getDetails()');
            console.log(err);
        });
    });

  });

}