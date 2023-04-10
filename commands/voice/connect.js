const { SlashCommandBuilder } = require('discord.js');
const { getInteractionVC, connectVC } = require('../../controllers/voice');

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
      await connectVC(voiceChannel);

      await interaction.editReply(
        `Conectado al canal de voz ${voiceChannel.channelId}`
      );
    } else {
      await interaction.reply(
        'Debes estar conectado a un canal de voz para ejecutar este comando.'
      );
    }
  }
};
