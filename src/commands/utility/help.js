const { prefix } = require('../../../config/config.json');
const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'help',
  description: "Don't do drugs. If you doin' it, stop it. Get some help.",
  execute(msg, args, client) {
    const embed = new MessageEmbed()
      .setTitle('HELP')
      .setColor(0xffffff)
      .setAuthor(client.user.username)
      .setFooter(prefix + `help`);
    if (!msg.guild) {
      embed.setDescription(`Hello, I am ${client.user.username}.

You can use \`${prefix}cmds\` to view the commands.`);
      msg.channel.send(embed);
      return;
    }
    embed
      .setDescription(
        `Hello, I am ${client.user.username}.

This server has currently ${msg.guild.memberCount} members.

You can use \`${prefix}cmds\` to view the commands.`
      )
      .addField(`Total Members`, `${msg.guild.memberCount}`)
      .addField(`Total Roles`, `${msg.guild.roles.cache.size}`)
      .addField(`Total Channels`, `${msg.guild.channels.cache.size}`)
      .addField(
        `Users Boosting This Server`,
        `${msg.guild.premiumSubscriptionCount}`
      )
      .addField(`Boost Level`, `${msg.guild.premiumTier}`)
      .addField(`Created At (GMT)`, `${msg.guild.createdAt.toGMTString()}`);
    if (msg.guild.owner)
      embed.addField(
        `Owner`,
        `${msg.guild.owner.user.username}#${msg.guild.owner.user.discriminator}`
      );
    msg.channel.send(embed);
  },
};
