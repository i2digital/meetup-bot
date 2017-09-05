var FacebookUI = require('../UI/FacebookUI');

module.exports = function (controller, watsonMiddleware) {

  controller.hears(['PAYLOAD_MAP', 'Mapa', 'Mapa do Evento'], ['message_received'], function (bot, message) {

    bot.reply(message, 'Se perde não, hein! ;)');
    url = 'https://hacktown-bot-2017-dev.herokuapp.com/hacktown_mapa.jpg';
    bot.reply(message, FacebookUI.imageMessage(url));

  });

};