const { prefix } = require('../../../config/config.json');
const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'cmd',
  use: 'cmd <command>',
  args: true,
  description: 'Get information for <command>.',
  execute(msg, args, client) {
    const embed = new MessageEmbed();

    var cmd =
      client.commands.get(args[1]) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(args[1])
      );

    embed
      .setTitle('CMDS <COMMAND>')
      .setColor(0xffffff)
      // Set author to this bot
      .setAuthor(client.user.username)
      // Set footer
      .setFooter(prefix + `cmds <command>`)
      .addField('Name', cmd.name);
      if (cmd.aliases) embed.addField('Aliases', cmd.aliases);
      if (cmd.use) embed.addField('Usage', cmd.use);
      embed.addField('Needs arguments?', cmd.args ? true : false)
      .addField('Cooldown', cmd.cooldown ? cmd.cooldown : 3 + 's')
      .addField('Description', cmd.description);

    // Send the embed to the same channel as the message
    msg.channel.send(embed);
  },
};
