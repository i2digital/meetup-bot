const SessionService = require('../services/SessionService');

module.exports = function (controller) {

  var BotUserService = require('../services/BotUserService.js')(controller);

  controller.hears(['agora', 'now', 'acontecendo'], ['message_received'], function (bot, message) {

    BotUserService.load(message).then(function (BotUser) {

      bot.startTyping(message, function () {
        bot.reply(message, 'Ok! Vou mostrar uma lista de atividades que estão acontecendo agora)', function () {
          bot.reply(message, 'Se prepare, pois pode ser grande ;)', function () {

            SessionService().getCurrent()
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