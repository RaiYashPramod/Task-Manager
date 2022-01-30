const mysql = require('mysql2');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Anitarai@123',
    database: 'todo'
});

module.exports = db;