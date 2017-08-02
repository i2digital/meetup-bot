var BotUI = require('../components/BotUI');

module.exports = function (controller, watsonMiddleware) {

  controller.hears(['hello'], ['message_received'], watsonMiddleware.hear, function (bot, message) {
        bot.reply(message, message.watsonData.output.text[0], () => {
            bot.reply(message, BotUI().aboutMessage());
        });
    });

}