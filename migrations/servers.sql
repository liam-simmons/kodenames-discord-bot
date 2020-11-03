-- SQLite
DROP TABLE servers;

CREATE TABLE IF NOT EXISTS servers(
  id INTEGER PRIMARY KEY, 
  server_id TEXT NOT NULL,
  kn_admin TEXT,
  kn_mod TEXT,
  team_1 TEXT,
  team_2 TEXT,
  team_1_captain TEXT,
  team_2_captain TEXT,
  team_1_emoji TEXT,
  team_2_emoji TEXT,
  neutral_emoji TEXT,
  black_emoji TEXT
);