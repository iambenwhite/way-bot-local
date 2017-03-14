//--- initilise bot
var Botkit = require('botkit')

var token = process.env.SLACK_TOKEN

var controller = Botkit.slackbot({
  // reconnect to Slack RTM when connection goes bad
  retry: Infinity,
  debug: false,
  //json_file_store: 'path_to_json_database'
})

// Assume single team mode if we have a SLACK_TOKEN
if (token) {
  console.log('Starting in single-team mode')
  controller.spawn({
    token: token
  }).startRTM(function (err, bot, payload) {
    if (err) {
      throw new Error(err)
    }

    console.log('Connected to Slack RTM')
  })
// Otherwise assume multi-team mode - setup beep boop resourcer connection
} else {
  console.log('Starting in Beep Boop multi-team mode')
  require('beepboop-botkit').start(controller, { debug: true })
}

//initialise storage
// var controller = Botkit.slackbot({
//   json_file_store: 'path_to_json_database'
// });



controller.on('bot_channel_join', function (bot, message) {
  bot.reply(message, "I'm here!")
})

controller.hears(['where are you (.*)'],['ambient', 'direct_message','direct_mention','mention'],function(bot,message) {
  var person = message.match[1]; //match[1] is the (.*) group. match[0] is the entire group (open the (.*) doors).
  controller.storage.users.save({id: message.user, user:person}, function(err) { ... });
  var returnUser = controller.storage.users.get(id, function(err, user_data) {...});
  return bot.reply(message, returnUser +' is working from home right now.');
});