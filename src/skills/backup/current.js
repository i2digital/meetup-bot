var SessionService = require('../components/SessionService');

module.exports = function (controller) {

  controller.hears(['current'], ['message_received'], function (bot, message) {

    bot.startTyping(message, function () {

      SessionService().getCurrent()
        .then(function (items) {
          if (items.length > 0) {
            item = items[0];
            msg = item.title + ' (' + item.track + ")\n" + item.presenter + ' - ' + item.date_start + '/' + item.date_end;
            bot.reply(message, msg);
          } else {
            bot.reply(message, 'There is no session now ;)');
          }
        })
        .catch(function (err) {
          console.log('ERROR SessionService().getCurrent()');
          console.log(err);
        });

    });

  });

};