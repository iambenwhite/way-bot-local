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
