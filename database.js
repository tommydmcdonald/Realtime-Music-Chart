const mysql = require('promise-mysql');
const _ = require('lodash');

module.exports = {
   initializeDB: async () => {
      const con = await mysql.createConnection({
         host: 'localhost',
         user: 'root',
         password: 'nonenone',
      });

      console.log('Connected to server');

      const createDB = 'CREATE DATABASE IF NOT EXISTS RTC';
      con.query(createDB, function (err, result) {
         if (err) throw err;
         console.log('Database created');
      });

      const conDB = await mysql.createConnection({
         host: 'localhost',
         user: 'root',
         password: 'nonenone',
         database: 'RTC'
      });
      console.log('Connected to Database: RTC');
      const createTables = [
         'CREATE TABLE IF NOT EXISTS Song (rank INT PRIMARY KEY, song_name VARCHAR(255), url VARCHAR(255))',
         'CREATE TABLE IF NOT EXISTS Artist (artist_name VARCHAR(255) PRIMARY KEY)',
         'CREATE TABLE IF NOT EXISTS Stream_count (rank INT, stream_count INT, FOREIGN KEY(rank) REFERENCES Song(rank) ON UPDATE CASCADE)',
         'CREATE TABLE IF NOT EXISTS Songs_artist (rank INT, artist_name VARCHAR(255), FOREIGN KEY(rank) REFERENCES Song(rank) ON UPDATE CASCADE)'
      ];

      const tableName = ['Song', 'Artist', 'Stream_count', 'Songs_artist'];

      for (let i = 0; i < createTables.length; i++) {
         await conDB.query(createTables[i]);
         console.log('Created table ' + tableName[i]);
      }
   },
   createDBCon: async () => {
      const conDB = await mysql.createConnection({
         host: 'localhost',
         user: 'root',
         password: 'nonenone',
         database: 'RTC'
      });
      return conDB;
   }
}
