module.exports = function (controller, watsonMiddleware) {

  controller.hears(['PAYLOAD_HELP', 'Ajuda'], ['message_received'], function (bot, message) {

    bot.reply(message, 'Ok! Alguém vai falar com você em breve.');
    bot.reply(message, 'Quando quiser falar comigo(\uD83E\uDD16) novamente, basta digitar "programação".');

  });

};