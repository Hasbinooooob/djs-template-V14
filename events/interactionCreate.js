const client = require("..");
const { EmbedBuilder, ApplicationCommandOptionType} = require("discord.js")
client.on('interactionCreate', async (interaction) => {
    // Slash Command Handling
    if (interaction.isChatInputCommand) {
        await interaction.deferReply({ ephemeral: false }).catch(() => { });
        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({embeds: [new EmbedBuilder().setDescription(`\`${interaction.commandName}\` Command Not Found`).setColor("Random")]})
        const args = [];
        for (let option of interaction.options.data) {
            if (option.type === ApplicationCommandOptionType.Subcommand || 1) {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        if (cmd) {
            // checking bot perms
            if(cmd) {
                if(!interaction.guild.members.me.permissions.has(cmd.botPermissions || [])) {
                    return interaction.followUp({
                        embeds: [
                            new EmbedBuilder()
                                .setColor("Random")
                                .setDescription(`i don't Have \`${cmd.botPermissions}\` To Run Command..`)
                        ]
                    })
                }
            }
            cmd.run(client, interaction, args);
        }
    }
    // Context Menu Handling
    if (interaction.isContextMenuCommand()) {
        await interaction.deferReply({ ephemeral: true });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
})