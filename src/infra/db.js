const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '..', 'data', 'products.sqlite');

if (!fs.existsSync(path.dirname(dbPath))) {
  fs.mkdirSync(path.dirname(dbPath));
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('❌ DB Connection Failed:', err);
  else console.log('✅ Connected to SQLite database');
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      originalPrice REAL NOT NULL CHECK(originalPrice > 0),
      finalPrice REAL NOT NULL CHECK(finalPrice >= 0)
    )
  `, (err) => {
    if (err) {
      console.error('❌ Failed to create products table:', err);
    } else {
      console.log('✅ products table ready');
    }
  });
});

module.exports = db;
