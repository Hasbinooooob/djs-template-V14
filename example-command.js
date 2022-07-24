const Discord = require("discord.js")
const { Client, Message, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, SelectMenuBuilder, SelectMenuOptionBuilder} = require("discord.js");
const config = require("../../config/config.json")
module.exports = {
  name: "",
  aliases: [],
  category: "",
  description: "",
  memberpermissions: [],
  botPermissions: [],
  ownerOnly: false,
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      //code
    } catch (error) {
      console.log(error.stack);
    }
  },
};
//slash
const Discord = require("discord.js")
const { Client, CommandInteraction, ApplicationCommandType, PermissionFlagsBits, ApplicationCommandOptionType, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, SelectMenuBuilder, SelectMenuOptionBuilder} = require("discord.js");
const config = require("../../config/config.json");
module.exports = {
  name: "",
  description: "",
  botPermissions: [],
  defaultMemberPermissions: [],
  dmPermission: false,
  type: ApplicationCommandType.ChatInput,
  options: [],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    try {
      //code
    } catch (error) {
      console.log(error.stack);
      interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setColor("Random")
            .setTitle(`ERROR | An error occurred!`)
            .setDescription(`\`${error.message}\``),
        ],
        ephemeral: true
      });
    }
  },
}