'use strict';

module.exports = function (controller) {

  function initiate(id) {
    return {
      id: id,
      started: new Date(),
      data: {},
      history: []
    };
  }

  function getByID(id) {
    return controller.storage.botusers.find({id: id});
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
    getAll: getAll,
    save: save
  };
};