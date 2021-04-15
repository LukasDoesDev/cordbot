const fs = require('fs');
const config = require('../../../config/config.json');

module.exports = {
  name: 'reload',
  use: 'reload [command]',
  args: true,
  description: 'Reloads a command',
  execute(msg, args, client) {
    if (msg.author.id !== config.ownerID) {
      return;
    }
    const commandName = args[1].toLowerCase();
    const command =
      msg.client.commands.get(commandName) ||
      msg.client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command) {
      return msg.channel.send(
        `There is no command with name or alias \`${commandName}\`, ${msg.author}!`
      );
    }

    const commandFolders = fs.readdirSync('./src/commands');
    const folderName = commandFolders.find((folder) =>
      fs.readdirSync(`./src/commands/${folder}`).includes(`${commandName}.js`)
    );

    delete require.cache[
      require.resolve(`../${folderName}/${command.name}.js`)
    ];

    try {
      const newCommand = require(`../${folderName}/${command.name}.js`);
      msg.client.commands.set(newCommand.name, newCommand);
      msg.channel.send(`Command \`${newCommand.name}\` was reloaded!`);
    } catch (error) {
      console.error(error);
      msg.channel.send(
        `There was an error while reloading a command \`${command.name}\`:\n\`${error.msg}\``
      );
    }
  },
};
