const FacebookUI = require('./FacebookUI');

module.exports = function () {

  BotUI = {

    showActivitiesListForPresenter: function (bot, message, items) {
      if (items && items.length > 0) {
        bot.startConversation(message, function (err, convo) {

          items.forEach(function (item) {

            var sessionID = item.id;

            msg = '* ';
            msg += item.date_start + ' / ' + item.date_end + "\n";
            msg += item.title + "\n";
            msg += item.presenter;

            var postBackButtonInterface = FacebookUI.button(msg);
            postBackButtonInterface.addButton('Detalhes da Atividade', 'postback','session_details_' + sessionID);

            var response = postBackButtonInterface.postBackButton;

            convo.say(response);
            convo.next();
          });
        });
      } else {
        bot.reply(message, 'Não há atividades para este dia.');
      }
    },

    showActivityLocation: function (bot, message, item) {

      if (item.title && item.latitude && item.longitude) {

        var title = item.title;
        var lat = item.latitude.match(/[^,]*/i)[0];
        var long = item.longitude.match(/[^,]*/i)[0];
        var address;

        if (item.address) {
          address = item.address;
        } else {
          address = '';
        }

        var locationMessage = FacebookUI.staticMapLocationDisplay(title, lat, long, address);

        bot.reply(message, locationMessage);
      } else {
        bot.reply(message, 'Não consegui encontrar as coordenadas para o local desejado! :(');
      }

    },

    showLocationSessions: function (bot, message, items) {
      if (items && items.length > 0) {
          bot.startConversation(message, function (err, convo) {

            items.forEach(function(item) {
              var msg;
              var sessionID = item.id;

              msg = item.title + ':\n';

              if(item.presenter) {
                msg += item.presenter + '\n';
              }

              if(item.date_day && item.date_start && item.date_end){
                msg += item.date_day + ' - ';
                msg += item.date_start + ' / ' + item.date_end;
              }

              var postBackButtonInterface = FacebookUI.button(msg);
              postBackButtonInterface.addButton('Detalhes da Atividade', 'postback','session_details_' + sessionID);

              var response = postBackButtonInterface.postBackButton;
              convo.say(response);
              convo.next();
            });
          });
        } else {
          bot.reply(message, 'Não existem atividades para esta localização.')
        }
    },

    showPresenterDetails: function(bot, message, items) {

      var item = items[0];
      var msg = item.title + '\n\n';
      msg += item.text;
      var presenterPic = FacebookUI.imageMessage(item.image);

      bot.reply(message, presenterPic, function () {
        bot.reply(message, msg, function () {
          var text = 'Aqui voce pode ver todas as atividades deste palestrante!';
          var postBackButtonInterface = FacebookUI.button(text);
          postBackButtonInterface.addButton('Atividades', 'postback','presenter_sessions_' + item.id);

          var viewSessionsButton = postBackButtonInterface.postBackButton;

          bot.reply(message, viewSessionsButton);
        });
      });
    },

    showActivityDetails: function (bot, message, items) {
      var item = items[0];

      var msg = item.title + '\n';
      msg += item.presenter + '\n\n';

      if(item.tags && item.tags > 0) {
        msg += '(' + item.tags + ')\n';
      }

      bot.reply(message, msg, function () {

        var dateTime = 'Data:\n';
        dateTime += ' - ' + item.date_day + '\n';
        dateTime += 'Hora Início / Hora Término:\n';
        dateTime += ' - ' + item.date_start + ' / ' + item.date_end;

        bot.reply(message, dateTime, function () {

          if(item.text && item.text.length > 0 ) {

            var description = 'Descrição:\n\n';
            description += ' - ' + item.text;

            bot.reply(message, description, viewDirectionsButton);
          } else {
            viewDirectionsButton();
          }

          function viewDirectionsButton() {

            if (item.location_address.length > 0) {
              var text = 'Endereço' + item.location_address;
            } else {
              var text = 'Veja como chegar:';
            }
            var postBackButtonInterface = FacebookUI.button(text);
            postBackButtonInterface.addButton('Ver Direções', 'postback','location_id_' + item.location_id);
            var response = postBackButtonInterface.postBackButton;

            bot.reply(message, response);
          }
        });
      });
    },

     formatLocationsList: function (bot, message, items) {
        if (items && items.length > 0) {
          bot.startConversation(message, function (err, convo) {

            items.forEach(function(item) {

              var msg;

              var locationID = item.id;

              var msg = item.title + ':\n';

              var postBackButtonInterface = FacebookUI.button(msg);
              postBackButtonInterface.addButton('Atividades no local', 'postback','location_sessions_' + locationID);

              var response = postBackButtonInterface.postBackButton;
              convo.say(response);
              convo.next();
            });

            var button = FacebookUI.button('Se quiser saber sobre as atividades em todos os locais do evento, confira nossa programação oficial completa.');
            button.addButton('Programação', 'web_url','http://hacktown.com.br/programacao-oficial/');
            var responseButton = button.postBackButton;

            convo.say(responseButton);
            convo.next();

          });
        } else {
          bot.reply(message, 'Não existem localizações para serem exibidas.', function() {

            var button = FacebookUI.button('Se quiser saber sobre as atividades em todos os locais do evento, confira nossa programação oficial completa.');
            button.addButton('Programação', 'web_url','http://hacktown.com.br/programacao-oficial/');
            var responseButton = button.postBackButton;

            bot.reply(message, responseButton);
          })
        }
      },

      formatPresentersList: function (bot, message, items) {
        if (items && items.length > 0) {
          bot.startConversation(message, function (err, convo) {

            items.forEach(function(item) {

              var msg;

              var presenterID = item.id;

              var msg = item.title + '\n\n';

              if(item.text) {
                msg += ' - ' + item.text;
              }

              var postBackButtonInterface = FacebookUI.button(msg);
              postBackButtonInterface.addButton('Atividades do palestrante', 'postback','presenter_sessions_' + presenterID);

              var response = postBackButtonInterface.postBackButton;
              convo.say(response);
              convo.next();
            });

            var button = FacebookUI.button('Caso deseje saber sobre outros palestrantes, confira a programação completa no site.');
            button.addButton('Programação', 'web_url','http://hacktown.com.br/programacao-oficial/');
            var responseButton = button.postBackButton;

            convo.say(responseButton);
            convo.next();
          });
        } else {
          bot.reply(message, 'Não existem palestrantes para serem exibidos.', function() {
            var button = FacebookUI.button('Acesse nossa programação oficial e confira tudo sobre nossos palestrantes.');
            button.addButton('Programação', 'web_url','http://hacktown.com.br/programacao-oficial/');
            var responseButton = button.postBackButton;

            bot.reply(message, responseButton);
          })
        }
      },

      formatActivitiesCarrousel: function (bot, message, items, cb) {
      if (items && items.length > 0) {
        elementIndex = 0;

        bot.startConversation(message, function (err, convo) {

          genericTemplate = FacebookUI.generic_template_model();

          items.slice(0, 5).forEach(function (item) {

              sessionID = item.id;
              presenterID = item.presenter_id;
              title = item.title;
              var presenter = '';
              var date = '';

              if(item.presenter){
                presenter = item.presenter + '\n';
              }
              if(item.date_day){
                date += item.date_day;
              }
              if(item.date_start){
                date += ' - ' + item.date_start;
              }
              if(item.date_end){
                date += ' / ' + item.date_end
              }

              additionalInfo = presenter + date;

              genericTemplate.addElement(title, null, additionalInfo, 'postback', null, false, null);
              genericTemplate.addButton('Detalhes da Atividade', 'postback', 'session_details_' + sessionID, elementIndex);

              if(item.presenter) {
                genericTemplate.addButton('Detalhes do Palestrante', 'postback', 'presenter_details_' + presenterID, elementIndex);
              }

              elementIndex++;

          });
          response = genericTemplate.genericTemplateMessage;
          convo.say(response);

          var button = FacebookUI.button('Caso deseje saber sobre outras atividades, confira a programação completa no site.');
          button.addButton('Programação', 'web_url','http://hacktown.com.br/programacao-oficial/');
          var responseButton = button.postBackButton;

          convo.say(responseButton);
          convo.next();
        });

      } else {
        bot.reply(message, 'Não encontrei nenhum resultado para sua busca.');
      }
    },

    formatActivitiesList: function (bot, message, items, cb) {
      if (items && items.length > 0) {
        bot.startConversation(message, function (err, convo) {
          items.slice(0, 5).forEach(function (item) {

              var msg;
              var sessionID = item.id;
              var presenterID = item.presenter_id;

              msg = '* ';
              msg += item.date_start + ' / ' + item.date_end + "\n";
              msg += item.title + "\n";
              msg += item.presenter;

              var postBackButtonInterface = FacebookUI.button(msg);
              postBackButtonInterface.addButton('Detalhes da Atividade', 'postback', 'session_details_' + sessionID);
              postBackButtonInterface.addButton('Detalhes do Palestrante', 'postback','presenter_details_' + presenterID);

              var response = postBackButtonInterface.postBackButton;

              convo.say(response);
              convo.next();

          });
        });

        if(items.length > 5) {
          cb(null);
        }

      } else {
        bot.reply(message, 'Não encontrei nenhum resultado para sua busca.');
      }
    },

    scheduleWebview: function (bot, message) {
      var replyMessage = {};

      var genericTemplateInterface = FacebookUI.generic_template_model();

      genericTemplateInterface.addElement('Programação oficial Hack Town 2017',
        'https://www.conciergebrasil.org/wp-content/uploads/2017/04/a4f83f_30f516344e1643769ed25836d971fb2c-mv2.png',
        false,
        undefined);
      genericTemplateInterface.addButton('Exibir programação!', 'web_url', 'http://hacktown.com.br/programacao-oficial/', 0);

      replyMessage = genericTemplateInterface.genericTemplateMessage;

      bot.reply(message, replyMessage);

    },

    welcomeMessage: function () {
      msg = "Olá, eu sou o Hack Town Bot e posso te dar informações sobre o evento deste ano. O que você gostaria de saber?"
      return msg;
    },

    aboutMenu: function (bot, message) {

      var genericTemplateInterface = FacebookUI.generic_template_model();

      genericTemplateInterface.addElement('Veja suas opções', null, null, 'postback', null, false, null);
      genericTemplateInterface.addButton('Acontecendo agora', 'postback', 'current', 0);
      genericTemplateInterface.addButton('Proxima atividade', 'postback', 'next', 0);
      genericTemplateInterface.addButton('Rolando hoje', 'postback', 'today', 0);

      genericTemplateInterface.addElement('Mais opções', null, null, 'postback', null, false, null);
      genericTemplateInterface.addButton('Vai rolar amanhã', 'postback', 'tomorrow', 1);
      genericTemplateInterface.addButton('Ver agenda completa no site', 'web_url', 'http://hacktown.com.br/programacao-oficial/', 1);
      genericTemplateInterface.addButton('Lista de locais', 'postback', 'locations', 1);

      replyMessage = genericTemplateInterface.genericTemplateMessage;

      bot.reply(message, replyMessage);

    }

  };

  return BotUI;

};