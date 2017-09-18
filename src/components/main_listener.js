module.exports = function (controller) {

  controller.hears(['(.*)'], ['message_received'], function (bot, message) {

    console.log(message);

    var normalizedPath = require("path").join(__dirname, "skills").replace('components/', '');
    require("fs").readdirSync(normalizedPath).forEach(function (file) {
      skill = require(normalizedPath + '/' + file);

      if (typeof skill.condition != 'function') {
        console.log('Error: Skill ' + file + ' do not implement condition() method');
        process.exit(1);
      }

      if (typeof skill.run != 'function') {
        console.log('Error: Skill ' + file + ' do not implement run() method');
        process.exit(1);
      }

      params = {
        controller: controller,
        bot: bot,
        message: message,
      };

      if (skill.condition(params) === true) {
        console.log('SKILL RUN');
        skill.run(params);
      }

    });
  });
};
