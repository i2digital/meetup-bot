const SessionService = require('../services/SessionService');
const BotUI = require('../UI/BotUI');

module.exports =  function(controller) {

    var BotUserService = require('../services/BotUserService.js')(controller);

    controller.hears(['(.*)'], ['message_received'], function(bot, message) {

        BotUserService.load(message.user).then(function (BotUser) {

            if(BotUser.searchContext.type === 'session_context') {

                console.log('SEARCH CONTEXT: ', BotUser.searchContext.type);

                keyword = message.text;

                bot.reply(message, 'Buscando por "' + keyword + '"...', function() {
                    bot.startTyping(message, function() {

                        SessionService().getSearch(keyword)
                        .then(function(items) {
                            BotUI().formatActivitiesCarrousel(bot, message, items);
                        })
                        .catch(function(err){
                            console.log('Error in SessionService.getSearch()');
                            console.log(err);
                        });
                    });

                });
            }

        });
    });
}

