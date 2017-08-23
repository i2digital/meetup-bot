module.exports = function (controller, watsonMiddleware) {

    controller.hears(['goodbye'], ['message_received'], watsonMiddleware.hear, function (bot, message) {
        bot.reply(message, message.watsonData.output.text[0]);
    });

}