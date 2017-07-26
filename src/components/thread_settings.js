module.exports = function (controller) {

  controller.api.messenger_profile.greeting("Hi! I'm a bot from TIP 2017 class. I can help you have info about the program.");
  controller.api.messenger_profile.get_started('HELP_PAYLOAD');
  controller.api.messenger_profile.domain_whitelist(['http://dev-tip-2017-bot.pantheonsite.io/view/session/today']);

  menu_call_to_actions = [
    {
      "title": "Current",
      "type": "postback",
      "payload": "CURRENT_PAYLOAD"
    },
    {
      "title": "Next",
      "type": "postback",
      "payload": "NEXT_PAYLOAD"
    },
    {
      "title": "Help",
      "type": "postback",
      "payload": "HELP_PAYLOAD"
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