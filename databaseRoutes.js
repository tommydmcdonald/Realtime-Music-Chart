const express = require('express');
const app = express.Router();
const { createDBCon } = require('./database');

const mysql = require('promise-mysql');

app.get('/rank/:sort/:rankNumber', async (req, res) => {
   const { sort, rankNumber } = req.params;
   let symbol = null;
   switch(sort) {
      case 'higher':
         symbol = '<';
         break;
      case 'higher_eq':
         symbol = '<=';
         break;
      case 'eq':
         symbol = '=';
         break;
      case 'lower':
         symbol = '>';
         break;
      case 'lower_eq':
         symbol = '>=';
         break;
   }

   const songsFromRank = `SELECT song_name, rank FROM Song WHERE rank ${symbol} ${rankNumber}`;
   const con = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'nonenone',
      database: 'RTC'
   });

   const results = await con.query(songsFromRank);
   res.send(results);
});

module.exports = app;
