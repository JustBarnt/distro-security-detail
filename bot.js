//Requried Dependencies
const { Client, Intents } = require(`discord.js`);
const { config } = require(`./config.json`);

//List of DISCORD INTENTS
const { INTENTS } = [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGES_REACTIONS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_SCHEDULED_EVENTS];

//New Discord Client
const client = new Client({ intents: INTENTS });

//Once time only event listener.  
client.once(`ready`, () =>
{
	console.log(`Client Initialized...`);
	console.log(client);

	client.channels.fetch(config.baseChannel)
		.then(channel =>
		{
			channel.send(`what's up fuckers? <:Pepepunch:783434609539022881>`);
		});
});

client.on(`interactionCreate`, async interaction => 
{
	if(!interaction.isCommand()) return;

	const { commandName  } = interaction;

	if(commandName === `ping`)
		await interaction.reply(`Pong!`);
	else if(commandName === `beep`)
		await interaction.reply(`Boop!`);
});