var BotUI = require('../UI/BotUI');
var SessionService = require('../services/SessionService');
var rmDups = require('../utils/removeDuplicates');

module.exports = function (controller) {

  controller.hears(['buscar (.*)', 'busca (.*)', 'encontrar (.*)'], 'message_received', function (bot, message) {

    var keyword = message.match[1];

    bot.startTyping(message, function () {

      bot.reply(message, 'Buscando por "' + keyword + '"');

      SessionService().getSearch(keyword)
        .then(function (items) {
          var itemsNoDuplicates = rmDups(items, 'id');
          BotUI().formatActivitiesList(bot, message, itemsNoDuplicates);
        })
        .catch(function (err) {
          console.log('ERROR SessionService().getSearch()');
          console.log(err);
        });
    });
  });
};

