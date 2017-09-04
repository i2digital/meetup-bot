var BotUI = require('../UI/BotUI');

module.exports = function (controller) {

  var BotUserService = require('../services/BotUserService.js')(controller);

  controller.hears(['(.*)'], ['message_received'], function (bot, message) {

    if (message.text !== 'welcome_payload') {

      if (message.watsonData.output.action) {

        var actionEvent = message.watsonData.output.action;
        console.info('WATSON ACTION EVENT: ' + actionEvent);

        BotUserService.load(message.user).then(function (BotUser) {
          BotUser.history.push(message);
          BotUserService.save(BotUser);
          controller.trigger(actionEvent, [bot, message, BotUser]);
        });

      }
      else if (message.watsonData && message.watsonData.output.nodes_visited[0] !== 'Em outros casos') {
        bot.reply(message, message.watsonData.output.text[0]);
      }
      else if (message.watsonData.output.nodes_visited[0] == 'Em outros casos') {
        console.log('>>> ANYTHING ELSE');
        bot.reply(message, message.watsonData.output.text[0], function () {
          bot.reply(message, 'Ou entao, pode tentar alguma das opcoes abaixo! ;)', function () {
            BotUI().aboutMenu(bot, message);
          });
        });
      }
    }
  });

};