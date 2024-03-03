const mysql = require('mysql2');
const connection = mysql.createPool({
  host: 'localhost',
  user: 'test_user',
  password: 'jose',
  database: 'test_db'
});
module.exports = connection;