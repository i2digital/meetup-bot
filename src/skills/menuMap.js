module.exports.condition = function (params) {

  switch (params.message.type) {

    case 'user_message':
      if (params.message.text.toLowerCase() == 'Mapa') {
        return true;
      }
      if (params.message.text.toLowerCase() == 'Mapa do Evento') {
        return true;
      }

      break;

    case 'facebook_postback':
      if (params.message.text == 'PAYLOAD_MAP') {
        return true;
      }
      break;
  }

  return false;
};

module.exports.run = function (params) {

  var FacebookUI = require('../UI/FacebookUI');

  params.bot.startTyping(message, function () {
    bot.reply(message, 'Se perde não, hein! ;)', function () {

      url = 'https://scontent.fsdu6-1.fna.fbcdn.net/v/t31.0-8/21200863_1947435318804214_5858238536783831471_o.jpg?oh=02dc98f70cf477271eeee3626180aed7&oe=5A199B00';
      bot.reply(message, FacebookUI.imageMessage(url));
    });

  });

};