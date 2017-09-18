const SessionService = require('../services/SessionService');
const PresenterService = require('../services/PresenterService');
const LocationService = require('../services/LocationService');

const BotUI = require('../UI/BotUI');

module.exports.condition = function(params) {

  controller = params.controller;
  message = params.message;
  let BotUserService = require('../services/BotUserService.js')(controller);

  heardInput = false;

  console.log('ENTER CONDITION')

  BotUserService.load(message)
  .then(setConditionBasedOnContext)
  .then(function(condition) {
    console.log('SET HEARD INPUT')
    heardInput = condition;
  });

  console.log('RETURN HEARD INPUT')
  return heardInput;

};


function setConditionBasedOnContext(BotUser) {
  console.log('SET CONDITION BASED ON CONTEXT')
  promise = new Promise(function(resolve, reject) {
      if(BotUser.searchContext.type === 'session_context') {
        resolve(true);
      } else {
        reject(false);
      }
  });
  return promise;
}
  //     if (message.type === 'message_received'
  //       && BotUser.searchContext.type === 'session_context') {
  //       console.log(BotUserService.searchContext);
  //       heardInput = true;
  //       resolve(heardInput);
  //     }
  //     else {
  //       reject(heardInput);
  //     }

module.exports.run = function (params) {
  params.bot.reply(params.message, 'YEAH, BABY! LET\'s SEARCH THIS SESSION!')
  // controller = params.controller;
  // bot = params.bot;
  // message = params.message;

  // let BotUserService = require('../services/BotUserService.js')(controller);

  // BotUserService.load(message).then(function (BotUser) {

  //   console.log('SEARCH CONTEXT: ', BotUser.searchContext.type);

  //   keyword = message.text;

  //   bot.reply(message, 'Buscando por "' + keyword + '"...', function () {
  //     bot.startTyping(message, function () {

  //       SessionService().getSearch(keyword)
  //       .then(function (items) {
  //         BotUI().formatSessionsCarrousel(bot, message, items);
  //       })
  //       .catch(function (err) {
  //         console.log('Error in SessionService.getSearch()');
  //         console.log(err);
  //       });
  //     });

  //   });

  //   BotUser.searchContext.type = undefined;
  //   BotUserService.save(BotUser);

  // });
};


