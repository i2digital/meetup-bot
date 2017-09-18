const BotUI = require('../UI/BotUI');
const FacebookUI = require('../UI/FacebookUI');
const FacebookUser = require('../services/FacebookUser');

module.exports.condition = function (params) {

  console.log(params);

  const message = params.message;

  if(message.type === 'facebook_postback'
    && message.payload === 'PAYLOAD_WELCOME'){
    return true;
  }
};

module.exports.run = function (params) {

  const controller = params.controller;
  const bot = params.bot;
  const message = params.message;

  const BotUserService = require('../services/BotUserService.js')(controller);

  bot.startTyping(message, function () {

    BotUserService.load(message).then(function (BotUser) {

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


};