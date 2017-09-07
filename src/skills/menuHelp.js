module.exports = function (controller) {

  controller.hears(['PAYLOAD_HELP', 'Ajuda'], ['message_received'], function (bot, message) {

    bot.reply(message, 'Ok! Peço que explique o que você precisa, que alguém vai falar com você assim que possível.', function () {

      bot.reply(message, 'Quando quiser falar comigo(\uD83E\uDD16) novamente, basta digitar "programação".', function () {

        bot.reply(message, 'Desde já, pedimos compreensão pelo fato do evento estar próximo e ficar difícil da equipe responder rapidamente aqui ;)');
      });
    });
  });
};