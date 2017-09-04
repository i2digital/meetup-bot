var Promise = require('promise');

module.exports = function (controller) {

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

  function load(id) {
    promise = new Promise(function (resolve, reject) {

      getByID(id).then(function (BotUsers) {

        var BotUser;
        if (BotUsers.length == 0) {
          BotUser = initiate(id);
        } else {
          BotUser = BotUsers[0];
        }
        BotUser.last_contact = new Date();

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

  return {
    initiate: initiate,
    getByID: getByID,
    load: load,
    getAll: getAll,
    save: save
  };
};