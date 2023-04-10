const { SlashCommandBuilder } = require('discord.js');
const { getVCConnection } = require('../../controllers/voice');

const { join } = require('node:path');
const {
  createAudioPlayer,
  NoSubscriberBehavior,
  createAudioResource
} = require('@discordjs/voice');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Reproducir música.'),
  execute: async (interaction) => {
    const connection = getVCConnection(interaction);
    const player = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause
      }
    });

    const resource = createAudioResource(join(__dirname, 'Last Breath.mp3'));
    player.play(resource);
    connection.subscribe(player);

    await interaction.reply('Reproduciendo música... 🎵');
  }
};
