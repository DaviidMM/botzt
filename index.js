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

client.on('speech', (msg) => {
  // If bot didn't recognize speech, content will be empty
  if (!msg.content) return;

  const msgText = msg.content.toLowerCase();

  console.log(msgText);
  if (msgText.startsWith('hola')) {
    client.channels.cache.get('769956408509988914').send('m!play ' + msgText);
  }
});

module.exports = { client };
