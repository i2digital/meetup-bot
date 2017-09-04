var BotUI = require('../UI/BotUI');

module.exports = function (controller, watsonMiddleware) {

  controller.hears(['hello'], ['message_received'], watsonMiddleware.hear, function (bot, message) {
    bot.reply(message, message.watsonData.output.text.join('\n'), function () {
      BotUI().aboutMenu(bot, message);
    });
  });

};