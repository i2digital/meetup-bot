var BotUI = require('../components/BotUI');
var SessionService = require('../components/SessionService');

module.exports = function (controller, watsonMiddleware) {

  controller.on('schedule_webview', function () {
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