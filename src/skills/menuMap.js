var FacebookUI = require('../UI/FacebookUI');

module.exports = function (controller, watsonMiddleware) {

  //'message_received'
  controller.hears(['PAYLOAD_MAP'], ['facebook_postback'], function (bot, message) {

    bot.reply(message, 'Se perde não, hein! ;)');
    url = 'https://hacktown-bot-2017-dev.herokuapp.com/hacktown_mapa.jpg';
    bot.reply(message, FacebookUI.imageMessage(url));

  });

};