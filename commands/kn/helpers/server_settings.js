const sqlite = require('sqlite3').verbose();

const serverSettings = {
  getSettings: (server_id, callback) => {
    const db = new sqlite.Database('./testdb.db', sqlite.OPEN_READWRITE);

    const query = `SELECT * FROM servers WHERE server_id = ${server_id}`;

    db.get(query, (err, row) => {
      if (err) {
        console.log('err', err);
        return;
      }

      db.close();
      callback(row);
    });
  },
};

module.exports = serverSettings;
