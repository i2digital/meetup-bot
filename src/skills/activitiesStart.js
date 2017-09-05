var FacebookUI = require('../UI/FacebookUI');

module.exports = function (controller, watsonMiddleware) {

  controller.hears(['PAYLOAD_EVENT', 'Programação'], ['message_received'], function (bot, message) {

    bot.reply(message, 'Vamos falar sobre a programação do Hack Town.', function() {

            quickReply = FacebookUI.quick_reply();
            quickReply.message.text = 'O que você está buscando?';
            quickReply.addQuickReply('text', 'Palestra', 'SESSION_PAYLOAD');
            quickReply.addQuickReply('text', 'Palestrante', 'PRESENTER_PAYLOAD');
            quickReply.addQuickReply('text', 'Local', 'LOCATION_PAYLOAD');

            bot.reply(message, quickReply.message);

    });
  });

};