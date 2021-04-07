const Database = require('../utils/DatabaseUtils');

async function initDatabase() {
  await Database.exec(`
    CREATE TABLE IF NOT EXISTS profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      avatar TEXT,
      monthly_budget INT,
      days_per_week INT,
      hours_per_day INT,
      vacation_per_year INT,
      value_hour INT
    )
  `);

  await Database.exec(`
    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      daily_hours INT,
      total_hours INT,
      created_at DATETIME
    )
  `);

  await Database.exec(`
    INSERT INTO profile (
      name,
      avatar,
      monthly_budget,
      days_per_week,
      hours_per_day,
      vacation_per_year,
      value_hour
    ) VALUES (
      "SadS4ndWiCh",
      "https://github.com/SadS4ndWiCh.png", 
      4500,
      6,
      4,
      6,
      75
    )
  `);
}

initDatabase();