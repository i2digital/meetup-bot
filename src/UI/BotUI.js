const FacebookUI = require('./FacebookUI');

var self = module.exports = function () {

  BotUI = {

    formatSessionsCarrousel: function (bot, message, items) {
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

            if (item.presenter) {
              presenter = item.presenter + '\n';
            }
            if (item.date_day) {
              date += item.date_day;
            }
            if (item.date_start) {
              date += ' - ' + item.date_start;
            }
            if (item.date_end) {
              date += ' / ' + item.date_end
            }

            additionalInfo = presenter + date;

            genericTemplate.addElement(title, null, additionalInfo, 'postback', null, false, null);
            genericTemplate.addButton('+ sobre atividade', 'postback', 'session_details_' + sessionID, elementIndex);

            if (item.presenter) {
              genericTemplate.addButton('+ sobre palestrante', 'postback', 'presenter_details_' + presenterID, elementIndex);
            }

            elementIndex++;

          });

          response = genericTemplate.message;
          convo.say(response);

          websiteButton = self().redirectToWebsiteButton('Não achou o que queria? Veja a programação completa no site');

          convo.say(websiteButton);
          convo.next();
        });

      } else {
        bot.reply(message, 'Não encontrei nenhum resultado para sua busca.', function () {
          websiteButton = self().redirectToWebsiteButton('Não achou o que queria? Veja a programação completa no site');
          bot.reply(message, websiteButton);
        });
      }
    },

    formatSessionsList: function (bot, message, items) {
      if (items && items.length > 0) {
        elementIndex = 0;

        bot.startConversation(message, function (err, convo) {

          items.forEach(function (item) {

            sessionID = item.id;
            presenterID = item.presenter_id;
            title = item.title;
            var presenter = '';
            var date = '';

            if (item.presenter) {
              presenter = item.presenter + '\n';
            }
            if (item.date_day) {
              date += item.date_day;
            }
            if (item.date_start) {
              date += ' - ' + item.date_start;
            }
            if (item.date_end) {
              date += ' / ' + item.date_end
            }

            additionalInfo = presenter + date;

            msg = title + '\n' + additionalInfo;

            var postBackButtonInterface = FacebookUI.button(msg);
            postBackButtonInterface.addButton('+ sobre atividade', 'postback', 'session_details_' + sessionID);
            postBackButtonInterface.addButton('+ sobre palestrante', 'postback', 'presenter_details_' + presenterID);

            var response = postBackButtonInterface.postBackButton;

            elementIndex++;
            convo.say(response);
            convo.next();
          });

        });

      } else {
        bot.reply(message, 'Não encontrei nenhum resultado para sua busca.', function () {
          websiteButton = self().redirectToWebsiteButton('Não achou o que queria? Veja a programação completa no site');
          bot.reply(message, websiteButton);
        });
      }
    },


    formatLocationsList: function (bot, message, items) {

      if (items && items.length > 0) {
        bot.startConversation(message, function (err, convo) {

          items.slice(0, 5).forEach(function (item) {

            var locationID = item.id;
            var msg = item.title + ':\n';

            var postBackButtonInterface = FacebookUI.button(msg);
            postBackButtonInterface.addButton('Atividades no local', 'postback', 'sessions_in_location_' + locationID);

            var response = postBackButtonInterface.postBackButton;
            convo.say(response);
            convo.next();
          });

          websiteButton = self().redirectToWebsiteButton('Não achou o que queria? Veja a programação completa no site');

          convo.say(websiteButton);
          convo.next();
        });

      } else {
        bot.reply(message, 'Não existem localizações para serem exibidas.', function () {

          websiteButton = self().redirectToWebsiteButton('Não achou o que queria? Veja a programação completa no site');

          bot.reply(message, websiteButton);
        });
      }
    },

    formatPresentersList: function (bot, message, items) {

      if (items && items.length > 0) {
        bot.startConversation(message, function (err, convo) {

          items.slice(0, 6).forEach(function (item) {

            var msg;

            var presenterID = item.id;

            var msg = item.title + '\n\n';

            if (item.text) {
              msg += ' - ' + item.text.replace('<br />', '\n');
            }

            var postBackButtonInterface = FacebookUI.button(msg);
            postBackButtonInterface.addButton('+ sobre atividades', 'postback', 'presenter_details_' + presenterID);

            var response = postBackButtonInterface.postBackButton;
            convo.say(response);
            convo.next();
          });

          websiteButton = self().redirectToWebsiteButton('Não achou o que queria? Veja a programação completa no site');
          convo.say(websiteButton);
          convo.next();
        });

      } else {
        bot.reply(message, 'Não existem palestrantes para serem exibidos.', function () {

          websiteButton = self().redirectToWebsiteButton('Não achou o que queria? Veja a programação completa no site');
          bot.reply(message, websiteButton);
        });
      }
    },

    redirectToWebsiteButton: function (text) {
      button = FacebookUI.button(text);
      button.addButton('Abrir o site', 'web_url', 'http://hacktown.com.br/programacao-oficial/');
      responseButton = button.postBackButton;
      return responseButton;
    },

    showSessionsInLocation: function (bot, message, items) {

      if (items && items.length > 0) {
        bot.startConversation(message, function (err, convo) {

          items.slice(0, 6).forEach(function (item) {
            var msg;
            var sessionID = item.id;

            msg = item.title + ':\n';

            if (item.presenter) {
              msg += item.presenter + '\n';
            }

            if (item.date_day && item.date_start && item.date_end) {
              msg += item.date_day + ' - ';
              msg += item.date_start + ' / ' + item.date_end;
            }

            var postBackButtonInterface = FacebookUI.button(msg);
            postBackButtonInterface.addButton('+ sobre atividade', 'postback', 'session_details_' + sessionID);

            var response = postBackButtonInterface.postBackButton;
            convo.say(response);
            convo.next();
          });
          websiteButton = self().redirectToWebsiteButton('Não achou o que queria? Veja a programação completa no site');
          convo.say(websiteButton);
          convo.next();
        });

      } else {
        bot.reply(message, 'Não existem atividades para esta localização.', function () {
          websiteButton = self().redirectToWebsiteButton('Não achou o que queria? Veja a programação completa no site');
          bot.reply(message, websiteButton);
        });
      }
    },

    showPresenterDetails: function (bot, message, items) {

      var presenter = items[0];
      var msg = presenter.title + '\n\n - ' + presenter.text.replace('<br />', '\n');

      bot.reply(message, msg, function () {
        PresenterService = require('../services/PresenterService');
        bot.startTyping(message, function () {

          bot.reply(message, 'Atividades de que participará:', function () {

            PresenterService().getPresenterSessions(presenter.id)
              .then(function (items) {
                self().formatSessionsCarrousel(bot, message, items);
              })
              .catch(function (err) {
                console.log('Error in SessionService.getDetails()');
                console.log(err);
              });
          });
        });
      });
    },

    showSessionDetails: function (bot, message, items) {
      var item = items[0];

      var msg = item.title + '\n';
      msg += ' - ' + item.presenter + '\n\n';

      if (item.tags && item.tags > 0) {
        msg += '(' + item.tags + ')\n';
      }

      bot.reply(message, msg, function () {

        var dateTime = 'Data:\n';
        dateTime += ' - ' + item.date_day + '\n';
        dateTime += 'Hora Início / Hora Término:\n';
        dateTime += ' - ' + item.date_start + ' / ' + item.date_end;

        bot.reply(message, dateTime, function () {

          var location = item.location_title;

          bot.reply(message, location, function () {

            if (item.text && item.text.length > 0) {

              var description = 'Descrição:\n\n';
              description += ' - ' + item.text.replace('<br />', '\n');

              bot.reply(message, description);
            }
          });
        });
      });
    }
  };

  return BotUI;
};