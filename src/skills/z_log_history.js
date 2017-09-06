module.exports = function (controller) {

  var BotUserService = require('../services/BotUserService.js')(controller);

  controller.hears(['(.*)'], ['facebook_postback', 'message_received'], function (bot, message) {

    BotUserService.load(message).then(function (BotUser) {

      BotUserService.save(BotUser);
    });

  });
};