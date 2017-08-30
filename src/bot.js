var env = require('node-env-file'); //puxa o módulo env responsável por setar o ambiente da aplicação
env(__dirname + '/.env'); //aponta o móulo env para ler o arquivo .env

var Botkit = require('botkit'); //puxa o módulo do botkit
var debug = require('debug')('botkit:main'); //requer o módulo de debug do botkit
var os = require('os'); //puxa o módulo os, responsável por realizar operações do sistema operacional


var fb_page_token;
var watson_workspace_id;

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

var facebookController = Botkit.facebookbot({
  debug: true,
  access_token: fb_page_token,
  verify_token: process.env.FB_VERIFY_TOKEN,
  bot_type: 'facebook',
  receive_via_postback: true,
  // require_delivery: true
});


var watson_username = process.env.WATSON_CONVERSATION_USERNAME;
var watson_password = process.env.WATSON_CONVERSATION_PASSWORD;

var watsonMiddleware = require('botkit-middleware-watson')({
  username: watson_username,
  password: watson_password,
  workspace_id: watson_workspace_id,
  version_date: '2017-05-26',
} );


facebookController.middleware.receive.use(watsonMiddleware.receive);


var webserver = require(__dirname + '/components/express_webserver.js')(facebookController);

require(__dirname + '/components/subscribe_events.js')(facebookController);

require(__dirname + '/components/thread_settings.js')(facebookController);

require(__dirname + '/components/plugin_dashbot.js')(facebookController);



require(__dirname + "/skills/greeting.js")(facebookController, watsonMiddleware);

require(__dirname + "/skills/goodbye.js")(facebookController, watsonMiddleware);

require(__dirname + "/skills/welcome.js")(facebookController, watsonMiddleware);

require(__dirname + "/skills/onboarding.js")(facebookController, watsonMiddleware);

require(__dirname + "/skills/search.js")(facebookController);

require(__dirname + "/skills/viewDetails.js")(facebookController);

require(__dirname + "/skills/process_all_events.js")(facebookController);

// require(__dirname + "/skills/onboarding.js")(controller, watsonMiddleware);


