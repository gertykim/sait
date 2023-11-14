const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const db = new sqlite3.Database('./database.db', (err) => {
 if (err) {
    console.error(err.message);
 }
 console.log('Connected to the SQLite database.');
});

db.serialize(() => {
 db.run('CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)');
});

app.post('/register', (req, res) => {
 const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
 const params = [req.body.Логин, req.body.Пароль];

 db.run(sql, params, function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ id: this.lastID });
 });
});

app.get('/', (req, res) => {
 res.sendFile(__dirname + '/index.html');
});

app.listen(3000, () => {
 console.log('Server is running on port 3000');
});