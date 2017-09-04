var BotUI = require('../UI/BotUI');
var SessionService = require('../services/SessionService');

module.exports = function (controller, watsonMiddleware) {

  controller.on('schedule_webview', function (bot, message) {
    bot.startTyping(message, function () {
      SessionService().getToday()
        .then(function (items) {
          BotUI().scheduleWebview(bot, message);
        })
        .catch(function (err) {
          console.log('ERROR SessionService().getToday()');
          console.log(err);
        });
    });
  });

};