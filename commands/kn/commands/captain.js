const setPlayerTeam = require('../helpers/set_player_team');

const execute = (client, message, args) => {
  setPlayerTeam(message, args, 'captain');
};

const command = {
  name: 'captain',
  description: 'Add player to team as a captain',
  execute,
};

module.exports = command;
