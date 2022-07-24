const Discord = require("discord.js")
const { EmbedBuilder } = require('discord.js');
const client = require("..");
const config = require("../config/config.json")
client.on("messageCreate", async (message) => {
  try {
    if (!message.guild || !message.channel) return;
    if (message.channel.partial) await message.channel.fetch();
    if (message.partial) await message.fetch();
    if (message.author.bot) return;
    let prefix = config.bot.prefix
    function escapeRegex(str) {
      try {
        return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
      } catch (e) {
        console.log(String(e.stack).bgRed)
      }
    }
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const [, matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) {
      if (matchedPrefix.includes(client.user.id))
        return message.channel.send({embeds: [new EmbedBuilder()
          .setDescription(`<@${message.author.id}>To see all Commands type: \`${config.prefix}help\``).setColor("Random")]});
      return;
    }
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) {
      if(command.ownerOnly) {
        if(!config.bot.ownerId.includes(message.author.id)) return message.reply({content: "you cant use this command", allowedMentions: {repliedUser: true}})
      }
      if (!message.member.permissions.has(command.memberpermissions || [])) return message.reply({content: `** You don't Have \`${command.memberpermissions}\` To Run Command.. **`})
      if (!message.guild.members.me.permissions.has(command.botPermisions || [])) return message.reply({content: `** I don't Have \`${command.memberpermissions}\` To Run Command.. **`})
      command.run(client, message, args, prefix, Discord);
    }
  } catch (e) {
    console.log(String(e.stack).red)
    return message.channel.send({embeds: [new EmbedBuilder()
      .setColor("Random")
      .setTitle(`Error | An error occurred!`)
      .setDescription(`\`\`\`${String(JSON.stringify(e.message)).substr(0, 2000)}\`\`\``)]});
  }
})
