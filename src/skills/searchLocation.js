const LocationService = require('../services/LocationService');
const BotUI = require('../UI/BotUI');
const BotUserService = require('../services/BotUserService.js');

module.exports.condition = function(params) {

  const userProfile = BotUserService(params.controller);

  userProfile.load(params.message)
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

  const botUser = BotUserService(params.controller);

  keyword = params.message.text;

  params.bot.reply(params.message, 'Buscando por "' + keyword + '"...', function () {
    params.bot.startTyping(params.message, function () {

      LocationService().getSearch(keyword)
      .then(function (items) {
        BotUI().formatLocationsList(params.bot, params.message, items);
      })
      .catch(function (err) {
        console.log('Error in SessionService.getSearch()');
        console.log(err);
      });
    });
  });

  botUser.cleanSearchContext(botUser);

};
