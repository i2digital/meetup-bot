var BotUI = require('../UI/BotUI');
var FacebookUser = require('../services/FacebookUser');

module.exports = function (controller, watsonMiddleware) {

  var BotUserService = require('../services/BotUserService.js')(controller);

  controller.hears(['welcome_payload'], ['facebook_postback'], function (bot, message) {

    BotUserService.getByID(message.user).then(function (BotUsers) {

      var BotUser;
      if (BotUsers.length == 0) {
        BotUser = BotUserService.initiate(message.user);
      } else {
        BotUser = BotUsers[0];
      }
      BotUser.history.push(message);

      var newMessage = message;
      newMessage.text = 'welcome';

      FacebookUser(message.user).req(function (err, body) {
        BotUser.data = JSON.parse(body);
        var firstName = BotUser.data.first_name;
        watsonMiddleware.updateContext(message.user,
          {
            nome: firstName
          }
          , function () {
            watsonMiddleware.sendToWatson(bot, newMessage, function () {
              bot.reply(newMessage, newMessage.watsonData.output.text[0], function () {
                BotUI().aboutMenu(bot, message);
              });
            });
            BotUserService.save(BotUser);
          }
        );
      });
    });
  });
};