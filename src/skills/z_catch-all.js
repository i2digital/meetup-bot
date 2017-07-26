var BotUI = require('../components/BotUI');

module.exports = function (controller) {

  controller.hears(['.*'], ['message_received'], function (bot, message) {

    console.log(message);

    if (
      message.text != 'help'
      && message.text != 'about'
      && message.text != 'current'
      && message.text != 'next'
      && message.text != 'today'
      && message.text != 'tomorrow'
      && message.text != 'search'
    ) {
      bot.startTyping(message, function () {
        bot.reply(message, BotUI().catchAllMessage());
      });
    }

  });

};