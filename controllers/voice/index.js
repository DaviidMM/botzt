const { joinVoiceChannel } = require('@discordjs/voice');

const getInteractionVC = (interaction) => interaction.member.voice;

const connectVC = async (voiceChannel) => {
  console.log(`Connecting to channel ${voiceChannel.channelId}`);
  const connection = joinVoiceChannel({
    channelId: voiceChannel.channelId,
    guildId: voiceChannel.guild.id,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator
  });

  return connection;
};

module.exports = { connectVC, getInteractionVC };
