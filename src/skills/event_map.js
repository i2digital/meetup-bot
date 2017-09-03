const FacebookInterface = require('../components/FacebookAPIInterface');

module.exports = function (controller, watsonMiddleware) {

  controller.hears(['map', 'mapa'], ['message_received'], function (bot, message) {
    bot.reply(message, 'Sai um mapa no capricho! ;)');
    url = 'https://hacktown-bot-2017-dev.herokuapp.com/hacktown_mapa.jpg';
    bot.reply(message, FacebookInterface.imageMessage(url));
  });

};