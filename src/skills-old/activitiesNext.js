const SessionService = require('../services/SessionService');
const BotUI = require('../UI/BotUI');

module.exports = function (controller) {

  var BotUserService = require('../services/BotUserService.js')(controller);

  controller.hears(['próximas', 'próxima', 'proxima', 'proximas'], ['message_received'], function (bot, message) {

    BotUserService.load(message).then(function (BotUser) {

      bot.startTyping(message, function () {
        bot.reply(message, 'Ok! Vou mostrar uma lista de atividades que começarão dentro de 1 hora.)', function () {
          bot.reply(message, 'Se prepare, pois pode ser grande ;)', function () {

            SessionService().getNext()
              .then(function (items) {
                BotUI().formatSessionsList(bot, message, items);
              })
              .catch(function (err) {
                console.log('Error in SessionService.getSearch()');
                console.log(err);
              });
          });

        });
      });
    });
  });
};