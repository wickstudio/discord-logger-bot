const Discord = require('discord.js');
const client = new Discord.Client();

const {token} = require('./config.json');

// load events
require('./handlers/eventshandler')(client, 'events');

client.login(token);