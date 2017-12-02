const mysql = require('mysql');
const _ = require('lodash');

const con = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'nonenone',
});

con.connect(function(err) {
   if (err) throw err;
   console.log("Connected to server");

   const createDB = "CREATE DATABASE IF NOT EXISTS RTC";
   con.query(createDB, function (err, result) {
      if (err) throw err;
      console.log("Database created");
   });

   const conDB = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'nonenone',
      database: 'RTC'
   });

  conDB.connect(function(err) {
     if (err) throw err;
     console.log("Connected to Database: RTC");

     const createTableSong = "CREATE TABLE IF NOT EXISTS Song (rank INT PRIMARY KEY, song_name VARCHAR(255), url VARCHAR(255))";
     conDB.query(createTableSong, function (err, result) {
        if (err) throw err;
        console.log("Song table created");
     });

     const createTableArtist = "CREATE TABLE IF NOT EXISTS Artist (artist_name VARCHAR(255) PRIMARY KEY)";
     conDB.query(createTableArtist, function (err, result) {
       if (err) throw err;
       console.log("Artist table created");
     });

     const createTableStreamCount = "CREATE TABLE IF NOT EXISTS Stream_count (rank INT, stream_count INT, FOREIGN KEY(rank) REFERENCES Song(rank) ON UPDATE CASCADE)";
     conDB.query(createTableStreamCount, function (err, result) {
       if (err) throw err;
       console.log("Stream_count table created");
     });

     const createTableSongsArtist = "CREATE TABLE IF NOT EXISTS Songs_artist (rank INT, artist_name VARCHAR(255), FOREIGN KEY(rank) REFERENCES Song(rank) ON UPDATE CASCADE)";
     conDB.query(createTableSongsArtist, function (err, result) {
       if (err) throw err;
       console.log("Songs_artist table created");
     });
   });
});
