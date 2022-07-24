const Discord = require("discord.js")
const { Client, CommandInteraction, ApplicationCommandType, PermissionFlagsBits,ApplicationCommandOptionType, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, SelectMenuBuilder, SelectMenuOptionBuilder} = require("discord.js");
const config = require("../../config/config.json");
module.exports = {
  name: "ping",
  description: "ping command",
  botPermissions: [],
  defaultMemberPermissions: [PermissionFlagsBits.SendMessages],
  type: ApplicationCommandType.ChatInput,
  options: [],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    try {
      interaction.followUp({content: `\`${client.ws.ping}\`ms`})
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