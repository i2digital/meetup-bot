const SessionService = require('../components/SessionService');
const PresenterService = require('../components/PresenterService');
const BotUI = require('../components/BotUI');

module.exports = function (controller) {

  controller.hears(['presenter_details_' + '(.*)'], ['message_received'], function (bot, message) {
    var presenterID = message.match[1];
    console.log('PRESENTER ID', presenterID);

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

};