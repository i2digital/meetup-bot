const PresenterService = require('../services/PresenterService');
var FacebookUI = require('../UI/FacebookUI');
var BotUI = require('../UI/BotUI');
var rmDupli = require('../utils/removeDuplicates');

module.exports.condition = function(params) {
  if (params.message.type === 'facebook_postback'
    && params.message.payload.includes('presenter_details_')) {
    return true;
  }
  else {
    return false;
  }
}

module.exports.run = function (params) {

  let message = params.message;
  let bot = params.bot;
  let presenterID = message.payload.substr(message.payload.lastIndexOf('_') + 1);

  bot.startTyping(message, function() {

      PresenterService().getDetails(presenterID)
      .then(function(items) {

          let noDuplicateItems = rmDupli(items, 'id');

          BotUI().showPresenterDetails(bot, message, noDuplicateItems);
      })
      .catch(function(err){
          console.log('Error in PresenterService.getDetails()');
          console.log(err);
      });
  });
}