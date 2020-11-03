const roles = require('../helpers/roles');

const execute = (client, message, args) => {
  //Check game is on and their turn ofc

  const captains = roles.captainRoles;
  let team;

  for (let i = 0; i < captains.length; i++) {
    if (message.member.roles.cache.has(captains[i])) {
      team = i;
    }
  }

  if (typeof team === 'undefined') {
    message.channel.send("You don't seem to be a captain");
    return;
  }

  const clue = args.shift();

  if (!clue) {
    message.channel.send('No clue provided');
    return;
  }

  room = message.guild.channels.cache.find(
    (channel) => channel.name === 'kodenames'
  );

  room.send(`The clue for Team ${team} is ${clue}`);
};

const command = {
  name: 'clue',
  description:
    'Set the clue for your team (only useable by captains on their turn)',
  execute,
};

module.exports = command;
