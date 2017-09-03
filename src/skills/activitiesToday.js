var BotUI = require('../components/BotUI');
var SessionService = require('../components/SessionService');

module.exports = function (controller, watsonMiddleware) {

  controller.on('today', function () {
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