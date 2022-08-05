const mysql = require('mysql');

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Aa2291718824',
    database: 'my_db01'
});

module.exports = db;