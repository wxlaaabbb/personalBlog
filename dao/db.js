const mysql = require("mysql2/promise");

const  pool = mysql.createPool({

  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'my_blog',
  connectionLimit : 10,
  multipleStatements:false,//multipleStatements
});

module.exports = pool;