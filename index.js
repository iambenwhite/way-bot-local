var Botkit = require('botkit')

var token = process.env.SLACK_TOKEN

var controller = Botkit.slackbot({
  // reconnect to Slack RTM when connection goes bad
  retry: Infinity,
  debug: false
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

controller.on('bot_channel_join', function (bot, message) {
  bot.reply(message, "I'm here!")
})

// controller.hears(['where am I', 'way'], ['ambient', 'direct_message','direct_mention','mention'], function (bot, message) {
//   bot.reply(message, 'Hi, I am here, do not panic.')
// })

// controller.on('message_received', function(bot, message) {
//     bot.reply(message, 'Er,I heard... something!');
// });

// controller.hears('where are you (.*)',['message_received'],function(bot,message) {
// //controller.hears(['where are you (.*)'],['ambient', 'direct_message','direct_mention','mention'],function(bot,message) {
//   var person = message.match[1]; //match[1] is the (.*) group. match[0] is the entire group (open the (.*) doors).
//   if (person === 'iambenwhite') {
//     return bot.reply(message, person +' is working from home right now.');
//   }
//   return bot.reply(message, 'Okay');
// });

//controller.hears('where are you (.*)',['message_received'],function(bot,message) {
controller.hears(['where are you (.*)'],['ambient', 'direct_message','direct_mention','mention'],function(bot,message) {
  var person = message.match[1]; //match[1] is the (.*) group. match[0] is the entire group (open the (.*) doors).
  return bot.reply(message, person +' is working from home right now.');
});