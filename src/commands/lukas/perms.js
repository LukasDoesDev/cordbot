const config = require('../../../config/config.json');
const Discord = require('discord.js');

module.exports = {
  name: 'perms',
  description: 'Shows the bot permissions',
  guildOnly: true,
  async execute(msg, args, client) {
    if (msg.author.id !== config.ownerID) return;
    var availablePerms = msg.guild.me.permissions.toArray();
    // var boolObject = msg.guild.me.permissions.serialize();

    const embed = new Discord.MessageEmbed();

    var description = 'I have the following permissions:';
    for (const perm of availablePerms) {
      description += '\n' + perm;
    }

    embed
      .setColor(0xffffff)
      // Set author to this bot
      .setAuthor(client.user.username)
      // Set footer
      .setFooter(config.prefix + `perms`)
      .setDescription(description);

    msg.channel.send(embed);
  },
};
