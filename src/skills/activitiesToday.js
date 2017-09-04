var BotUI = require('../UI/BotUI');
var SessionService = require('../services/SessionService');

module.exports = function (controller, watsonMiddleware) {

  controller.on('today', function (bot, message) {
    bot.startTyping(message, function () {

      SessionService().getToday()
        .then(function (items) {
          if (items && items.length > 0) {
            date = new Date();
            bot.reply(message, 'Atividades para hoje ' + (date.getDate()) + '/' + (date.getMonth() + 1) + ":");
            BotUI().formatActivitiesList(bot, message, items);
          }
          else {
            bot.reply(message, 'Hoje não temos nenhuma atividade prevista.');
          }
        })
        .catch(function (err) {
          console.log('ERROR SessionService().getToday()');
          console.log(err);
        });
    });
  });

};