module.exports.condition = function (params) {
  return false;
};

module.exports.run = function (params) {

  const BotUserService = require('../services/BotUserService.js')(params.controller);

  BotUserService.load(params.message).then(function (BotUser) {
    BotUser.history.push(message);
    BotUserService.save(BotUser);
  });

};