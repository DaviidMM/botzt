const { getCommandFiles } = require('../../utils');
const path = require('node:path');
const { REST, Routes } = require('discord.js');

// Import DISCORD_TOKEN from .env file
require('dotenv').config();
const { DISCORD_TOKEN, DISCORD_CLIENT_ID, DISCORD_GUILD_ID } = process.env;

const deployCommands = async () => {
  try {
    const commands = [];
    // Get the path to the commands directory
    const commandsPath = path.join(__dirname, '../../commands');
    // Get list of all files in the commands directory recursively
    const commandFiles = getCommandFiles(commandsPath);

    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      commands.push(command.data.toJSON());
    }

    // Construct and prepare an instance of the REST module
    const rest = new REST().setToken(DISCORD_TOKEN);
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(DISCORD_CLIENT_ID, DISCORD_GUILD_ID),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
};

module.exports = { deployCommands };
