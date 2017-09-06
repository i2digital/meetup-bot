var FacebookUI = require('../UI/FacebookUI');

module.exports = function (controller, watsonMiddleware) {

  controller.hears(['PAYLOAD_MAP', 'Mapa', 'Mapa do Evento'], ['message_received'], function (bot, message) {

    bot.startTyping(message, function () {
      bot.reply(message, 'Se perde não, hein! ;)', function () {

        url = 'https://scontent.fsdu6-1.fna.fbcdn.net/v/t31.0-8/21200863_1947435318804214_5858238536783831471_o.jpg?oh=02dc98f70cf477271eeee3626180aed7&oe=5A199B00';
        bot.reply(message, FacebookUI.imageMessage(url));
      });
    });

  });

};