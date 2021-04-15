const ytdl = require('ytdl-core-discord');
module.exports = {
  name: 'playyt',
  use: 'playyt <youtube video>',
  args: true,
  guildOnly: true,
  description: 'Play the specified youtube video in your voice channel',
  async execute(msg, args, client) {
    var connection;

    if (!msg.member.voice.channel)
      return msg.reply('You need to join a voice channel first!');

    var notInSameChannel =
      msg.member.voice.channelId !== msg.guild.me.voice.channelId;
    if (!msg.guild.me.voice.channelId) notInSameChannel = true;

    if (
      !client.musicConnections.has(msg.member.voice.channelId) &&
      notInSameChannel
    ) {
      connection = await msg.member.voice.channel.join();
      client.musicConnections.set(msg.member.voice.channelId, connection);
      await new Promise((r) => setTimeout(r, 500));
    }
    if (
      !connection &&
      client.musicConnections.has(msg.member.voice.channelId)
    ) {
      connection = client.musicConnections.get(msg.member.voice.channelId);
    }

    console.log('Getting info for ' + args[1]);
    statusMsg = await msg.channel.send('Getting info for ' + args[1]);
    var yt = await ytdl(args[1], { quality: 'highestaudio' });
    console.log('Playing ' + args[1]);
    statusMsg.edit('Playing ' + args[1]);

    var dispatcher = connection.play(yt, { type: 'opus' });
    dispatcher.on('finish', () => {
      msg.reply('Finished playing!');
      console.log('Finished playing!');
      client.musicConnections.get(msg.member.voice.channelId)?.disconnect();
      client.musicConnections.delete(msg.member.voice.channelId);
      msg.guild.me.voice.channel.leave();
    });
  },
};
