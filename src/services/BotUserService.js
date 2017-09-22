var Promise = require('promise');

self = module.exports = function (controller) {

  function initiate(id) {
    return {
      id: id,
      started: new Date(),
      last_contact: new Date(),
      data: {},
      history: []
    };
  }

  function getByID(id) {
    return controller.storage.botusers.find({id: id});
  }

  function load(message) {
    promise = new Promise(function (resolve, reject) {

      getByID(message.user).then(function (BotUsers) {

        var BotUser;
        if (BotUsers.length == 0) {
          BotUser = initiate(message.user);
        } else {
          BotUser = BotUsers[0];
        }
        BotUser.last_contact = new Date();
        BotUser.history.push(message);

        resolve(BotUser);
      });

    });
    return promise;
  }

  function getAll() {
    return controller.storage.botusers.all();
  }

  function save(BotUser) {
    return controller.storage.botusers.save(BotUser);
  }

  function cleanSearchContext(userProfile) {
    userProfile.load(message).then(function (BotUser) {
      BotUser.searchContext.type = undefined;
      userProfile.save(BotUser);
    });
  }

  return {
    initiate: initiate,
    getByID: getByID,
    load: load,
    getAll: getAll,
    save: save,
    cleanSearchContext : cleanSearchContext,
  };
};