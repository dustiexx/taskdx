const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('message')
        .setDescription('Send a test message with components'), // <– required

    async execute(interaction) {
        return interaction.reply({
            content: `Slow down, bro.`,
            flags: MessageFlags.Ephemeral,
        });
    }
    
};