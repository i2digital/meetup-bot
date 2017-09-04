var BotUI = require('../UI/BotUI');
var SessionService = require('../services/SessionService');

module.exports = function (controller, watsonMiddleware) {

  controller.on('today', function (bot, message) {
    bot.startTyping(message, function () {

      date = new Date();
      bot.reply(message, 'Atividades para hoje ' + (date.getMonth() + 1) + '/' + date.getDate() + ":");

      SessionService().getToday()
        .then(function (items) {
          BotUI().formatActivitiesList(bot, message, items);
        })
        .catch(function (err) {
          console.log('ERROR SessionService().getToday()');
          console.log(err);
        });
    });
  });

};