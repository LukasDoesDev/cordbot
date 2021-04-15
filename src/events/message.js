const fs = require('fs');

const config = require('../../config/config.json');
const utils = require('../utils');
const Discord = require('discord.js');

const prefix = config.prefix;

module.exports = {
  name: 'message',
  setup(client) {
    client.commands = new Discord.Collection();
    client.cooldowns = new Discord.Collection();
    client.musicConnections = new Discord.Collection();

    const commandFolders = fs.readdirSync('./src/commands');

    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith('.js'));

      for (const file of commandFiles) {
        const command = require(`../commands/${folder}/${file}`);

        // set a new item in the Collection
        // with the key as the command name and the value as the exported module
        client.commands.set(command.name, command);
        //console.log(command.name);
      }
    }
  },
  async execute(client, msg) {
    if (msg.author.bot || !msg.content.toLowerCase().startsWith(prefix)) {
      return;
    }

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const commandName = [...args].shift().toLowerCase();

    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command) {
      utils.sec5msg(
        msg.channel,
        `Unknown command.\nPlease see ${prefix}commands for the list of commands.`
      );
      return;
    }

    if (msg.guild === null && command.guildOnly) return;

    if (command.permissions) {
      const authorPerms = message.channel.permissionsFor(message.author);
      if (
        !(authorPerms && authorPerms.has(command.permissions)) ||
        msg.author.id == config.ownerID
      ) {
        return message.reply('You do not have the permissions to do this!');
      }
    }

    if (command.args && !args[1]) {
      let reply = `You didn't provide any arguments, ${msg.author}!`;

      if (command.use) {
        reply += `\nThe proper usage would be: \`${prefix}${command.use}\``;
      }

      return msg.channel.send(reply);
    }

    if (!client.cooldowns.has(command.name)) {
      client.cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = client.cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(msg.author.id)) {
      const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return msg.reply(
          `Please wait ${timeLeft.toFixed(
            1
          )} more second(s) before reusing the \`${command.name}\` command.`
        );
      }
    }

    timestamps.set(msg.author.id, now);
    setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

    try {
      await command.execute(msg, args, client);
    } catch (error) {
      console.error(error);
      msg.reply('There was an error trying to execute that command!');
    }
  },
};
