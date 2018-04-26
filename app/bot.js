// disable node-telegram-bot-api deprecation warning
process.env["NTBA_FIX_319"] = 1;

const TelegramBot = require ('node-telegram-bot-api');
const TOKEN = "588568875:AAG-7lwiOAxZXHgiPvnAYz2G6ZmDj-0fR-E";

const fs = require('fs');
const path = require('path');
const https = require("https");
const ontime = require('ontime')

const {debug, loadJSON, helloWorld} = require ('./helpers');

console.log('Bot has been started');

const bot = new TelegramBot (TOKEN, {
    polling: {
        interval: 300,
        autoStart: true,
        params: {
            timeout: 10
        }
    }
})

// messsage standart reply
bot.on('message', (msg) => {

    // exclude commands
    if (msg.text[0] === '\/') {return true}

    const standartMessages = [
        'Hi', 'Message recieved !', 'Ave Maria', 'Deus Vult', 'In nomine Patris et Fili et Spiritus Sancti', 'Pater noster, qui ts in caelis', 'Sanctrticetur nomen Tuum.', 'Adveniat regnum Tuum.', 'Adveniat regnum Tuum.', 'Fiat voluntas Tua, sicut in caelo et in terra.', 'Panem nostrum quotidianum da nobis hodie.', 'Et dimitte nobis debita nostra, sicut et nos dimittimus debitoribus nostris', 'Et ne nos inducas in tentationem', 'Sed libera nos malo', 'Amen'
    ]

    bot.sendMessage(msg.chat.id, `To ${msg.from.first_name}:
      ${standartMessages[Math.floor(Math.random() * standartMessages.length)]}
      ${helloWorld()}
      `)
})

// Chuck Norris joke
bot.onText(/\/joke/, (msg) => {
  const url =
    "https://api.chucknorris.io/jokes/random";
  https.get(url, res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;
    });
    res.on("end", () => {
      body = JSON.parse(body);
      bot.sendMessage(msg.chat.id, `${body.value}`)
    });
  });
});

// send picture
bot.onText(/\/pic/, function (msg) {
  var photo = __dirname+'/a.png';
  bot.sendPhoto(msg.chat.id, photo, {caption: "I'm a bot!"});
})

// ontime

ontime({
    cycle: [ '00:00', '30:00' ]
}, function (ot) {
  const url =
    "https://api.chucknorris.io/jokes/random";
  https.get(url, res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;
    });
    res.on("end", () => {
      body = JSON.parse(body);
      bot.sendMessage(539931414, `Hourly message: ${body.value}`)
    });
  });
})
