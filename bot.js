import Facts from "./facts.js";
import Discord from 'discord.io';
import logger from 'winston';
import key from './key.js';
import Dino from './dino.js';
import Pair from './pair.js';
import Game from './cardGame.js'


// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
let bot = new Discord.Client({
  token: key.key,
  autorun: true
});

bot.on('ready', function(evt) {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function(user, userID, channelID, message, evt) {
  if (message.substring(0, 1) == '!') {
    let args = message.substring(1).split(' ');
    let cmd = args[0];
    
    switch(cmd) {
      case 'ping': bot.sendMessage({ to: channelID, message: 'Pong!' }); break;
      case 'ding': bot.sendMessage({ to: channelID, message: "dong!" }); break;
      case 'fact':
        let factPromise = Facts.getFact();
        factPromise.then(function(response) {
          const fact = replaceBackTicks((JSON.parse(response)).text);
          bot.sendMessage({
            to: channelID,
            message: fact
          });
        });
        break;
      case 'dino':
        let dinoPromise = Dino.getDino(args[1], args[2]);
        dinoPromise.then(function(response) {
          bot.sendMessage({to: channelID, message: response});
        });
        break;
      case 'join': Pair.group.push(userID); bot.sendMessage({ to: channelID, message: `${user} joined the group!` }); break;
      case 'pair':
        putPairsInChannels(bot.channels[channelID].guild_id, Pair.pairUsers());
        bot.sendMessage({ to: channelID, message: "Successfully paired" });
        break;
      case 'add-pair-channel': Pair.channels.push(getChannelId(args[1])); break;
      case 'cards': 
        let deck = new Game()
        bot.sendMessage({
          to: channelID,
          message: `Your card is ${deck.firstCard}. Will the next card be higher or lower?`
        });
        break;
      default: bot.sendMessage({ to: channelID, message: "Invalid Command" }); break;
    }
  }
});

function getChannelId(channelName) {
  return (Object.values(bot.channels).find(channel => channel.name === channelName)).id;
}

function putPairsInChannels(serverID, pairs) {
  pairs.forEach(function(pair, index) {
    bot.moveUserTo({ "serverID": serverID, "userID": pair[0], "channelID": Pair.channels[index] });
    bot.moveUserTo({ "serverID": serverID, "userID": pair[1], "channelID": Pair.channels[index] });

    if (pair.length === 3) {
      bot.moveUserTo({ "serverID": serverID, "userID": pair[2], "channelID": Pair.channels[index] });
    }
  });
}