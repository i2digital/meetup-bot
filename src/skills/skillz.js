var BotUI = require('../components/BotUI');
var SessionService = require('../components/SessionService');
var LocationService = require('../components/LocationService');

module.exports = function (bot, message) {

    let SkillSet = {

        about : function () {
            bot.startTyping(message, function () {
                BotUI().aboutMenu(bot, message);
            });
        },

        showTodayWebview : function () {
             bot.startTyping(message, function () {
                  SessionService().getToday()
                    .then(function (items) {
                      BotUI().scheduleWebview(bot, message);
                    })
                    .catch(function (err) {
                      console.log('ERROR SessionService().getToday()');
                      console.log(err);
                    });
            });
        },

        today: function() {
            bot.startTyping(message, function () {

                date = new Date();
                bot.reply(message, 'Atividades para hoje ' + (date.getMonth() + 1) + '/' + date.getDate() + ":");

                SessionService().getToday()
                    .then(function (items) {
                    BotUI().formatActivitiesList(bot, message, items);
                })
                .catch(function (err) {
                    console.log('ERROR SessionService().getToday()');
                    console.log(err);
                });
            });
        },

        tomorrow: function() {
            bot.startTyping(message, function () {

              date = new Date();
              bot.reply(message, 'Atividades para amanhã ' + (date.getMonth() + 1) + '/' + (date.getDate() + 1) + ":");

              SessionService().getTomorrow()
                .then(function (items) {
                  BotUI().formatList(bot, message, items, false);
                })
                .catch(function (err) {
                  console.log('ERROR SessionService().getToday()');
                  console.log(err);
                });
            });
        },

        next: function () {
            bot.startTyping(message, function () {

                SessionService().getNext()
                .then(function (items) {
                    if(items.length > 0){
                        item = items[0];
                        msg = item.title + ' (' + item.tags + ")\n" + item.presenter + ' - ' + item.date_start + '/' + item.date_end;
                        bot.reply(message, msg);
                    }else {
                        bot.reply(message, 'Não existem atividades para serem exibidas ;)');
                    }
                })
                .catch(function (err) {
                    console.log('ERROR SessionService().getNext()');
                    console.log(err);
                });
            });

        },

        current: function() {
            bot.startTyping(message, function () {
            SessionService().getCurrent()
            .then(function (items) {
                if (items.length > 0) {
                    item = items[0];
                    console.log(item);
                    msg = item.title + ' (' + item.tags + ")\n" + item.presenter + ' - ' + item.date_start + '/' + item.date_end;
                    bot.reply(message, msg);
                  } else {
                    bot.reply(message, 'Não há atividades agora ;)');
                  }
                })
                .catch(function (err) {
                  console.log('ERROR SessionService().getCurrent()');
                  console.log(err);
                });
            });
        },
        //TODO trocar para uma mensagem como nome do local + 'botao com ver direcoes'
        // + botao com 'ver detalhes'
        showLocationsList : function () {
            bot.startTyping(message, function(){
                bot.startConversation(message, listLocations);

                function listLocations (err, convo) {
                   LocationService().listLocations()
                   .then(iterateThroughLocations);

                   function iterateThroughLocations (items) {

                        if(items.length > 0) {
                            items.forEach((item) => {
                                // if(item.address){
                                    msg = item.title + ':\n';
                                    msg += item.address;
                                    convo.say(msg);
                                    convo.next();
                                // }
                            });
                        }
                    }
                }
            });
        },

        showSpecificLocation: function () {

        }

    }


    return SkillSet;
}





