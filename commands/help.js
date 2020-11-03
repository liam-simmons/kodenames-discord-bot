const execute = (client, message, args) => {
  let reply = '';

  client.commands.forEach(function (command) {
    reply += '**!' + command.name + '**:\t' + command.description + '\n';
  });

  message.channel.send(reply);
};

const command = {
  name: 'help',
  description: 'Get some help',
  execute,
};

module.exports = command;
