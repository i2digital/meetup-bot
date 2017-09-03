var BotUI = require('../components/BotUI');

module.exports = function (controller, watsonMiddleware) {

  controller.on('about', function (bot, message) {
    bot.startTyping(message, function () {
      BotUI().aboutMenu(bot, message);
    });
  });

};