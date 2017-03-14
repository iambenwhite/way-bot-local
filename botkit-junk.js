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