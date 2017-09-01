let SessionService = require('../components/SessionService');
let BotUI = require('../components/BotUI');

let events = require('events');
let ee = new events.EventEmitter();

let handlers = require('../components/WatsonActionsHandler.js');

module.exports = function (controller) {

    controller.hears(['(.*)'], ['message_received'], function (bot, message){

        console.log(message.watsonData);

        var text = message.watsonData.input.text;

        if(message.text !== 'welcome_payload') {

            if(message.watsonData.output.action){

                handlers(bot, message, ee);

                let actionEvent = message.watsonData.output.action;
                ee.emit(actionEvent);

                ee.removeAllListeners();

            } else if (message.watsonData) {
                console.log('ANYTHING ELSE');
                bot.reply(message, message.watsonData.output.text[0], function(){
                    bot.reply(message, 'Ou entao, pode tentar alguma das opcoes abaixo! ;)', function(){
                        BotUI().aboutMenu(bot, message);
                    });
                });
            }
        }
    });
}
