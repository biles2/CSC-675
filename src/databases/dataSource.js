require('dotenv').config();
const mysql = require('mysql2');

const con = mysql.createConnection({
  host: process.env.HOST || '',
  database: process.env.DATABASE || '',
  port: process.env.PORT || '',
  password: process.env.PASSWORD || '',
  user: process.env.USER || 'admin',
});

module.exports = { con };
