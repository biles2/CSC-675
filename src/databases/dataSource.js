const mysql = require('mysql2');

const con = mysql.createConnection({
  host: process.env.HOST || 'localhost',
  database: process.env.DATABASE || 'db',
  port: process.env.PORT || '3306',
  password: process.env.PASSWORD || 'password',
  user: process.env.USER || 'root',
});

module.exports = { con };
