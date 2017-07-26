var BotUI = require('../components/BotUI');

module.exports = function (controller) {

  controller.hears(['help', 'about'], ['message_received'], function (bot, message) {

    bot.startTyping(message, function () {
      bot.reply(message, BotUI().welcomeMessage());
    });
    
  });

};