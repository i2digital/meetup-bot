module.exports.condition = function (params) {

  let heardInput = false;

  switch (params.message.type) {

    case 'message_received':

      inputOptions = ['palestrantes', 'palestrante', 'pesquisar palestrantes'];

      inputOptions.forEach(function(opt) {
        if(params.message.text.toLowerCase() === opt){
          heardInput = true;
        }
      });
    break;

    case 'facebook_postback':
      if (params.message.text == 'PRESENTER_PAYLOAD') {
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

  bot.reply(message, 'Diga ao menos parte do nome do palestrante ou do local, para eu pesquisar:', function () {
    BotUserService.load(message).then(function (BotUser) {
      BotUser.searchContext = {
          type: 'presenter_context'
        };
      BotUserService.save(BotUser);
    });
  });

};