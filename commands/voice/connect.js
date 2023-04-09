const { SlashCommandBuilder } = require('discord.js');
const { getInteractionVC, connectVC } = require('../../controllers/voice');

const { join } = require('node:path');
const {
  createAudioPlayer,
  NoSubscriberBehavior,
  createAudioResource
} = require('@discordjs/voice');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('connect')
    .setDescription(
      'Conectar el bot al canal de voz donde esté el usuario que ejecuta el comando.'
    ),
  execute: async (interaction) => {
    const voiceChannel = getInteractionVC(interaction);
    if (voiceChannel.channelId) {
      await interaction.reply(
        `Conectando al canal de voz ${voiceChannel.channelId}`
      );

      try {
        const connection = await connectVC(voiceChannel);

        await interaction.editReply(
          `Conectado al canal de voz ${voiceChannel.channelId}`
        );

        const player = createAudioPlayer({
          behaviors: {
            noSubscriber: NoSubscriberBehavior.Pause
          }
        });

        const resource = createAudioResource(
          join(__dirname, 'Last Breath.mp3')
        );

        player.play(resource);
        connection.subscribe(player);
      } catch (error) {
        console.error(error);
        await interaction.editReply(
          'No se pudo conectar al canal de voz. Por favor, inténtalo de nuevo.'
        );
      }
    } else {
      await interaction.reply(
        'Debes estar conectado a un canal de voz para ejecutar este comando.'
      );
    }
  }
};
