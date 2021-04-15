const { prefix } = require('../../../config/config.json');
const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'cmds',
  description: 'Lists all commands',
  execute(msg, args, client) {
    const embed = new MessageEmbed();

    embed
      .setTitle('CMDS')
      .setColor(0xffffff)
      .setDescription(
        `Use \`${prefix}cmd <command>\` to display more information on a specific command.\nSchema: \`<Optional>\` \`[Required]\`\nCurrent commands available:`
      )
      // Set author to this bot
      .setAuthor(client.user.username)
      // Set footer
      .setFooter(prefix + `cmds`);

    // Add field(s) dynamically
    for (const cmd of client.commands.entries()) {
      let cmdObj = cmd[1];
      embed.addField(prefix + (cmdObj.use || cmdObj.name), cmdObj.description);
    }

    // Send the embed to the same channel as the message
    msg.channel.send(embed);
  },
};
