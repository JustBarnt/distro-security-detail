const { REST } = require(`@discordjs/rest`);
const { Routes } = require(`discord-api-types/v10`);
const { token, clientId, guildId } = require(`./config.json`);

const commands = [];

const rest = new REST({ vesrion: `10` }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log(`Successfully registered application commands.`))
	.catch(console.error);