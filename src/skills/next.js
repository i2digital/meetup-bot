var SessionService = require('../components/SessionService');

module.exports = function (controller) {

  controller.hears(['next'], ['message_received'], function (bot, message) {

    bot.startTyping(message, function () {

      SessionService().getNext()
        .then(function (items) {
          item = items[0];
          msg = item.title + ' (' + item.track + ")\n" + item.presenter + ' - ' + item.date_start + '/' + item.date_end;
          bot.reply(message, msg);
        })
        .catch(function (err) {
          console.log('ERROR SessionService().getNext()');
          console.log(err);
        });

    });

  });

};