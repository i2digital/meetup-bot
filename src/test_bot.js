var env = require('node-env-file'); //puxa o módulo env responsável por setar o ambiente da aplicação
env(__dirname + '/.env'); //aponta o móulo env para ler o arquivo .env

var Botkit = require('botkit'); //puxa o módulo do botkit
var debug = require('debug')('botkit:main'); //requer o módulo de debug do botkit
var os = require('os'); //puxa o módulo os, responsável por realizar operações do sistema operacional

var fb_page_token; //declara a variável que vai receber o token da página do facebook, determinado pelo usuário no painel do facebook
var watsonMiddleware; //declara a a variável que vai receber o middleware com o watson, responsável por integrar o botkit e a api do Watson Conversation


watson_username = process.env.WATSON_CONVERSATION_USERNAME;
watson_password = process.env.WATSON_CONVERSATION_PASSWORD;

//seta o ambiente de acordo com o computador que o estiver executando no momento
if (process.env.BOT_ENV) {

  watson_workspace_id = process.env.WATSON_CONVERSATION_WORKSPACEID_PROD;
  fb_page_token = process.env.FB_PAGE_TOKEN_PROD;

} else {

  watson_workspace_id = process.env.WATSON_CONVERSATION_WORKSPACEID_DEV;

  if (os.hostname() == "nickballeste-Aspire-F5-573G") {
    console.log("NICOLAU's FB DEV TOKEN");
    fb_page_token = process.env.FB_PAGE_TOKEN_DEV_NICOLAU;
  } else if (os.hostname() == "Pedros-MacBook-Pro.local") {
      console.log("PEDRO's FB DEV TOKEN");
      fb_page_token = process.env.FB_PAGE_TOKEN_DEV_PEDRO;
  } else {
      console.log("OTHER FB DEV TOKEN");
      fb_page_token = process.env.FB_PAGE_TOKEN_DEV;
  }
}

//seta a variável do middleware
watsonMiddleware = require('botkit-middleware-watson')({
  username: watson_username,
  password: watson_password,
  workspace_id: watson_workspace_id,
  version_date: '2017-05-26',
});

//seta a variável controller, ou seja, o orquestrador, responsável por lidar com as mensagens dos usuários
var controller = Botkit.facebookbot({
  debug: true,
  access_token: fb_page_token,
  verify_token: process.env.FB_VERIFY_TOKEN,
  bot_type: 'facebook',
  receive_via_postback: true,
  // require_delivery: true
});

//faz com que o middleware receba todas as mensages enviadas pelo usuário, reagindo a elas ou não
controller.middleware.receive.use(watsonMiddleware.receive);

//configura um webserver baseado em express, para expor os endpoints do webhook e as autorizações oauth
var webserver = require(__dirname + '/components/express_webserver.js')(controller);

//diz ao facebook para começar a mandar eventos para essa aplicação
require(__dirname + '/components/subscribe_events.js')(controller);

//diz ao facebook para configurar suas 'thread settings' de acordo com o que estiver especificado no arquivo thread_settings.js
require(__dirname + '/components/thread_settings.js')(controller);

//ativa o módulo que representa o middleware com o dashbot
require(__dirname + '/components/plugin_dashbot.js')(controller);



require(__dirname + "/skills/greeting.js")(controller, watsonMiddleware);

require(__dirname + "/skills/goodbye.js")(controller, watsonMiddleware);

require(__dirname + "/skills/welcome.js")(controller);


require(__dirname + "/skills/search.js")(controller);

require(__dirname + "/skills/process_all.js")(controller);

