let userProfile = require('../components/UserProfileAPIInterface');
let BotUI = require('../components/BotUI');

module.exports = function (controller, watsonMiddleware) {

    function extractName(message, callback) {
        userProfile(message.user).req(function(err, body) {
            var firstName = JSON.parse(body).first_name;
            callback(null, firstName);
        });
    }

    function processWatsonResponse(bot, message) {

        var newMessage = message;
        newMessage.text = 'welcome';

        extractName(message, updateUserName);

        function updateUserName (err, firstName) {
            if(err){
                throw new Error('An error in extractName has ocurred.');
            }else {
                watsonMiddleware.updateContext(message.user,
                    {
                    nome: firstName
                    }
                    ,
                    replyUpdatedMessage);
            }
        }

        function replyUpdatedMessage () {
            watsonMiddleware.sendToWatson(bot, newMessage, function(){
                bot.reply(newMessage, newMessage.watsonData.output.text[0], function() {
                    BotUI().aboutMenu(bot, message);
                });
            });
        }
    }


    controller.hears(['welcome_payload'], ['facebook_postback'], processWatsonResponse);

};