var SessionService = require('../components/SessionService');
var BotUI = require('../components/BotUI');

module.exports = function (controller) {

  controller.hears(['tomorrow'], ['message_received'], function (bot, message) {

    bot.startTyping(message, function () {

      date = new Date();
      bot.reply(message, 'Sessions for tomorrow ' + (date.getMonth() + 1) + '/' + (date.getDate() + 1) + ":");

      SessionService().getTomorrow()
        .then(function (items) {
          BotUI().formatList(bot, message, items, false);
        })
        .catch(function (err) {
          console.log('ERROR SessionService().getToday()');
          console.log(err);
        });
    });

  });

};