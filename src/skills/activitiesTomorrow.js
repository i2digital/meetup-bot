var BotUI = require('../components/BotUI');
var SessionService = require('../components/SessionService');

module.exports = function (controller, watsonMiddleware) {

  controller.on('tomorrow', function () {
    bot.startTyping(message, function () {

      date = new Date();
      bot.reply(message, 'Atividades para amanhã ' + (date.getMonth() + 1) + '/' + (date.getDate() + 1) + ":");

      SessionService().getTomorrow()
        .then(function (items) {
          BotUI().formatList(bot, message, items, false);
        })
        .catch(function (err) {
          console.log('ERROR SessionService().getToday()');
          console.log(err);
        });
    });
  });

};