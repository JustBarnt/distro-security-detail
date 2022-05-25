const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientId, guildId } = require('./config.json');

import fs from 'node:fs';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { token, clientId, guildId } from './config.json' assert { type: 'json' }

//Creating commands
const commands = [];
//Getting all files in the commands dir with .js ending
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//Looping through each file getting the module.export data
//and then pushing it to commands
for(const file of commandFiles)
{
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ vesrion: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);