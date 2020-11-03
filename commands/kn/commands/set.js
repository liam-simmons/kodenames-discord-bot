const sqlite = require('sqlite3').verbose();

const serverSettings = require('../helpers/server_settings');

const execute = (client, message, args) => {
  // Check if has ability to do it
  // Add validation for values input

  const type = args.shift();

  if (!type) {
    message.channel.send('No type provided');
    return;
  }

  const setting = args.shift();

  if (!setting) {
    message.channel.send('No setting provided');
    return;
  }

  const db = new sqlite.Database('./testdb.db', sqlite.OPEN_READWRITE);

  const server = message.guild.id;

  const query = `SELECT ${type} FROM servers WHERE server_id = ?`;

  db.get(query, [server], (err, row) => {
    if (err) {
      console.log('err', err);
      message.channel.send(`No such setting ${type}`);
      return;
    }

    let data;

    if (row === undefined) {
      data = db.prepare(`INSERT INTO servers(server_id, ${type}) VALUES(?,?)`);
      data.run(server, setting);
    } else {
      data = db.prepare(
        `UPDATE servers SET ${type}='${setting}' WHERE server_id='${server}'`
      );
      data.run();
    }
    message.channel.send(`Set ${type} to ${setting}`);
    data.finalize();
    db.close();
    return;
  });
};

const command = {
  name: 'set',
  description: 'Set the roles and settings for Kodenames in this server',
  execute,
};

module.exports = command;
