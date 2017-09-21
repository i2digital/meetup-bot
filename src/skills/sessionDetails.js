const SessionService = require('../services/SessionService');
var FacebookUI = require('../UI/FacebookUI');
var BotUI = require('../UI/BotUI');
var rmDupli = require('../utils/removeDuplicates');


module.exports.condition = function(params) {
  if (params.message.type === 'facebook_postback'
    && params.message.payload.includes('session_details_')) {
    return true;
  }
  else {
    return false;
  }
}

module.exports.run = function(params) {

  let message = params.message;
  let bot = params.bot;
  let sessionID = message.payload.substr(message.payload.lastIndexOf('_') + 1);

  console.log(sessionID);

  bot.startTyping(message, function() {

      SessionService().getDetails(sessionID)
      .then(function(items) {

        let noDuplicateItems = rmDupli(items, 'id');

        BotUI().showSessionDetails(bot, message, noDuplicateItems);
      })
      .catch(function(err){
          console.log('Error in SessionService.getDetails()');
          console.log(err);
      });
  });
}