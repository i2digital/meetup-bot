const BotUI = require('../components/BotUI.js');
const LocationService = require('../components/LocationService.js');

module.exports = function(controller) {

    controller.hears(['location_id_(.*)'], ['message_received'],function(bot, message) {

        var locationId = message.match[1];

        LocationService().getLocationById(locationId)
        .then(function(items) {
            var item = items[0];
            BotUI().showActivityLocation(bot, message, item);
        });


    });

}