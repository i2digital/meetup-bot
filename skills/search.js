var SessionService = require('../components/SessionService');
var BotUI = require('../components/BotUI');

module.exports = function (controller) {

  controller.hears(['buscar (.*)', 'busca (.*)', 'encontrar (.*)'], 'message_received', function (bot, message) {

    console.log(message.watsonData) ;

    var keyword = message.match[1];

    bot.startTyping(message, function () {

      bot.reply(message, 'Buscando por ' + keyword);

      SessionService().getSearch(keyword)
        .then(function (items) {
          BotUI().formatList(bot, message, items, true);
        })
        .catch(function (err) {
          console.log('ERROR SessionService().getToday()');
          console.log(err);
        });
    });

  });

};