const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('user')
	.setDescription('Provides information about the user.'),
	async execute(interaction) {
		await interaction.reply(
			`I can see you, ${interaction.user.username}. You joined on ${interaction.member.joinedAt}. So ancient lol`,
		);
	},
};