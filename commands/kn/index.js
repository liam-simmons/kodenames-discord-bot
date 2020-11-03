const fs = require('fs');

const commands = [];

const commandFiles = fs
  .readdirSync('./commands/kn/commands/')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands[command.name] = command;
}

const execute = (client, message, args) => {
  const commandText = args.shift();

  const command = commands[commandText];

  if (command) {
    command.execute(client, message, args);
  } else {
    message.channel.send('Pardon, on joue à kodenames ici');
  }
};

module.exports = execute;
