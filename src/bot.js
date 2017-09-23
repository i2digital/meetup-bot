var Botkit = require('botkit');

/**
 * CHECK DEPENDENCIES
 */
if (!process.env.HEROKU_ENV) {
  var env = require('node-env-file');
  env(__dirname + '/.env');
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

var webserver = require(__dirname + '/components/express_webserver.js')(controller);

require(__dirname + '/components/subscribe_events.js')(controller);
require(__dirname + '/components/thread_settings.js')(controller);
require(__dirname + '/components/plugin_dashbot.js')(controller);
require(__dirname + '/components/main_listener.js')(controller);