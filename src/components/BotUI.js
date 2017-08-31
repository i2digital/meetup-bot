module.exports = function () {

  const FacebookInterface = require('../components/FacebookAPIInterface');

  BotUI = {

    showPresenterDetails: function(bot, message, items) {
      var item = items[0];
      var msg = item.title + '\n\n';
      msg += item.text;

      bot.reply(message, msg);

    },

    showActivityDetails: function(bot, message, items) {
      var item = items[0];

      var msg = item.title + '\n';
      msg += item.presenter + '\n\n';
      msg += '('+ item.tags + ')\n';

      bot.reply(message, msg, function () {

        var dateTime = 'Data:\n';
        dateTime += ' - ' + item.date_day + '\n';
        dateTime += 'Hora Inicio / Hora Termino:\n';
        dateTime += ' - ' + item.date_start + ' / ' + item.date_end;

        bot.reply(message, dateTime, function(){

          var description = 'Descricao:\n\n';
          description += ' - ' + item.text;

          bot.reply(message, description);
          //INCLUIR BOTAO "MOSTRAR DIRECOES"
        });
      });
    },

    formatActivitiesList: function(bot, message, items, cb) {

      if (items && items.length > 0) {
        bot.startConversation(message, function (err, convo) {

          items.forEach(function (item) {

            var sessionID = item.id;
            var presenterID = item.presenter_id;

            msg = '* ';
            msg += item.date_start + ' / ' + item.date_end + "\n";
            msg += item.title + "\n";
            msg += item.presenter;

            var postBackButtonInterface = FacebookInterface.postback_button(msg);
            postBackButtonInterface.addButton('Detalhes da Atividade', 'session_details_' +  sessionID);
            postBackButtonInterface.addButton('Detalhes do Palestrante', 'presenter_details_' + presenterID);

            convo.say(postBackButtonInterface.postBackButton);
            convo.next();
          });
        });
      } else {
        bot.reply(message, 'Não há atividades para este dia.');
      }
    },

    // formatList: function (bot, message, items, showDate, cb) {
    //   if (items && items.length > 0) {
    //     bot.startConversation(message, function (err, convo) {

    //       items.forEach(function (item) {
    //         msg = '* ';
    //         if (showDate) {
    //           msg += item.date_day + ' - ';
    //         }
    //         msg += item.date_start + '/' + item.date_end + "\n";
    //         if(item.tags){
    //           msg += item.title + ' (' + item.tags + ")\n";
    //         }else {
    //           msg += item.title
    //         }
    //         if (item.presenter.length > 0) {
    //           msg += item.presenter + "\n";
    //         }
    //         if(item.text.length > 0) {
    //           msg += item.text + "\n";
    //         }
    //         msg += "\n";
    //         convo.say(msg);
    //         convo.next();
    //       });
    //     });
    //   } else {
    //     bot.reply(message, 'Não há atividades para este dia.');
    //   }
    // },

    todayInWebview: function (bot, message) {//TODO ATUALIZAR PARA O HACKTOWN!!!
        var replyMessage = {};

        api_path = process.env.API_PATH;

        var genericTemplateInterface = FacebookInterface.generic_template_model();


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

    aboutMenu: function(bot, message) {

      var genericTemplateInterface = FacebookInterface.generic_template_model();

      genericTemplateInterface.addElement('Veja suas opções',null,null,'postback',null,false, null);
      genericTemplateInterface.addButton('Acontecendo agora','postback', 'current', 0);
      genericTemplateInterface.addButton('Proxima atividade','postback', 'next', 0);
      genericTemplateInterface.addButton('Rolando hoje','postback', 'today', 0);

      genericTemplateInterface.addElement('Mais opções',null,null,'postback',null,false,null);
      genericTemplateInterface.addButton('Vai rolar amanhã','postback', 'tomorrow', 1);
      genericTemplateInterface.addButton('Ver agenda completa no site','web_url', 'http://hacktown.com.br/programacao-oficial/', 1);
      genericTemplateInterface.addButton('Lista de locais','postback', 'locations', 1);


      replyMessage = genericTemplateInterface.genericTemplateMessage;

      bot.reply(message, replyMessage);

    },

    // catchAllMessage: function () {
    //   msg = "Desculpe, ainda não estou tão inteligente assim! =(\n"
    //     + "Você pode me perguntar:\n"
    //     + "* agora - atividades acontecendo agora.\n"
    //     + "* próxima - atividades que acontecerão em seguida.\n"
    //     + "* hoje - atividades que ainda vão acontecer hoje.\n"
    //     + "* amanhã - atividades de amanhã.\n"
    //     + "* buscar PALAVRA-CHAVE  - buscar atividades por palavra-chave.\n"
    //     + "* programação - visualizar a programação completa do evento.\n"
    //     + "* ajuda - exibir estas opções novamente."

    //   return msg;
    // }

  };

  return BotUI;

};