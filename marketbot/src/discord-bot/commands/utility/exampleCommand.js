const { SlashCommandBuilder } = require('discord.js');
// import { SlashCommandBuilder} from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('example')    // sets the name of the command
		.setDescription('description!'),  // description of the command
	async execute(interaction) {
        // interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
        // guild = discord server
		await interaction.reply('test!');
	},
};