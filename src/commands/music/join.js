module.exports = {
  name: 'join',
  guildOnly: true,
  description: 'Join your voice channel',
  async execute(msg, args, client) {
    // Only try to join the sender's voice channel if they are in one themselves
    if (!msg.member.voice.channel) return msg.reply('You need to join a voice channel first!');
    const connection = await msg.member.voice.channel.join();
    client.musicConnections.set(msg.member.voice.channel.id, {
      connection: connection,
    });
  },
};
