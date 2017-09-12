const PresenterService = require('../services/PresenterService');
var FacebookUI = require('../UI/FacebookUI');
var BotUI = require('../UI/BotUI');

module.exports = function (controller) {

  controller.hears(['presenter_details_' + '(.*)'], ['message_received'], function (bot, message) {

    sessionID = message.match[1];

    bot.startTyping(message, function() {

        PresenterService().getDetails(sessionID)
        .then(function(items) {
            console.log(items);
            BotUI().showPresenterDetails(bot, message, items);
        })
        .catch(function(err){
            console.log('Error in SessionService.getDetails()');
            console.log(err);
        });
    });

  });

}