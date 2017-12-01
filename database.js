var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'nonenone',
  database: 'RTC'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  /*var sql = "CREATE TABLE Songs (name VARCHAR(255), genre VARCHAR(255), rank INT, playcount INT)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });*/
  //var sql2 = "CREATE TABLE Artists (name VARCHAR(255), genre VARCHAR(255), rank INT)";
});
