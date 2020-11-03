const execute = (client, message, args) => {
  const commandText = args.shift();

  let room;
  let say;

  if (commandText === 'in') {
    const roomName = args.shift();

    room = message.guild.channels.cache.find(
      (channel) => channel.name === roomName
    );

    say = message.content.replace(`!say in ${roomName}`, '');
  } else {
    say = message.content.replace('!say', '');
    room = message.channel;
    message.delete();
  }

  room.send(say);
};

const command = {
  name: 'say',
  description: 'Repeat after me',
  execute,
};

module.exports = command;
