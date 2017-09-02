const PresenterService = require('../components/PresenterService');
const BotUI = require('../components/BotUI');
var rmDups = require('../utils/removeDuplicates');

module.exports = function(controller) {

    controller.hears(['presenter_sessions_(.*)'], ['message_received'], function(bot, message){
        var presenterId = message.match[1];

        bot.startTyping(message, function () {
            PresenterService().getPresenterSessions(presenterId)
            .then(function (items) {
                console.log(items)
                var itemsNoDuplicates = rmDups(items, 'id');
                BotUI().showActivitiesListForPresenter(bot, message, itemsNoDuplicates)
            })
            .catch(function (err) {
                console.log('ERROR SessionService().getDetails()');
                console.log(err);
            });
        });


    });
}