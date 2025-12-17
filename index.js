import sqlite3 from "sqlite3";

const db = new sqlite3.Database("database.db", (err) => {
    if (err) {
        return console.error("DB Connection Error:", err.message);
    }
    console.log("Connected to SQLite database.");
});

const init_db = () => {
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
}

const add_new_contact =async ()=> await db.run(`INSERT INTO users(name, email) VALUES(?, ?)`, ["Alice", "alice@example.com"]);
const get_all_users =async ()=> await db.all(`SELECT * FROM users`);
// console.log(get_all_users());
const close_db =async ()=> await db.close();

const main=()=>{

}
main()