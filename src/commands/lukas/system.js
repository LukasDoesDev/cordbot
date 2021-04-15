const config = require('../../../config/config.json');
const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'system',
  description: 'Returns bot information!',
  execute(msg, args, client) {
    if (msg.author.id !== config.ownerID) return;
    const embed = new MessageEmbed()
      .setColor(0xffffff)
      .setTitle('SYSTEM')
      .setAuthor(client.user.username)
      .addField('Platform', process.platform)
      .addField('Node.js version: ', process.version)
      .setTimestamp()
      .setFooter(`${config.prefix}system`);
    msg.channel.send(embed);
  },
};