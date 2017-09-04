module.exports = function (controller) {

  controller.api.messenger_profile.greeting("Olá! Eu sou o chatbot do Hack Town e vou te ajudar a navegar pelo evento! Vamos começar?");
  controller.api.messenger_profile.get_started('welcome_payload');

  menu_call_to_actions = [

    {
      "title": "Ajuda",
      "type": "postback",
      "payload": "about"
    },
    {
      "title": "Mapa do Evento",
      "type": "postback",
      "payload": "mapa"
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