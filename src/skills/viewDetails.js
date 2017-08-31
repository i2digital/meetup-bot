var SessionService = require('../components/SessionService');
var PresenterService = require('../components/PresenterService');
var BotUI = require('../components/BotUI');

module.exports = function (controller) {

    controller.hears(['session_details_'+'(.*)'],['message_received'], function (bot, message) {
        var sessionId = message.match[1];

        bot.startTyping(message, function () {
            SessionService().getDetails(sessionId)
            .then(function (items) {
                BotUI().showActivityDetails(bot, message, items)
            })
            .catch(function (err) {
                console.log('ERROR SessionService().getDetails()');
                console.log(err);
            });
        });
    });

    controller.hears(['presenter_details_'+'(.*)'],['message_received'], function (bot, message) {
        var presenterID = message.match[1];
        console.log('PRESENTER ID',presenterID);
        bot.startTyping(message, function () {
            PresenterService().getDetails(presenterID)
            .then(function (items) {
                BotUI().showPresenterDetails(bot, message, items)
            })
            .catch(function (err) {
                console.log('ERROR SessionService().getDetails()');
                console.log(err);
            });
        });
    });

}