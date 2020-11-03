const setPlayerTeam = require('../helpers/set_player_team');

const execute = (client, message, args) => {
  setPlayerTeam(message, args, 'team');
};

const command = {
  name: 'team',
  description: 'Add player to team',
  execute,
};

module.exports = command;
