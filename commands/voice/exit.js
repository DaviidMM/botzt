const { SlashCommandBuilder } = require('discord.js');
const { disconnectVC } = require('../../controllers/voice');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('exit')
    .setDescription('Desconectar el bot al canal de voz donde esté.'),
  execute: async (interaction) => {
    await interaction.reply('Desconectando del canal de voz...');
    disconnectVC(interaction).then(() => {
      interaction.editReply('Desconectado del canal de voz.');
    });
  }
};
