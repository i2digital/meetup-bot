var SessionService = require('../components/SessionService');
var BotUI = require('../components/BotUI');

module.exports = function (controller) {

    controller.hears(['session_details_'+'(.*)'],['message_received'], function (bot, message) {
        var sessionId = message.match[1];

        bot.startTyping(message, function () {
            SessionService().getDetails(sessionId)
            .then(function (items) {
                BotUI().showDetails(bot, message, items)
                // bot.reply(message, 'DETAILS');
            })
            .catch(function (err) {
                console.log('ERROR SessionService().getDetails()');
                console.log(err);
            });
        });
    });

}