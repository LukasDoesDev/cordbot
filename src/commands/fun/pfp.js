module.exports = {
  name: 'pfp',
  description: 'Shows your avatar or the avatars of the users you mentioned.',
  execute(msg, args) {
    if (!msg.mentions.users.size) {
      return msg.channel.send(msg.author.displayAvatarURL({ dynamic: true }));
    }

    var urls = msg.mentions.users.map((user) =>
      user.displayAvatarURL({ dynamic: true })
    );

    msg.channel.send(urls.join('\n'));
  },
};
