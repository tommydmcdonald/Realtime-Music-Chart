const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'nonenone',
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE DATABASE IF NOT EXISTS RTC";

  const conDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'nonenone',
    database: 'RTC'
  });

  conDB.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
var sql = "CREATE TABLE IF NOT EXISTS Song (rank INT PRIMARY KEY, song_name VARCHAR(255), url VARCHAR(255))";
  conDB.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
  var sql = "CREATE TABLE IF NOT EXISTS Artist (artist_name VARCHAR(255) PRIMARY KEY)";
  conDB.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
  var sql = "CREATE TABLE IF NOT EXISTS Stream_count (rank INT, stream_count INT, FOREIGN KEY(rank) REFERENCES Song(rank) ON UPDATE CASCADE)";
  conDB.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
  var sql = "CREATE TABLE IF NOT EXISTS Songs_artist (rank INT, artist_name VARCHAR(255), FOREIGN KEY(rank) REFERENCES Song(rank) ON UPDATE CASCADE)";
  conDB.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
