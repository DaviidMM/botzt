const { Client, GatewayIntentBits, Collection } = require('discord.js');
const path = require('node:path');
const { getCommandFiles } = require('../../utils');
// Import DISCORD_TOKEN from .env file
require('dotenv').config();
const { DISCORD_TOKEN } = process.env;

const createDiscordClient = () => {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
  });
  loadClientCommands(client, path.join(__dirname, '../../commands'));

  // Log in to Discord with your client's token
  client.login(DISCORD_TOKEN);
  return client;
};

const loadClientCommands = (client, commandsPath) => {
  client.commands = new Collection();
  const commandFiles = getCommandFiles(commandsPath);

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
};

module.exports = { createDiscordClient, loadClientCommands };
