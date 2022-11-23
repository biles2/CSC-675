const mysql = require('mysql2');
const {
  host, database, password, port, user,
} = require('../../config.json');

const con = mysql.createConnection({
  host: host || 'localhost',
  database: database || 'db',
  port: port || '3306',
  password: password || 'password',
  user: user || 'root',
});

module.exports = { con };
