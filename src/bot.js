var env = require('node-env-file'); //puxa o módulo env responsável por setar o ambiente da aplicação
env(__dirname + '/.env'); //aponta o móulo env para ler o arquivo .env

var Botkit = require('botkit'); //puxa o módulo do botkit
var debug = require('debug')('botkit:main'); //requer o módulo de debug do botkit
var os = require('os'); //puxa o módulo os, responsável por realizar operações do sistema operacional

var fb_page_token;
var watson_workspace_id;

/**
 * ENVIRONMENT SETUP
 */
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

/**
 * FACEBOOK BOT SETUP
 */
var controller = Botkit.facebookbot({
  debug: true,
  access_token: fb_page_token,
  verify_token: process.env.FB_VERIFY_TOKEN,
  bot_type: 'facebook',
  receive_via_postback: true,
  // require_delivery: true
});

/**
 * WATSON MIDDLEWARE SETUP
 */
var watson_username = process.env.WATSON_CONVERSATION_USERNAME;
var watson_password = process.env.WATSON_CONVERSATION_PASSWORD;

var watsonMiddleware = require('botkit-middleware-watson')({
  username: watson_username,
  password: watson_password,
  workspace_id: watson_workspace_id,
  version_date: '2017-05-26',
});

controller.middleware.receive.use(watsonMiddleware.receive);

var webserver = require(__dirname + '/components/express_webserver.js')(controller);

require(__dirname + '/components/subscribe_events.js')(controller);
require(__dirname + '/components/thread_settings.js')(controller);
require(__dirname + '/components/plugin_dashbot.js')(controller);


var normalizedPath = require("path").join(__dirname, "skills");
require("fs").readdirSync(normalizedPath).forEach(function (file) {
  require("./skills/" + file)(controller, watsonMiddleware);
});