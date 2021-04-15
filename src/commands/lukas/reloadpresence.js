const config = require('../../../config/config.json');
const utils = require('../../utils');
const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'reloadpresence',
  description: 'Sets the bot presence from the config file!',
  execute(msg, args, client) {
    if (msg.author.id !== config.ownerID) return;
    utils.setPresence(client);
    const embed = new MessageEmbed()
      .setColor(0x00ff00)
      .setTitle('Successfully reloaded the presence')
      .setAuthor(client.user.username)
      .setTimestamp()
      .setFooter(`${config.prefix}reloadpresence`);
    msg.channel.send(embed);
  },
};