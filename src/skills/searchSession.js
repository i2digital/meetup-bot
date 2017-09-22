const SessionService = require('../services/SessionService'),
      rmDupli = require('../utils/removeDuplicates'),
      BotUserService = require('../services/BotUserService.js'),
      BotUI = require('../UI/BotUI');

module.exports.condition = function(params) {

  const userProfile = BotUserService(params.controller);

  userProfile.load(params.message)
  .then(setConditionBasedOnContext)
  .then(runOnTrue);
};

function setConditionBasedOnContext(BotUser) {
  promise = new Promise(function(resolve, reject) {
    if(BotUser.searchContext.type === 'session_context') {
      resolve(true);
    } else {
      reject(false);
    }
  });
  return promise;
}

function runOnTrue (condition) {
  if(condition){
    run(params);
  }
}

let run = module.exports.run = function (params) {

  const userProfile = BotUserService(params.controller),
        keyword = params.message.text;

  params.bot.reply(params.message, 'Buscando por "' + keyword + '"...', function () {
    params.bot.startTyping(params.message, function () {

      SessionService().getSearch(keyword)
      .then(function (items) {
        let noDuplicateItems = rmDupli(items, 'id');
        BotUI().formatSessionsCarrousel(params.bot, params.message, noDuplicateItems);
      })
      .catch(function (err) {
        console.log('Error in SessionService.getSearch()');
        console.log(err);
      });
    });

  });

  userProfile.cleanSearchContext(userProfile);

};


