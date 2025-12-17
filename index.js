import sqlite3 from "sqlite3";

const db = new sqlite3.Database("database.db", (err) => {
  if (err) {
    return console.error("DB Connection Error:", err.message);
  }
  console.log("Connected to SQLite database.");
});

// Example: Create table
db.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT
  )`,
  (err) => {
    if (err) console.error(err.message);
    else console.log("Table created successfully");
  }
);


