const roles = require('./roles');

const setPlayerTeam = (message, args, type) => {
  // TODO: change this
  const teams = ['Équipe Tigre', 'Équipe Poulet'];

  let rolesIds = [];

  if (type === 'captain') {
    rolesIds = roles.captainIds;
  } else if (type === 'team') {
    rolesIds = roles.teamIds;
  }

  const team = args.shift();
  const teamName = teams[team];
  const roleId = rolesIds[team];

  if (typeof roleId === 'undefined') {
    message.channel.send("That team doesn't exist");
    return;
  }

  const user = args.shift();
  let userID;

  if (user) {
    userID = user.includes('<@!')
      ? user.replace('<@!', '').replace('>', '')
      : user.includes('<@')
      ? user.replace('<@', '').replace('<', '')
      : '';
  } else {
    userID = message.author.id;
  }

  message.guild.members
    .fetch(userID)
    .then((member) => {
      message.channel.send(
        `Adding user ${member.user.username} to team ${teamName}${
          type === 'captain' ? ' as team captain' : ''
        }`
      );

      // TODO: Remove other roles
      member.roles.add(roleId);
    })
    .catch(() => {
      message.channel.send('Could not find that user');
      return;
    });
};

module.exports = setPlayerTeam;
