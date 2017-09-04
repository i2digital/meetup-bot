var BotUI = require('../UI/BotUI');
var LocationService = require('../services/LocationService');

module.exports = function (controller, watsonMiddleware) {

  controller.on('location', function (bot, message) {
    bot.startTyping(message, function () {
      LocationService().listLocations()
        .then(function(items){
          BotUI().formatLocationsList(bot, message, items)
        });
    });
  });

};