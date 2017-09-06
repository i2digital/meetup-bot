const SessionService = require('../services/SessionService');
var FacebookUI = require('../UI/FacebookUI');
var BotUI = require('../UI/BotUI');

module.exports = function (controller) {

  controller.hears(['session_details_' + '(.*)'], ['message_received'], function (bot, message) {

    sessionID = message.match[1];

    bot.startTyping(message, function() {

        SessionService().getDetails(sessionID)
        .then(function(items) {
            console.log(items);
            BotUI().showActivityDetails(bot, message, items);
        })
        .catch(function(err){
            console.log('Error in SessionService.getDetails()');
            console.log(err);
        });
    });

  });

}