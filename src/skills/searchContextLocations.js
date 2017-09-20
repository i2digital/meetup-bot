module.exports.condition = function (params) {

  let heardInput = false;

  switch (params.message.type) {

    case 'message_received':

      let inputOptions = ['locais', 'local', 'lugares', 'localizações', 'localizacoes', 'pesquisar locais'];

      inputOptions.forEach(function(opt) {
        if(params.message.text.toLowerCase() === opt){
          heardInput = true;
        }
      });
    break;

    case 'facebook_postback':
      if (params.message.text == 'LOCATION_PAYLOAD') {
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

  bot.reply(message, 'Diga ao menos parte do nome do lugar, para eu pesquisar:', function () {
    BotUserService.load(message).then(function (BotUser) {
      BotUser.searchContext = {
        type: 'location_context'
      };
      BotUserService.save(BotUser);
    });
  });

};