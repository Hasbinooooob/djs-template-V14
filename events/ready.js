const { ActivityType } = require('discord.js');
const client = require('../index');
const config = require('../config/config.json')
client.on('ready', () => {
  client.user.setActivity({type: ActivityType.Playing, name: `${config.bot.prefix}help`})
  console.log(
    `
    ..............................................................................
    ........................${client.user.username} Is Online ....................
    ..............................................................................
    `
  );
})



