let SessionService = require('../components/SessionService');
let BotUI = require('../components/BotUI');

let events = require('events');
let ee = new events.EventEmitter();

let handlers = require('../components/WatsonActionsHandler.js');

module.exports = function (controller) {

    controller.hears(['(.*)'], ['message_received'], function (bot, message){

        if(message.watsonData.output.action){

            console.log(message.watsonData);
            handlers(bot, message, ee);

            let actionEvent = message.watsonData.output.action;
            ee.emit(actionEvent);

            ee.removeAllListeners();
        } else {
            bot.reply(message, message.watsonData.output.text[0]);
        }

    });
}
