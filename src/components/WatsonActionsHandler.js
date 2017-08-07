module.exports = function (bot, message, eventEmitter) {

    let SkillSet = require('../skills/skillz.js')(bot, message);

    let eventHandlers = {

         hearWelcome : function () {
            eventEmitter.on('welcome', function() {
                bot.reply(message, message.watsonData.output.text[0], function () {
                    SkillSet.about();
                });
            });
        },

        hearAbout : function () {
            eventEmitter.on('about', function() {
                SkillSet.about();
            });
        },

        hearToday : function () {
            eventEmitter.on('today', function() {
                SkillSet.today();
            });
        },

        hearCurrent : function () {
            eventEmitter.on('current', function() {
                SkillSet.current();
            });
        },

        hearNext : function () {
            eventEmitter.on('next', function() {
                SkillSet.next();
            });
        },

         hearTomorrow : function () {
            eventEmitter.on('tomorrow', function() {
                SkillSet.tomorrow();
            });
        },

         hearShowWebview : function () {
            console.log('SHOW WEBVIEW HANDLER');
            eventEmitter.on('show_webview', function() {
                SkillSet.showTodayWebview();
            });
        },

        hearShowLocations : function () {
            eventEmitter.on('location', function() {
                SkillSet.showLocationsList();
            });
        },
   }

   eventHandlers.hearAbout();
   eventHandlers.hearToday();
   eventHandlers.hearCurrent();
   eventHandlers.hearNext();
   eventHandlers.hearShowWebview();
   eventHandlers.hearTomorrow();
   eventHandlers.hearWelcome();
   eventHandlers.hearShowLocations();
}