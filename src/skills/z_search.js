const SessionService = require('../services/SessionService');
const PresenterService = require('../services/PresenterService');
const LocationService = require('../services/LocationService');

const BotUI = require('../UI/BotUI');

module.exports =  function(controller) {

    var BotUserService = require('../services/BotUserService.js')(controller);

    controller.hears(['(.*)'], ['message_received'], function(bot, message) {

        BotUserService.load(message.user).then(function (BotUser) {

            switch(BotUser.searchContext.type) {

                case 'session_context':

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

                    break;

                case 'presenter_context':
                    console.log('SEARCH CONTEXT: ', BotUser.searchContext.type);

                    keyword = message.text;

                    bot.reply(message, 'Buscando por "' + keyword + '"...', function() {
                        bot.startTyping(message, function() {

                            PresenterService().getSearch(keyword)
                            .then(function(items) {
                                console.log(items);
                                BotUI().formatPresentersList(bot, message, items);
                            })
                            .catch(function(err){
                                console.log('Error in SessionService.getSearch()');
                                console.log(err);
                            });
                        });

                    });

                    break;

                case 'location_context':
                    console.log('SEARCH CONTEXT: ', BotUser.searchContext.type);

                    keyword = message.text;

                    bot.reply(message, 'Buscando por "' + keyword + '"...', function() {
                        bot.startTyping(message, function() {

                            LocationService().getSearch(keyword)
                            .then(function(items) {
                                console.log(items);
                                BotUI().formatLocationsList(bot, message, items);
                            })
                            .catch(function(err){
                                console.log('Error in SessionService.getSearch()');
                                console.log(err);
                            });
                        });

                    });

                    break;
            }

            BotUser.searchContext.type = undefined;
            BotUserService.save(BotUser);

        });
    });
}

