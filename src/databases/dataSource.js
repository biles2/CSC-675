require('dotenv').config();
const mysql = require('mysql2');

const con = mysql.createConnection({
  host: 'db.c4jmyvclunpb.us-east-1.rds.amazonaws.com',
  database: 'ArtGalleryDB',
  port: '3306',
  password: 'J3c6BjmASUbgzRSixFC3',
  user: 'admin',
});

module.exports = { con };
