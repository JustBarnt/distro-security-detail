//Requried Dependencies
const { Client, Collection, Intents } = require('discord.js');
const config = require('./config.json');
const fs = require('node:fs');

//List of DISCORD INTENTS
const INTENTS  = 
[
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MEMBERS,
	Intents.FLAGS.GUILD_BANS,
	Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
	Intents.FLAGS.GUILD_INTEGRATIONS,
	Intents.FLAGS.GUILD_WEBHOOKS,
	Intents.FLAGS.GUILD_INVITES,
	Intents.FLAGS.GUILD_VOICE_STATES,
	Intents.FLAGS.GUILD_PRESENCES,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	Intents.FLAGS.GUILD_MESSAGE_TYPING,
	Intents.FLAGS.DIRECT_MESSAGES,
	Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
	Intents.FLAGS.DIRECT_MESSAGE_TYPING,
	Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
];

//New Discord Client
const client = new Client({ intents: INTENTS });
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles)
{
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

//Once time only event listener.  
client.once('ready', () =>
{
	console.log('Client Initialized...');

	// client.channels.fetch(config.baseChannel)
	// 	.then(channel =>
	// 	{
	// 		channel.send('what\'s up fuckers? <:Pepepunch:783434609539022881>');
	// 	});
});

client.on('interactionCreate', async interaction => 
{
	if(!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if(!command) return;

	try 
	{
		await command.execute(interaction);
	} 
	catch ({ error }) 
	{
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command.', ephermeral: true });
	}
});

client.login(config.token);