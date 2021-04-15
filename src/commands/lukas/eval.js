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
  name: 'eval',
  use: 'eval [code]',
  args: true,
  description: 'Evaluates the code out put in.',
  async execute(msg, args, client) {
    if (msg.author.id !== config.ownerID) return;
    async function sendInChannelID(channelID, message) {
      var channel = await msg.guild.channels.resolve(channelID);
      channel.send(message);
    }

    async function getByMention(mentionStr) {
      return await client.users.resolve(
        mentionStr.trim().replace('<@!', '').replace('>', '')
      );
    }

    var rmLength = config.prefix.length + this.name.length + ' '.length;

    var evalStr = msg.content.slice(rmLength);

    console.log(rmLength, 'evalStr', evalStr);

    var t = process.hrtime();
    try {
      if (true) {
        asyncEvalStr =
          'var EVAL_ASYNC = async function() {\n  return ' + evalStr + '\n}';
        eval(asyncEvalStr);
        var output = await EVAL_ASYNC();
      } else {
        var output = eval(evalStr);
      }
      console.log('"' + evalStr + '"', evalStr.length);
    } catch (e) {
      var embed = new Discord.MessageEmbed()
        .setColor(0xffffff)
        .setTitle('EVALUATION')
        .setAuthor(client.user.username)
        .setDescription(`**❌ Error**\`\`\`${e}\`\`\``);
      msg.channel.send(embed);
      return;
    }

    t = process.hrtime(t);
    var ms = t[0] * 1000000 + t[1] / 1000 + 0;

    var embed = new Discord.MessageEmbed()
      .setColor(0xffffff)
      .setTitle('EVALUATION')
      .setAuthor(client.user.username)
      .setDescription(
        `Evaluated in ${ms}ms
**📥 Input**
\`\`\`js
${safeForDiscord(evalStr)}
\`\`\`
**📤 Output**
\`\`\`
${safeForDiscord(output)}
\`\`\`
**📤 JSON.stringify Output**
\`\`\`
${safeForDiscord(
  (() => {
    try {
      return JSON.stringify(output);
    } catch (e) {
      console.error(e);
      return 'An error occured: ' + e.toString();
    }
  })()
)}
\`\`\`
**🧪 Type**
\`\`\`
${typeof output}
\`\`\`
`
      );
    msg.channel.send(embed);
  },
};
