const FacebookInterface = require('../components/FacebookAPIInterface');
const GoogleMapsService = require('../components/GoogleMapsService.js');

module.exports = function () {

  BotUI = {

    showActivitiesListForPresenter: function(bot, message, items){
      if (items && items.length > 0) {
        bot.startConversation(message, function (err, convo) {

          items.forEach(function (item) {

            var sessionID = item.id;

            msg = '* ';
            msg += item.date_start + ' / ' + item.date_end + "\n";
            msg += item.title + "\n";
            msg += item.presenter;

            var postBackButtonInterface = FacebookInterface.postback_button(msg);
            postBackButtonInterface.addButton('Detalhes da Atividade', 'session_details_' +  sessionID);

            var response = postBackButtonInterface.postBackButton;

            convo.say(response);
            convo.next();
          });
        });
      } else {
        bot.reply(message, 'Não há atividades para este dia.');
      }
    },

    showActivityLocation: function(bot, message, item) {

      if(item.title && item.latitude && item.longitude) {

        var title = item.title;
        var lat = item.latitude.match(/[^,]*/i)[0];
        var long = item.longitude.match(/[^,]*/i)[0];
        var address;

        if(item.address) {
          address = item.address;
        } else {
          address = '';
        }

        var locationMessage = FacebookInterface.staticMapLocationDisplay(title, lat, long, address);

        bot.reply(message, locationMessage);
      } else {
        bot.reply(message, 'Nao consegui encontrar as coordenadas para o local desejado! :(');
      }

    },

    //TODO display button in the locations list with a postback to
    //the location map, and Sessions happening there
    showLocationDetails: function(bot, message, items) {

    },

    //TODO display presenter image and details in a template
    //button with Presenter Sessions to display the speakings the presenter will give
    showPresenterDetails: function(bot, message, items) {
      var item = items[0];
      var msg = item.title + '\n\n';
      msg += item.text;
      var presenterPic = FacebookInterface.imageMessage(item.image);

      bot.reply(message, presenterPic, function(){
        bot.reply(message, msg, function(){
          var text = 'Aqui voce pode ver todas as atividades deste palestrante!';
          var postBackButtonInterface = FacebookInterface.postback_button(text);
          postBackButtonInterface.addButton('Atividades', 'presenter_sessions_' + item.id);

          var viewSessionsButton = postBackButtonInterface.postBackButton;

          bot.reply(message, viewSessionsButton);
        });
      });

    },

    showActivityDetails: function(bot, message, items) {
      var item = items[0];

      console.log(item);

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

          bot.reply(message, description, function() {

            if(item.location_address.length > 0){
              var text = 'Endereco' + item.location_address;
            }else{
              var text = 'Veja como chegar:';
            }
            var postBackButtonInterface = FacebookInterface.postback_button(text);
            postBackButtonInterface.addButton('Ver Direcoes', 'location_id_'+ item.location_id);
            var response = postBackButtonInterface.postBackButton;

            bot.reply(message, response);
          });
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

            var response = postBackButtonInterface.postBackButton;

            convo.say(response);
            convo.next();
          });
        });
      } else {
        bot.reply(message, 'Não há atividades para este dia.');
      }
    },



    scheduleWebview: function (bot, message) {//TODO ATUALIZAR PARA O HACKTOWN!!!
        var replyMessage = {};

        api_path = process.env.API_PATH;

        var genericTemplateInterface = FacebookInterface.generic_template_model();

        genericTemplateInterface.addElement('Programação oficial Hack Town 2017',
                                                                        'https://www.conciergebrasil.org/wp-content/uploads/2017/04/a4f83f_30f516344e1643769ed25836d971fb2c-mv2.png',
                                                                        false,
                                                                        undefined);
        genericTemplateInterface.addButton('Exibir programação!', 'web_url','http://hacktown.com.br/programacao-oficial/', 0);

        replyMessage = genericTemplateInterface.genericTemplateMessage;

        bot.reply(message, replyMessage);

    },

    welcomeMessage: function () {
        msg = "Olá, eu sou o Hack Town Bot e posso te dar informações sobre o evento deste ano. O que você gostaria de saber?"
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

  };

  return BotUI;

};