module.exports = function (controller) {

  // Dashbot is a turnkey analytics platform for bots.
  // Sign up for a free key here: https://www.dashbot.io/ to see your bot analytics in real time.
  if (process.env.HEROKU_ENV && process.env.DASHBOT_API_KEY) {
    var dashbot = require('dashbot')(process.env.DASHBOT_API_KEY).facebook;
    controller.middleware.receive.use(dashbot.receive);
    controller.middleware.send.use(dashbot.send);
    controller.log.info('Dashbot enabled');
  } else {
    controller.log.info('Dashbot DISABLED');
  }

};