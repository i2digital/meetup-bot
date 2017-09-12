module.exports.condition = function (params) {

  switch (params.message.type) {

    case 'user_message':
      if (params.message.text.toLowerCase() == 'Ajuda') {
        return true;
      }

      break;

    case 'facebook_postback':
      if (params.message.text == 'PAYLOAD_HELP') {
        return true;
      }
      break;
  }

  return false;
};

module.exports.run = function (params) {

  params.bot.reply(params.message, 'Ok! Peço que explique o que você precisa, que alguém vai falar com você assim que possível.', function () {

    params.bot.reply(params.message, 'Quando quiser falar comigo(\uD83E\uDD16) novamente, basta digitar "programação".', function () {

      params.bot.reply(params.message, 'Desde já, pedimos compreensão pelo fato do evento estar próximo e ficar difícil da equipe responder rapidamente aqui ;)');
    });
  });
};