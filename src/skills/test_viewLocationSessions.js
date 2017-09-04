const LocationService = require('../services/LocationService');
const BotUI = require('../UI/BotUI');
var rmDups = require('../utils/removeDuplicates');

module.exports = function(controller) {

    controller.hears('location_sessions_'+'(.*)', 'message_received', function(bot, message){
        var locationId = message.match[1];

        bot.startTyping(message, function () {
            LocationService().getLocationById(locationId)
            .then(function (items) {
                BotUI().showLocationSessions(bot, message, items)
            })
            .catch(function (err) {
                console.log('ERROR LocationDetails().getLocationById()');
                console.log(err);
            });
        });
    });
}