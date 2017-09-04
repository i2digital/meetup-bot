var Botkit = require('botkit'); //puxa o módulo do botkit

/**
 * CHECK DEPENDENCIES
 */
if (!process.env.HEROKU_ENV) {
  var env = require('node-env-file'); //puxa o módulo env responsável por setar o ambiente da aplicação
  env(__dirname + '/.env'); //aponta o móulo env para ler o arquivo .env
}
if (!process.env.MONGODB_URI) {
  console.log('Error: Need MongoDB');
  process.exit(1);
}

/**
 * ENVIRONMENT SETUP
 */
var mongoStorage = require('botkit-storage-mongo')({
  mongoUri: process.env.MONGODB_URI,
  tables: ['botusers']
});

var controller = Botkit.facebookbot({
  debug: true,
  storage: mongoStorage,
  access_token: process.env.FB_PAGE_TOKEN,
  verify_token: process.env.FB_VERIFY_TOKEN,
  bot_type: 'facebook',
  receive_via_postback: true
});

var watsonMiddleware = require('botkit-middleware-watson')({
  username: process.env.WATSON_CONVERSATION_USERNAME,
  password: process.env.WATSON_CONVERSATION_PASSWORD,
  workspace_id: process.env.WATSON_CONVERSATION_WORKSPACEID,
  version_date: '2017-05-26'
});
controller.middleware.receive.use(watsonMiddleware.receive);

var webserver = require(__dirname + '/components/express_webserver.js')(controller);

require(__dirname + '/components/subscribe_events.js')(controller);
require(__dirname + '/components/thread_settings.js')(controller);
require(__dirname + '/components/plugin_dashbot.js')(controller);
require(__dirname + '/components/watson_processing.js')(controller);

var normalizedPath = require("path").join(__dirname, "skills");
require("fs").readdirSync(normalizedPath).forEach(function (file) {
  require("./skills/" + file)(controller, watsonMiddleware);
});