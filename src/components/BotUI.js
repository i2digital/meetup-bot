module.exports = function () {

  BotUI = {

    formatList: function (bot, message, items, showDate, cb) {

      if (items && items.length > 0) {
        bot.startConversation(message, function (err, convo) {

          items.forEach(function (item) {

            msg = '* ';
            if (showDate) {
              msg += item.date_day + ' - ';
            }
            msg += item.date_start + '/' + item.date_end + "\n";
            if(item.tags){
              msg += item.title + ' (' + item.tags + ")\n";
            }else {
              msg += item.title
            }
            if (item.presenter.length > 0) {
              msg += item.presenter + "\n";
            }
            if(item.text.length > 0) {
              msg += item.text + "\n";
            }
            msg += "\n";
            convo.say(msg);
            convo.next();
          });
        });
      } else {
        bot.reply(message, 'Não há atividades para este dia.');
      }
    },

    todayInWebview: function (bot, message) {
        var replyMessage = {};

        api_path = process.env.API_PATH;

        var genericTemplateInterface = require('../components/FacebookAPIInterface').generic_template_model();


        genericTemplateInterface.addElement('Tip Talks',
                                                                        'https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAVtAAAAJDY5MDcxNWM3LTA5NTktNGY5Ny1hMGMzLTZiNGRjM2IyYThlNA.png',
                                                                        'Here you become aware of every talks in TIP 2017',
                                                                        'http://dev-tip-2017-bot.pantheonsite.io/view/session/today',//CORRIGIR URL
                                                                        false,
                                                                        undefined);
        genericTemplateInterface.addButton('Exibir cronograma!', 'http://dev-tip-2017-bot.pantheonsite.io/view/session/today');

        replyMessage = genericTemplateInterface.genericTemplateMessage;

        bot.reply(message, replyMessage);

    },

    welcomeMessage: function () {
        msg = "Olá, eu sou o Hack Town Bot e posso te dar informações sobre o evento deste ano. O que você gostaria de saber?"
        return msg;
    },

    aboutMessage: function () {

      msg = "Você pode me perguntar:\n\n"
        + "* agora - atividades acontecendo agora.\n"
        + "* próxima - atividades que acontecerão em seguida.\n"
        + "* hoje - atividades que ainda vão acontecer hoje.\n"
        + "* amanhã - atividades de amanhã.\n"
        + "* buscar PALAVRA-CHAVE  - buscar atividades por palavra-chave.\n"
        + "* programação - visualizar a programação completa do evento.\n"
        + "* ajuda - exibir estas opções novamente."

      return msg;
    },
    catchAllMessage: function () {
      msg = "Desculpe, ainda não estou tão inteligente assim! =(\n"
        + "Você pode me perguntar:\n"
        + "* agora - atividades acontecendo agora.\n"
        + "* próxima - atividades que acontecerão em seguida.\n"
        + "* hoje - atividades que ainda vão acontecer hoje.\n"
        + "* amanhã - atividades de amanhã.\n"
        + "* buscar PALAVRA-CHAVE  - buscar atividades por palavra-chave.\n"
        + "* programação - visualizar a programação completa do evento.\n"
        + "* ajuda - exibir estas opções novamente."

      return msg;
    }

  };

  return BotUI;

};