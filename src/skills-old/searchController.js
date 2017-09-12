const SessionService = require('../services/SessionService');
const BotUI = require('../UI/BotUI');

module.exports = function (controller) {

  var BotUserService = require('../services/BotUserService')(controller);

  controller.hears(['PRESENTER_PAYLOAD', 'Palestrante'], ['message_received'], function (bot, message) {
    bot.reply(message, 'Diga ao menos parte do nome do palestrante ou do local, para eu pesquisar:', function () {
      BotUserService.load(message).then(function (BotUser) {
        BotUser.searchContext = {
          type: 'presenter_context'
        };
        BotUserService.save(BotUser);
      });
    });
  });

  controller.hears(['SESSION_PAYLOAD', 'Palestra'], ['message_received'], function (bot, message) {
    bot.reply(message, 'Diga ao menos parte do nome do palestrante, para eu pesquisar:', function () {
      BotUserService.load(message).then(function (BotUser) {
        BotUser.searchContext = {
          type: 'session_context'
        };
        BotUserService.save(BotUser);
      });
    });
  });

  controller.hears(['LOCATION_PAYLOAD', 'Local'], ['message_received'], function (bot, message) {
    bot.reply(message, 'Diga ao menos parte do nome do lugar, para eu pesquisar:', function () {
      BotUserService.load(message).then(function (BotUser) {
        BotUser.searchContext = {
          type: 'location_context'
        };
        BotUserService.save(BotUser);
      });
    });
  });

};