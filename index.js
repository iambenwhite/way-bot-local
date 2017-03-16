//--- initilise bot
var Botkit = require('botkit')

var token = process.env.SLACK_TOKEN

var controller = Botkit.slackbot({
  // reconnect to Slack RTM when connection goes bad
  retry: Infinity,
  debug: false,
  require_delivery: true,
})

// Assume single team mode if we have a SLACK_TOKEN
if (token) {
  console.log('Starting in single-team mode')
  var bot = controller.spawn({
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


//where are you query -------------------------

controller.hears(['where are you <@(.*)>'],['ambient', 'direct_message','direct_mention','mention'],function(bot,message) {

  var currentUser = message.match[1];

  getUser(currentUser, function(gotUsername){
    var username = gotUsername;

    getStatus(username, function(gotUserData){
      var userData = gotUserData;
      bot.reply(message, '<@'+userData.username+'> is ' + userData.status);
    });
  });

});



//i am status update -------------------------

controller.hears(['i am (.*)'],['ambient', 'direct_message','direct_mention','mention'],function(bot,message) {

  var currentUser = message.user;
  var status = message.match[1];

  // Call getUser - query slack api
  getUser(currentUser, function(gotUsername){
    var username = gotUsername;

    setStatus(username, status, function(gotUserData){
      var userData = gotUserData;
      bot.reply(message, 'Thanks for letting me know - you are ' + userData.status);
    });
  });
});


// get username from slack api -------------------------
function getUser(param1, callback) {

    bot.api.users.info({user: param1}, function(err, result){
      callback(result.user.name);
    }); 
}


// set user status in db -------------------------
function setStatus(param1, param2, callback) {

  var username = param1;
  var status = param2;

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

  var sql = mysql.format('UPDATE users SET status =? WHERE username =?', [status, username]);

  connection.query(sql, function(err, result, fields) {
    if (!err)
    {
      console.log('updated');
    }
    else
      console.log('Error while performing Query.');
    });

  sql = mysql.format('SELECT * from users WHERE username =?', [username]);

  connection.query(sql, function(err, result, fields) {
  if (!err)
  {
      for (var i in result) {
        var user = result[i];
        callback(user);
      }
    } 
  else
    console.log('Error while performing Query.');
  });

  connection.end();

}


// set user status from db -------------------------
function getStatus(param1, callback) {

  var username = param1;

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

  var sql = mysql.format('SELECT * from users WHERE username =?', [username]);

  connection.query(sql, function(err, result, fields) {
  if (!err)
  {
    for (var i in result) {
            var user = result[i];
            //console.log(user.username + ' - ' + user.first_name + ' ' + user.last_name + ' : ' + user.status);
            callback(user);
        }
  }
  else
    console.log('Error while performing Query.');
  });

  connection.end();
}


