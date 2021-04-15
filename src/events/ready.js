const utils = require('../utils');

module.exports = {
  name: 'ready',
  async execute(client) {
    console.log(`Logged in as ${client.user.tag}!`);
    
    let inviteLink = await client.generateInvite({
      permissions: ['ADMINISTRATOR'],
    });
    console.log(`Add the bot to your server using ${inviteLink}`);
    client.user.setPresence({
      activity: {
        name: 'you!', //The message shown
        type: 'WATCHING', //PLAYING; WATCHING; LISTENING; STREAMING;
      },
      status: 'online', //You can show online, idle....
    });
    utils.setPresence(client);
  }
}