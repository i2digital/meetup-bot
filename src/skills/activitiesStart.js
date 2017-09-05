var FacebookUI = require('../UI/FacebookUI');

module.exports = function (controller, watsonMiddleware) {

  controller.hears(['PAYLOAD_EVENT', 'programação'], ['message_received', 'facebook_postback'], function (bot, message) {

    button = FacebookUI.webview_button('Clique abaixo para ver a programação completa no site.', 'http://hacktown.com.br/programacao-oficial/', 'abrir site');
    bot.reply(message, button.message);

  });

};