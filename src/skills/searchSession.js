const SessionService = require('../services/SessionService');
const rmDupli = require('../utils/removeDuplicates');

const BotUI = require('../UI/BotUI');

module.exports.condition = function(params) {

  let controller = params.controller;
  let message = params.message;
  let BotUserService = require('../services/BotUserService.js')(controller);

  heardInput = false;

  BotUserService.load(message)
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
  heardInput = condition;
  if(condition){
    run(params)
  }
}

let run = module.exports.run = function (params) {

  let controller = params.controller;
  let bot = params.bot;
  let message = params.message;

  let BotUserService = require('../services/BotUserService.js')(controller);

  BotUserService.load(message).then(function (BotUser) {

    keyword = message.text;

    bot.reply(message, 'Buscando por "' + keyword + '"...', function () {
      bot.startTyping(message, function () {

        SessionService().getSearch(keyword)
        .then(function (items) {
          let noDuplicateItems = rmDupli(items, 'id');
          BotUI().formatSessionsCarrousel(bot, message, noDuplicateItems);
        })
        .catch(function (err) {
          console.log('Error in SessionService.getSearch()');
          console.log(err);
        });
      });

    });

    BotUser.searchContext.type = undefined;
    BotUserService.save(BotUser);

  });
};


