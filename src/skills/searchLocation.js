const LocationService = require('../services/LocationService');
// const formatLocationList = require('../BotUI/formatLocationList')();
const BotUI = require('../UI/BotUI');

module.exports.condition = function(params) {

  controller = params.controller;
  message = params.message;
  let BotUserService = require('../services/BotUserService.js')(controller);

  heardInput = false;

  BotUserService.load(message)
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
  heardInput = condition;
  if(condition) {
    run(params);
  }
}

let run = module.exports.run = function (params) {

  controller = params.controller;
  bot = params.bot;
  message = params.message;

  let BotUserService = require('../services/BotUserService.js')(controller);

  BotUserService.load(message).then(function (BotUser) {

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

    BotUser.searchContext.type = undefined;
    BotUserService.save(BotUser);

  });
};


