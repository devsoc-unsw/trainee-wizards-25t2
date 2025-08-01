const { SlashCommandBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('add-listing')    // sets the name of the command
		.setDescription('add product listing from backend')  // description of the command
		.addStringOption(option =>
			option.setName('title')
				.setDescription('Title of the listing')
				.setRequired(true))	
		.addStringOption(option =>
			option.setName('description')
				.setDescription('Description of the listing')
				.setRequired(true))	
		.addIntegerOption(option =>
			option.setName('minprice')
				.setDescription('Minimum price seller is willing to accept')
				.setRequired(true))	
		.addIntegerOption(option =>
			option.setName('maxprice')
				.setDescription('Maximum price seller is willing to accept')
				.setRequired(true))	
		.addStringOption(option =>
			option.setName('condition')
				.setDescription('Condition of the product you are sellling')
				.setRequired(true)),	
	async execute(interaction) {
        // Get user discord id and name
		discordId = interaction.user.username;
		discordName = interaction.user.globalName;

		// Check if user is registered
		let response = await fetch(`http://localhost:3000/api/user/${discordId}`, {
      	method: "GET"});
		if (response.status === 404) {
			// User doesn't exist, add user
			response = await fetch(`http://localhost:3000/api/user/`, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name: discordName, discordId: discordId }),
			});
		} else if (response.status !== 200) {
			await interaction.reply(response.statusText)
			return;
		}

		userId = await response.json().then(data => data.id);

		// Add listing
		body = {
		title: interaction.options.getString('title'),
		description: interaction.options.getString('description'),
		minPrice: interaction.options.getInteger('minprice'),
		maxPrice: interaction.options.getInteger('maxprice'),
		condition: interaction.options.getString('condition'),
		userId: userId,
		status: ""
		}

		response = await fetch("http://localhost:3000/api/listings/", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		if (response.status === 201) {
			const listingId = await response.json().then(data => data.id);
			await interaction.reply(`Listing ${listingId} added successfully!`);
		} else {
			const errorData = await response.json();
			await interaction.reply(`${errorData.error}: ${errorData.details}`);
		}
	},
};