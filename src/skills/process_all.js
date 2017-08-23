var SessionService = require('../components/SessionService');
var BotUI = require('../components/BotUI');

module.exports = function (controller) {

    controller.hears(['(.*)'], ['message_received'], function (bot, message){

        console.log(message.watsonData);

        var SkillSet = require(__dirname + '/skillz.js')(bot, message);

            if(message.watsonData.output.action == 'welcome') {
                SkillSet.about();
            }

            if(message.watsonData.output.action == 'show_webview') {
                SkillSet.showWebview();
            }

            if(message.watsonData.output.action == 'about') {
                SkillSet.about();
            }

            if(message.watsonData.output.action == 'today') {
                SkillSet.today();
            }

            if(message.watsonData.output.action == 'tomorrow') {
                SkillSet.tomorrow();
            }

            if(message.watsonData.output.action == 'next') {
                SkillSet.next();
            }

            if(message.watsonData.output.action == 'current') {
                SkillSet.current();
            }

            if(message.watsonData.output.text.length > 0) {
                bot.reply(message, message.watsonData.output.text.join('\n'));
            }

    });
}
