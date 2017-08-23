var SessionService = require('../components/SessionService');
var BotUI = require('../components/BotUI');

module.exports = function (controller) {

  controller.hears(['web'], ['message_received'], function (bot, message) {

    bot.startTyping(message, function () {

      SessionService().getToday()
        .then(function (items) {
          BotUI().displayWebview(bot, message);
        })
        .catch(function (err) {
          console.log('ERROR SessionService().getToday()');
          console.log(err);
        });
    });

  });

};