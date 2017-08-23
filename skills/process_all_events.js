let SessionService = require('../components/SessionService');
let BotUI = require('../components/BotUI');

let events = require('events');
let ee = new events.EventEmitter();

let handlers = require('../components/WatsonActionsHandler.js');

module.exports = function (controller) {

    controller.hears(['(.*)'], ['message_received'], function (bot, message){

        if(message.text !== 'welcome_payload'){
            console.log(message);

            if(message.type === 'user_message'
                && message.watsonData.output.action){

                handlers(bot, message, ee);

                let actionEvent = message.watsonData.output.action;
                ee.emit(actionEvent);

                ee.removeAllListeners();

            } else if (message.watsonData) {
                bot.reply(message, message.watsonData.output.text[0]);
            }
        }
    });
}