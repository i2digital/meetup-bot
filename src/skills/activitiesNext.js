var BotUI = require('../components/BotUI');
var SessionService = require('../components/SessionService');

module.exports = function (controller, watsonMiddleware) {

  controller.on('next', function () {
    bot.startTyping(message, function () {

      SessionService().getNext()
        .then(function (items) {
          if (items.length > 0) {
            item = items[0];
            msg = item.title + ' (' + item.tags + ")\n" + item.presenter + ' - ' + item.date_start + '/' + item.date_end;
            bot.reply(message, msg);
          } else {
            bot.reply(message, 'Não existem atividades para serem exibidas ;)');
          }
        })
        .catch(function (err) {
          console.log('ERROR SessionService().getNext()');
          console.log(err);
        });
    });
  });

};