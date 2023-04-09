const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('basic')
    .setDescription('Replies with Pong!'),
  async execute(interaction) {
    console.log('Replying with Pong!');
    await interaction.reply('Pong!');
  }
};
