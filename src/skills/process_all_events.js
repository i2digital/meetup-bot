let SessionService = require('../components/SessionService');
let BotUI = require('../components/BotUI');

let events = require('events');
let ee = new events.EventEmitter();

let handlers = require('../components/WatsonActionsHandler.js');

module.exports = function (controller) {

    controller.hears(['(.*)'], ['message_received'], function (bot, message){

        console.log(message);

        var text = message.watsonData.input.text;

        if(message.text !== 'welcome_payload') {

            if(message.watsonData.output.action){

                handlers(bot, message, ee);

                let actionEvent = message.watsonData.output.action;
                ee.emit(actionEvent);

                ee.removeAllListeners();

            }
            else if (message.watsonData && message.watsonData.output.nodes_visited[0] !== 'Em outros casos'){
                bot.reply(message, message.watsonData.output.text[0]);
            }
            else if (message.watsonData.output.nodes_visited[0] == 'Em outros casos') {
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
