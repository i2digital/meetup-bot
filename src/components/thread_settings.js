module.exports = function (controller) {

  controller.api.messenger_profile.greeting("Hi! I'm a bot from TIP 2017 class. I can help you have info about the program.");
  controller.api.messenger_profile.get_started('welcome');
  controller.api.messenger_profile.domain_whitelist(['http://dev-tip-2017-bot.pantheonsite.io/view/session/today']);

  menu_call_to_actions = [
    {
      "title": "Agora",
      "type": "postback",
      "payload": "current"
    },
    {
      "title": "Próxima",
      "type": "postback",
      "payload": "next"
    },
    {
      "title": "Ajuda",
      "type": "postback",
      "payload": "about"
    }
  ];

  controller.api.messenger_profile.menu(
    [
      {
        "locale": "default",
        "call_to_actions": menu_call_to_actions
      },
      {
        "locale": "en_US",
        "call_to_actions": menu_call_to_actions
      }
    ]
  );

};