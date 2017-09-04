var BotUI = require('../UI/BotUI');
var SessionService = require('../services/SessionService');

module.exports = function (controller, watsonMiddleware) {

  controller.on('current', function (bot, message) {
    bot.startTyping(message, function () {
      SessionService().getCurrent()
        .then(function (items) {
          if (items.length > 0) {
            item = items[0];
            msg = item.title + ' (' + item.tags + ")\n" + item.presenter + ' - ' + item.date_start + '/' + item.date_end;
            bot.reply(message, msg);
          } else {
            bot.reply(message, 'Não há atividades agora ;)');
          }
        })
        .catch(function (err) {
          console.log('ERROR SessionService().getCurrent()');
          console.log(err);
        });
    });
  });

};