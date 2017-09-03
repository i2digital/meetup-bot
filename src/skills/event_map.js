const FacebookInterface = require('../components/FacebookAPIInterface');

module.exports = function (controller, watsonMiddleware) {

  controller.hears(['map'], ['message_received'], function (bot, message) {
    bot.reply(message, 'Opa, me mostra o mapa!');
    url = 'https://hacktown-bot-2017-dev.herokuapp.com/hacktown_mapa.jpg';
    FacebookInterface.imageMessage(url);
  });

}