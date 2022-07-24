const Discord = require("discord.js")
const { Client, Message, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, SelectMenuBuilder, SelectMenuOptionBuilder} = require("discord.js");
const config = require("../../config/config.json")
module.exports = {
  name: "ping",
  aliases: [],
  category: "Info",
  description: "",
  memberpermissions: [],
  botPermissions: [],
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      message.channel.send({content: `\`${client.ws.ping}\`ms`})
    } catch (error) {
      console.log(error.stack);
    }
  },
};