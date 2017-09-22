const LocationService = require('../services/LocationService');
const BotUI = require('../UI/BotUI');
const BotUserService = require('../services/BotUserService.js');

module.exports.condition = function(params) {

  const controller = params.controller,
        message = params.message,
        userProfile = BotUserService(controller);

  userProfile.load(message)
  .then(setConditionBasedOnContext)
  .then(runOnTrue);
};

function setConditionBasedOnContext(BotUser) {
  promise = new Promise(function(resolve, reject) {
    if(BotUser.searchContext.type === 'location_context') {
      resolve(true);
    } else {
      reject(false);
    }
  });
  return promise;
}

function runOnTrue (condition) {
  if(condition) {
    run(params);
  }
}

let run = module.exports.run = function (params) {

  const controller = params.controller,
        bot = params.bot,
        message = params.message,
        botUser = BotUserService(controller);

  keyword = message.text;

  bot.reply(message, 'Buscando por "' + keyword + '"...', function () {
    bot.startTyping(message, function () {

      LocationService().getSearch(keyword)
      .then(function (items) {
        BotUI().formatLocationsList(bot, message, items);
      })
      .catch(function (err) {
        console.log('Error in SessionService.getSearch()');
        console.log(err);
      });
    });
  });

  botUser.cleanSearchContext(botUser);

};
