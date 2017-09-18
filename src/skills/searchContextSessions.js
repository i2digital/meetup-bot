module.exports.condition = function (params) {

  heardInput = false;

  switch (params.message.type) {

    case 'message_received':

      inputOptions = ['palestras', 'palestra', 'atividades', 'atividades', 'pesquisar atividades'];

      inputOptions.forEach(function(opt) {
        if(params.message.text.toLowerCase() === opt){
          heardInput = true;
        }
      });
    break;

    case 'facebook_postback':
      if (params.message.text == 'SESSION_PAYLOAD') {
        heardInput = true;
      }
    break;
  }

  return heardInput;
};

module.exports.run = function (params) {

  controller = params.controller;
  bot = params.bot;
  message = params.message;

  var BotUserService = require('../services/BotUserService')(controller);

  bot.reply(message, 'Diga alguma palavra-chave sobre a palestra, para eu pesquisar:', function () {
    BotUserService.load(message).then(function (BotUser) {
      BotUser.searchContext = {
        type: 'session_context'
      };
      BotUserService.save(BotUser);
    });
  });

};