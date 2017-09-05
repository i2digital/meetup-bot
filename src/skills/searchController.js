const SessionService = require('../services/SessionService');
const BotUI = require('../UI/BotUI');

module.exports = function (controller, watsonMiddleware) {

    var BotUserService = require('../services/BotUserService')(controller);

    controller.hears(['SESSION_PAYLOAD', 'Palestra',
        'PRESENTER_PAYLOAD' ,'Palestrante',
        'LOCATION_PAYLOAD','Local'], ['message_received'], function (bot, message) {

        bot.reply(message, 'Me diga uma palavra para eu pesquisar:', function(){

            if(message.text === 'Palestra'
                || message.quick_reply.payload == 'SESSION_PAYLOAD') {

                BotUserService.load(message.user).then(function (BotUser) {
                    BotUser.searchContext = {
                        type: 'session_context',
                    }
                    BotUserService.save(BotUser);
                });
            }
            else if(message.text === 'Palestrante'
                || message.quick_reply.payload == 'PRESENTER_PAYLOAD') {



            }
            else if(message.text === 'Local'
                || message.quick_reply.payload == 'LOCATION_PAYLOAD') {

            }

        });
    });
}