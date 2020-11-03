const execute = (client, message, args) => {
  message.channel.send(
    `Salut ${message.author.username} ! Je suis le Tigre Têtu !`
  );
};

const command = {
  name: 'hello',
  description: 'Say hi!',
  execute,
};

module.exports = command;
