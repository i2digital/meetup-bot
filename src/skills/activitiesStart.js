var FacebookUI = require('../UI/FacebookUI');

module.exports.condition = function (params) {

  switch (params.message.type) {

    case 'message_received':
      inputOptions = ['programação', 'programacao', 'programa', 'agenda'];

      inputOptions.forEach(function(opt) {
        if(params.message.text.toLowerCase() === opt){
          params.heardInput = true;
        }
      });
    break;

    case 'facebook_postback':
      if (params.message.text == 'PAYLOAD_EVENT') {
        params.heardInput = true;
      }
    break;
  }

  return params.heardInput;
};

module.exports.run = function (params) {

  controller = params.controller;
  bot = params.bot;
  message = params.message;

  bot.reply(message, 'Vamos falar sobre a programação do Hack Town.', function() {

    quickReply = FacebookUI.quick_reply();
    quickReply.message.text = 'O que você está buscando?';
    quickReply.addQuickReply('text', 'Palestra', 'SESSION_PAYLOAD');
    quickReply.addQuickReply('text', 'Palestrante', 'PRESENTER_PAYLOAD');
    quickReply.addQuickReply('text', 'Local', 'LOCATION_PAYLOAD');

    bot.reply(message, quickReply.message);

  });
};