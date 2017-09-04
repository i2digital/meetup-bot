var BotUI = require('../UI/BotUI');
var SessionService = require('../services/LocationService');

module.exports = function (controller, watsonMiddleware) {

  controller.on('location', function (bot, message) {
    bot.startTyping(message, function () {
      bot.startConversation(message, listLocations);

      function listLocations(err, convo) {
        LocationService().listLocations()
          .then(iterateThroughLocations);

        function iterateThroughLocations(items) {

          if (items.length > 0) {
            items.forEach(function (item) {
              // if(item.address){
              msg = item.title + ':\n';
              msg += item.address;
              convo.say(msg);
              convo.next();
              // }
            })
            ;
          }
        }
      }
    });
  });

};