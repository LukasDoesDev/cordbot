module.exports = {
  name: 'leave',
  guildOnly: true,
  description: 'Leaves your voice channel',
  async execute(msg, args, client) {
    if (!msg.member.voice.channel)
      return msg.reply('You need to join a voice channel first!');
    client.musicConnections.get(msg.member.voice.channelId)?.disconnect();
    client.musicConnections.delete(msg.member.voice.channelId);
    msg.guild.me.voice.channel.leave();
  },
};
