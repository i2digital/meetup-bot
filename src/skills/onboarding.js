const Promise = require('bluebird');
const watsonUtils = require('botkit-middleware-watson/lib/middleware/utils');
let updateContext = Promise.promisify(watsonUtils.updateContext);
let userProfile = require('../components/UserProfileAPIInterface');
let BotUI = require('../components/BotUI');

module.exports = function (controller, watsonMiddleware) {

    controller.hears(['welcome'], ['facebook_postback'], function (bot, message) {

        userProfile(message.user).req(extractName);

        function extractName (err, body) {
            if(!err){

                let firstName = JSON.parse(body).first_name;

                watsonMiddleware.sendToWatson(bot, message, welcomeReply);

                function welcomeReply (err) {

                    if(err){
                        console.log('ERRO >>>> ', err);
                    }else{
                        updateContext(message.user, watsonMiddleware.storage, {
                            context: {isOldUser: true, nome: firstName}
                        }, () => {
                            bot.reply(message, message.watsonData.output.text[0], () => {
                                bot.reply(message, BotUI().aboutMessage());
                            });
                        });



                    }
                }
            }
        }
  });

};