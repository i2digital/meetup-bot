var BotUI = require('../components/BotUI');

module.exports = function (controller) {

  controller.hears(['Welcome'], ['message_received'], function (bot, message) {

    bot.startTyping(message, function () {
        bot.reply(message, BotUI().welcomeMessage());
    });

  });

};