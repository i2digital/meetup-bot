var SessionService = require('../components/SessionService');
var BotUI = require('../components/BotUI');

module.exports = function (controller) {

  controller.hears(['today'], ['message_received'], function (bot, message) {

    bot.startTyping(message, function () {

      date = new Date();
      bot.reply(message, 'Sessions for today ' + (date.getMonth() + 1) + '/' + date.getDate() + ":");

      SessionService().getToday()
        .then(function (items) {
          BotUI().formatList(bot, message, items);
        })
        .catch(function (err) {
          console.log('ERROR SessionService().getToday()');
          console.log(err);
        });
    });

  });
};