const Discord = require('discord.js');
const config = require('../../../config/config.json');

function safeForDiscord(input) {
  if (typeof input == 'undefined') return 'undefined';
  var str = input.toString();
  if (str === '') str = '[empty string]';
  return str.replace('```', '\\`\\`\\`');
}

const returner = (data) => data;

module.exports = {
  name: 'send',
  use: 'send [channel] [message...]',
  args: true,
  description: 'Evaluates the code out put in.',
  async execute(msg, args, client) {
    var [ channel ] = args;
    
    var rmLength = config.prefix.length + this.name.length + ' '.length;

    var sendContent = msg.content.slice(rmLength);
  },
};
