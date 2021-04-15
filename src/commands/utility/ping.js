const { prefix } = require('../../../config/config.json');
const utils = require('../../utils');
const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'ping',
  description: 'Pong!',
  async execute(msg, args, client) {
    const pings = [];
    pings.push(client.ws.ping);
    var pingMsg;
    var maxData = 5;
    for (let i = 1; i < maxData + 1; i++) {
      pings.push(client.ws.ping);
      var justASecond = `Collecting data, just a second... (${i}/5)`;
      if (i === 1) {
        pingMsg = await msg.channel.send(justASecond + '⏱️');
      } else if (i === maxData) {
        msg = justASecond;
        pingMsg = await pingMsg.edit(
          justASecond +
            '✅\n\n' +
            'Average WebSocket Ping: ' +
            Math.floor(utils.average(pings)) +
            'ms'
        );
      } else {
        pingMsg = await pingMsg.edit(justASecond + '⏱️');
      }
    }
  },
};
