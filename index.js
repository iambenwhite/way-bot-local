//--- initilise bot
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

// controller.hears(['where are you (.*)'],['ambient', 'direct_message','direct_mention','mention'],function(bot,message) {
//   var person = message.match[1]; //match[1] is the (.*) group. match[0] is the entire group (open the (.*) doors).
//   return bot.reply(message, person +' is working from home right now.');
// });

//dbconnect();

//function dbconnect(){

controller.hears(['where are you (.*)'],['ambient', 'direct_message','direct_mention','mention'],function(bot,message) {

  var person = message.match[1];

  var mysql = require('mysql');  

  var connection = mysql.createConnection(
      {
        host     : '69.90.163.150',
        user     : 'thewh134_super',
        password : 'Super01',
        database : 'thewh134_waybot',
      }
  );

  connection.connect();

  //var sql = mysql.format("SELECT url FROM Sonic_url WHERE name=?", [person]);
  var sql = mysql.format("SELECT * from users WHERE username =?", [person]);

  connection.query(sql, function(err, result, fields) {
  if (!err)
  {
    for (var i in result) {
            var user = result[i];
            console.log(user.username + ' - ' + user.first_name + ' ' + user.last_name + ' : ' + user.status);
            bot.reply(message, user.first_name + ' ' + user.last_name + ' is ' + user.status + ' today.');
        }
  }
  else
    console.log('Error while performing Query.');
  });

  connection.end();

});






