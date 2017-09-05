var FacebookUI = require('../UI/FacebookUI');

module.exports = function (controller, watsonMiddleware) {

  controller.hears(['PAYLOAD_EVENT', 'Programação'], ['message_received'], function (bot, message) {
    var genericTemplateInterface = FacebookUI.generic_template_model();

    genericTemplateInterface.addElement('Clique abaixo para ver a programação completa no site.', null, null, 'postback', null, false, null);
    genericTemplateInterface.addButton('abrir no site', 'web_url', 'http://hacktown.com.br/programacao-oficial/', 0);
    replyMessage = genericTemplateInterface.genericTemplateMessage;
    bot.reply(message, replyMessage);

  });

};