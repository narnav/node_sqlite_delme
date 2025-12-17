import sqlite3 from "sqlite3";
import promptSync from "prompt-sync";
const prompt = promptSync();

export const Selctions = Object.freeze({
    ADD: 1,
    DISPLAY: 2,
    EXIT: 3,
    DISPLAY_SINGLE: 4,
});

export const menu = () => {
    let selections_ar = Object.keys(Selctions)
    console.log("Welcome to my app...");
    for (let index = 0; index < selections_ar.length; index++) {
        console.log(`${index + 1} - ${selections_ar[index]}`)
    }

    const user_selection = prompt("your selection?");
    return Number(user_selection);
}

let db
const init_db = async () => {
    db = new sqlite3.Database("database.db", (err) => {
        if (err) {
            return console.error("DB Connection Error:", err.message);
        }
        console.log("Connected to SQLite database.");
    });
}
init_db()

const init_table = () => {
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

const add_new_contact = async () => await db.run(`INSERT INTO users(name, email) VALUES(?, ?)`, [prompt("your name?"), prompt("your email?")]);

const get_all_users = async () => {
    const all_users = await new Promise((resolve, reject) => {
        db.all("SELECT * FROM users", (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
    console.log(all_users);
};

// const get_all_users = async () => {
//   const all_users = await db.all(`SELECT * FROM users`);
//   console.log(all_users);
// };


const close_db = async () => await db.close();

const main = async () => {
    init_table()
    // CRUD
    while (true) {
        const user_selection = menu();
        if (user_selection == Selctions.EXIT) { return }
        if (user_selection == Selctions.ADD) add_new_contact()
        if (user_selection == Selctions.DISPLAY) await get_all_users()
    }
}
main()