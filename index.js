const Discord = require('discord.js');
const fs = require('fs');
const sqlite = require('sqlite3').verbose();
require('dotenv').config();

const client = new Discord.Client();

const prefix = '!';

client.once('ready', () => {
  console.log('Tigre Têtu en ligne !');

  new sqlite.Database(
    './testdb.db',
    sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE
  );
});

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync('./commands/')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandText = args.shift();

  const command = client.commands.get(commandText);

  if (command) {
    command.execute(client, message, args);
  } else {
    message.channel.send('Pardon, je comprends pas');
  }
});

client.login(process.env.DISCORD_KEY);
