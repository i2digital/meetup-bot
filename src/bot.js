var env = require('node-env-file');
env(__dirname + '/.env');

var Botkit = require('botkit');
var debug = require('debug')('botkit:main');
var os = require('os');

var fb_page_token;
var watsonMiddleware;

watson_username = process.env.WATSON_CONVERSATION_USERNAME;
watson_password = process.env.WATSON_CONVERSATION_PASSWORD;

// On Heroku PROD, the variable BOT_ENV is set
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

watsonMiddleware = require('botkit-middleware-watson')({
  username: watson_username,
  password: watson_password,
  workspace_id: watson_workspace_id,
  version_date: '2017-05-26',
});

var controller = Botkit.facebookbot({
  debug: true,
  verify_token: process.env.FB_VERIFY_TOKEN,
  access_token: fb_page_token,
  receive_via_postback: true,
  require_delivery: true
});

controller.middleware.receive.use(watsonMiddleware.receive);

// Set up an Express-powered webserver to expose oauth and webhook endpoints
var webserver = require(__dirname + '/components/express_webserver.js')(controller);

// Tell Facebook to start sending events to this application
require(__dirname + '/components/subscribe_events.js')(controller);

// Set up Facebook "thread settings" such as get started button, persistent menu
require(__dirname + '/components/thread_settings.js')(controller);

// Enable Dashbot.io plugin
require(__dirname + '/components/plugin_dashbot.js')(controller);

// // Internal APIs
// require(__dirname + '/components/UnitsService.js')(controller);

var normalizedPath = require("path").join(__dirname, "skills");
require("fs").readdirSync(normalizedPath).forEach(function (file) {
  require("./skills/" + file)(controller, watsonMiddleware);
});