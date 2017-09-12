module.exports.condition = function (params) {
  return true;
};

module.exports.run = function (params) {

  var BotUserService = require('../services/BotUserService.js')(params.controller);

  BotUserService.load(params.message).then(function (BotUser) {
    BotUser.history.push(message);
    BotUserService.save(BotUser);
  });

};