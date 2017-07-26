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
            msg += item.title + ' (' + item.track + ")\n";
            if (item.presenter.length > 0) {
              msg += item.presenter + "\n"
            }
            msg += "\n";
            convo.say(msg);
            convo.next();
          });
        });
      } else {
        bot.reply('No session for this day');
      }
    },

    displayWebview: function (bot, message) {
        var replyMessage = {};

        // BUTTON MODEL
        // var text = 'See the talks on TIP today!',
        //       url = 'http://dev-tip-2017-bot.pantheonsite.io/view/session/today',
        //       title = 'TIP 2017 Agenda',
        //       webviewInterface = require('../components/FacebookAPIInterface').webview_button(text, url, title);

        // replyMessage = webviewInterface.webviewMessage;

        // ----------------------- //

        //GENERIC TEMPLATE MODEL
        var genericTemplateInterface = require('../components/FacebookAPIInterface').generic_template_model();


        genericTemplateInterface.addElement('Tip Talks',
                                                                        'https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAVtAAAAJDY5MDcxNWM3LTA5NTktNGY5Ny1hMGMzLTZiNGRjM2IyYThlNA.png',
                                                                        'Here you become aware of every talks in TIP 2017',
                                                                        'http://dev-tip-2017-bot.pantheonsite.io/view/session/today',
                                                                        false,
                                                                        undefined);
        genericTemplateInterface.addButton('Show me the schedule!', 'http://dev-tip-2017-bot.pantheonsite.io/view/session/today');

        replyMessage = genericTemplateInterface.genericTemplateMessage;

        bot.reply(message, replyMessage);

    },

    welcomeMessage: function () {
      msg = "Hi! I'm a bot to help you get info about the TIP 2017 sessions.\n"
        + "You can ask me:\n"
        + "* current - for current session info\n"
        + "* next - for next session info\n"
        + "* today - for today's sessions info\n"
        + "* tomorrow - for tomorrow's sessions info\n"
        + "* search/find KEYWORD - search sessions by keyword\n"
        + "* help / about - this info";
      return msg;
    },
    catchAllMessage: function () {
      msg = "Sorry, but i'm not that smart yet =(\n"
        + "You can only ask me for:\n"
        + "* current - for current session info\n"
        + "* next - for next session info\n"
        + "* today - for today's sessions info\n"
        + "* tomorrow - for tomorrow's sessions info\n"
        + "* search/find KEYWORD - search sessions by keyword\n"
        + "* help / about - this info";
      return msg;
    }

  };

  return BotUI;

};