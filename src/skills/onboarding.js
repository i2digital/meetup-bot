var BotUI = require('../UI/BotUI');
var FacebookUI = require('../UI/FacebookUI');
var FacebookUser = require('../services/FacebookUser');

module.exports = function (controller, watsonMiddleware) {

  var BotUserService = require('../services/BotUserService.js')(controller);

  controller.hears(['PAYLOAD_WELCOME'], ['facebook_postback'], function (bot, message) {

    bot.startTyping(message, function () {

      BotUserService.load(message.user).then(function (BotUser) {

        BotUser.history.push(message);

        FacebookUser(message.user).req(function (err, body) {
          BotUser.data = JSON.parse(body);

          bot.reply(message, 'Oi ' + BotUser.data.first_name + '! Tudo bem?', function () {

            bot.reply(message, 'Como o Hack Town está cada vez maior, agora contamos com um bot(eu \uD83E\uDD16) para te ajudar durante o evento.', function () {

              bot.reply(message, 'Se você precisar de informações sobre a programação ou locais de atividades, eu posso te ajudar.', function () {

                bot.reply(message, 'Para outras questões, basta pedir "ajuda"(digite ou clique no menu do messenger), que alguém da equipe te responderá assim que possível.', function () {

                  quickReply = FacebookUI.quick_reply();
                  quickReply.message.text = 'O que você quer agora?';
                  quickReply.addQuickReply('text', 'Programação', 'PAYLOAD_EVENT');
                  quickReply.addQuickReply('text', 'Ajuda', 'PAYLOAD_HELP');
                  bot.reply(message, quickReply.message);

                  BotUserService.save(BotUser);
                });
              });
            });
          });
        });
      });
    });
  });
};