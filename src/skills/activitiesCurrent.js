const SessionService = require('../services/SessionService');
const BotUI = require('../UI/BotUI');

module.exports.condition = function (params) {
  if (params.message.type === 'user_message'
    && params.message.text) {

      inputOptions = ['agora', 'acontecendo', 'palestras agora', 'now'];

      heardInput = false;

      inputOptions.forEach(function(opt) {
        if(params.message.text.toLowerCase() === opt){
          console.log('FOUND: ', opt);
          heardInput = true;
        }
      });

      return heardInput;
  }
};

module.exports.run = function (params) {

  controller = params.controller;
  bot = params.bot;
  message = params.message;

  var BotUserService = require('../services/BotUserService.js')(controller);

  BotUserService.load(message).then(function (BotUser) {

    bot.startTyping(message, function () {
      bot.reply(message, 'Ok! Vou mostrar uma lista de atividades que estão acontecendo agora)', function () {
        bot.reply(message, 'Se prepare, pois pode ser grande ;)', function () {

          SessionService().getCurrent()
            .then(function (items) {
              BotUI().formatSessionsCarrousel(bot, message, items);
            })
            .catch(function (err) {
              console.log('Error in SessionService.getSearch()');
              console.log(err);
            });
        });

      });
    });
  });
};