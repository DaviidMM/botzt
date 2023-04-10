const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');

const getInteractionVC = (interaction) => interaction.member.voice;

const getVCConnection = (interaction) => {
  return getVoiceConnection(interaction.guildId);
};

const connectVC = async (voiceChannel) => {
  console.log(`Connecting to channel ${voiceChannel.channelId}`);
  const connection = joinVoiceChannel({
    channelId: voiceChannel.channelId,
    guildId: voiceChannel.guild.id,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator
  });

  return connection;
};

const disconnectVC = async (interaction) => {
  const conn = getVoiceConnection(interaction.guildId);
  if (conn) conn.destroy();
  return conn;
};

module.exports = { connectVC, disconnectVC, getInteractionVC, getVCConnection };
