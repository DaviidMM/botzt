// Link para invitar al bot
// https://discord.com/oauth2/authorize?client_id=1094688296514371646&scope=bot&permissions=2184244224

// Import the discord.js module
const { Events } = require('discord.js');
// Import essentials
const { interactionHandler } = require('./services/interactions/handler');
const { createDiscordClient } = require('./services/discord');

// Create an instance of a Discord client
const client = createDiscordClient();

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, interactionHandler);

module.exports = { client };
