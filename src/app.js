if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

const eventFiles = fs
  .readdirSync('./src/events')
  .filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);

  if (event.setup) event.setup(client);
  client.on(event.name, (...args) => {
    try {
      event.execute(client, ...args);
    } catch (error) {
      console.error('ERROR', error);
    }
  });
}

client.login(process.env.SECRET_TOKEN);
