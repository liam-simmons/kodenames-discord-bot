const serverSettings = require('../helpers/server_settings');
const roles = require('../helpers/roles');
const wordsHelper = require('../helpers/words');

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const execute = (client, message, args) => {
  serverSettings.getSettings(message.guild.id, (settings) => {
    // Check settings are set in DB
    if (
      !(
        settings.team_1 &&
        settings.team_2 &&
        settings.team_1_captain &&
        settings.team_2_captain &&
        settings.team_1_emoji &&
        settings.team_2_emoji &&
        settings.neutral_emoji &&
        settings.black_emoji
      )
    ) {
      message.channel.send(`One or more server settings is not set`);
      return;
    }

    // Check user has right permissions
    const isAdmin = message.member.hasPermission('ADMINISTRATOR');
    const isKnAdmin = message.member.roles.cache.has(settings.kn_admin);
    const isKnMod = message.member.roles.cache.has(settings.kn_mod);

    if (!isAdmin && !isKnAdmin && !isKnMod) {
      message.channel.send(`You do not have the right to do that`);
      return;
    }

    roles.updateCache(message.guild, () => {
      // Check there is a user with each role required to play the game
      const toCheck = [
        settings.team_1,
        settings.team_2,
        settings.team_1_captain,
        settings.team_2_captain,
      ];

      const membersWithRole = [];

      for (let i = 0; i < toCheck.length; i++) {
        const teamMembers = roles.getUsersWithRole(message.guild, toCheck[i]);
        membersWithRole.push(teamMembers);

        if (!teamMembers || !teamMembers.array().length > 0) {
          const role = message.guild.roles.cache.get(toCheck[i]);

          if (!role) {
            message.channel.send(`No such role with ID ${toCheck[i]}`);
          } else {
            message.channel.send(
              `Unable to start as there is no user assigned to ${role.name}`
            );
          }

          return;
        }
      }

      // Create word list

      wordsHelper.defaultWords((words) => {
        console.log(words);

        noWords = 25;

        const knWords = [];

        const noType = {
          neutral: 7, // 7
          team_1: 16, // 9
          team_2: 24, // 8
          black: 25, // 1
        };

        for (let i = 0; i < noWords; i++) {
          const wordNumber = Math.floor(Math.random() * words.length);

          let type = 'neutral';

          for (const typeName in noType) {
            if (i < noType[typeName]) {
              type = typeName;
              break;
            }
          }

          knWords.push({
            word: words[wordNumber],
            type,
            picked: false,
          });

          knWords.splice(wordNumber, 1);
        }

        shuffleArray(knWords);

        // Send word list to captains
        const captains = [
          ...membersWithRole[2].array(),
          ...membersWithRole[3].array(),
        ];

        let capMessage = '';

        for (let i = 0; i < knWords.length; i++) {
          const emoji = settings[knWords[i].type + '_emoji'];

          capMessage += `${emoji} ${knWords[i].word} ${emoji}`;

          if (i !== capMessage.length - 1) {
            capMessage += ' | ';
          }
        }

        // for (let i = 0; i < captains.length; i++) {
        //   captains[i].send(capMessage);
        // }

        // Send world list in designated KN channel

        message.channel.send(capMessage);
      });

      message.channel.send('Trying to start');
      return;

      const words = [
        {
          word: 'Hello',
          type: 'team_1',
          picked: false,
        },
        {
          word: 'Goodbye',
          type: 'neutral',
          picked: false,
        },
        {
          word: 'Salut',
          type: 'team_2',
          picked: false,
        },
        {
          word: 'Je',
          type: 'team_2',
          picked: false,
        },
        {
          word: 'te',
          type: 'black',
          picked: false,
        },
        {
          word: 'aimer',
          type: 'team_2',
          picked: false,
        },
        {
          word: 'marpie',
          type: 'team_1',
          picked: false,
        },
        {
          word: 'Tu',
          type: 'neutral',
          picked: false,
        },
        {
          word: 'être',
          type: 'team_2',
          picked: false,
        },
        {
          word: 'la',
          type: 'team_1',
          picked: false,
        },
        {
          word: 'meilleure',
          type: 'team_1',
          picked: false,
        },
        {
          word: 'merci',
          type: 'neutral',
          picked: false,
        },
        {
          word: 'à',
          type: 'team_2',
          picked: false,
        },
        {
          word: 'toi',
          type: 'team_1',
          picked: false,
        },
      ];

      // Send word list to captains
      const captains = [
        ...membersWithRole[2].array(),
        ...membersWithRole[3].array(),
      ];

      let capMessage = '';

      for (let i = 0; i < words.length; i++) {
        const emoji = settings[words[i].type + '_emoji'];

        capMessage += `${emoji} ${words[i].word} ${emoji}`;

        if (i !== capMessage.length - 1) {
          capMessage += ' | ';
        }
      }

      // for (let i = 0; i < captains.length; i++) {
      //   captains[i].send(capMessage);
      // }

      // Send world list in designated KN channel

      message.channel.send(capMessage);
    });
  });
};

const command = {
  name: 'start',
  description: 'Start the game',
  execute,
};

module.exports = command;
