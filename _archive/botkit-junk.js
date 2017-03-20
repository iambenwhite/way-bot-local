//--------- botkit junk

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

connection.query('SELECT * FROM `iambenwhite` WHERE `author` = "David"', function (error, results, fields) {
  // error will be an Error if one occurred during the query 
  // results will contain the results of the query 
  // fields will contain information about the returned results fields (if any) 
});

    var mysqlStorage = require('botkit-storage-mysql')({host: '69.90.163.150', user: 'thewh134_super', password: 'Super01', database: 'thewh134_waybot'});,
        controller = Botkit.slackbot({
            storage: mysqlStorage
        });



 connection.query('SELECT * from iambenwhite', function(err, rows, fields) {
   if (!err)
     console.log('The solution is: ', rows);
   else
     console.log('Error while performing Query.');
 });


  // var queryString = 'SELECT * FROM iambenwhite';
   
  // mysqlStorage.query(queryString, function(err, rows, fields) {
  //     if (err) throw err;
   
  //     for (var i in rows) {
  //         var userStatus = rows[i].status;
  //         bot.reply(message, person + userStatus);

  //     }


  // });
//}

//-----

this works
connection.query('SELECT * from users WHERE username = "iambenwhite"', function(err, result, fields) {
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

//-----

  controller.on('bot_channel_join', function (bot, message) {
  bot.reply(message, "I'm here!")
})



//i am here ------------------------- THIS WORKS

controller.hears(['i am (.*)'],['ambient', 'direct_message','direct_mention','mention'],function(bot,message) {

  var current = message.user;
  //var user = users.info;
  var status = message.match[1];
  console.log(current);

  bot.api.users.info({user: message.user}, function(err, result){
    //check if it's the right user using info.user.name or info.user.id
    //bot.reply(message, info.user.name)
    console.log(result.user.name);
  })


  var mysql = require('mysql');  

  var connection = mysql.createConnection(
      {
        host     : '69.90.163.150',
        user     : 'thewh134_super',
        password : 'Super01',
        database : 'thewh134_waybot',
      }
  );

  var sql = mysql.format('UPDATE users SET status =? WHERE slack_user =?', [status, current]);


  connection.query(sql, function(err, result, fields) {
    if (!err)
    {
      //var user = result;
      //console.log(user.username + ' - ' + user.first_name + ' ' + user.last_name + ' : ' + user.status);
      //bot.reply(message, user.first_name + ' ' + user.last_name + ' is ' + user.status + ' today.');
      console.log('updated');
      //bot.reply(message, user.first_name + ' ' + user.last_name + ' is ' + result + ' today.');
    }
    else
      console.log('Error while performing Query.');
    });

  sql = mysql.format('SELECT * from users WHERE slack_user =?', [current]);

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


//____________________


controller.hears('hello',['direct_mention', 'mention'],function(bot, message) {
  bot.reply(message, 'Hello <@'+message.user+'>');
});


//callback exmaple

// Call our main function. Pass it a URI and a callback function
getData('http://fakedomain1234.com/userlist', writeData);

// Write some stuff to the p tag
document.getElementById('output').innerHTML += 'show this before data ...';

// Define our main function
function getData(dataURI, callback) {

    // Normally you would actually connect to a server here.
    // We're just going to simulate a 3-second delay.
    var timer = setTimeout(function () {

      // Here's some data which we're pretending came from dataURI
        var dataArray = [123, 456, 789, 012, 345, 678];

      // run our callback function
        callback(dataArray);

    }, 3000);
}

function writeData(myData) {
    document.getElementById('output').innerHTML += myData;
}

//____________________

// in database.js
exports.initdb = function(cb) {
  query("SELECT * FROM columns", cb)
}

function query(queryString, cb) {
  // .. stuff omitted

  var res = connection.query(queryString, function(err, rows, fields) {
    connection.end();
    if (err) return cb(err);
    cb(null,rows);
  });

// in server.js
io.sockets.on('connection', function(socket) {
  db.initdb(function(err,rows) {
    if (err) {
      // do something with the error
    } else {
      console.log(rows)
    }
  });
});



// add new user to db
// controller.on('team_join',function(bot, message) {

//     console.log('user_joined: ' + message.user);
//     //bot.reply(message, 'Welcome aboard!');
//     bot.api.users.info({user: message.user}, function(err, result){
//       console.log(result.user.name);
//    }); 

//    console.log('user_joined: ' + message.user);

//     bot.reply(message, 'Welcome aboard!');

// });

//add new user to db
// controller.on('channel_joined', function(bot, message) {

//     console.log('user_joined_channel: ' + message.user);
//     //bot.reply(message, 'Welcome aboard!');
//     // bot.api.users.info({user: message.user}, function(err, result){
//     //   console.log('user_name: ' + result.user.name);
//     // }); 

//    //console.log('user_joined: ' + message.user);

//     //bot.reply(message, 'Welcome aboard!');

// });










