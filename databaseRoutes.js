const express = require('express');
const app = express.Router();
const _ = require('lodash');
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

   const con = await createDBCon();
   const songsFromRank = `SELECT song_name, rank FROM Song WHERE rank ${symbol} ${rankNumber}`;

   const results = await con.query(songsFromRank);
   res.send(results);
});

// app.post('/artists', async (req, res) => {
//    const { artists } = req.body;
//    const allSongs = {};
//
//    const con = await createDBCon();
//
//    await _.forEach(artists, async (artist) => {
//       artist = mysql.escape(artist);
//       const songsFromArtist= `SELECT song_name FROM Song WHERE INNER JOIN Songs_artist ON Song.rank = Songs_artist.rank WHERE Songs_artist.artist_name = ${artist}`
//       allSongs[artist] = await con.query(songsFromArtist);
//    });
//
//    res.send(allSongs);
// });

app.get('/artist/:artist', async (req, res) => {
   const artist = mysql.escape(req.params.artist);
   console.log('artist = ', artist);
   const con = await createDBCon();
   // const songsFromArtist= `SELECT song_name FROM Song AS s2 INNER JOIN Songs_artist ON s2.rank = Songs_artist.rank WHERE s2.artist_name = ${artist}`;
   const songsFromArtist =
   `SELECT Song.song_name, Song.rank, Songs_artist.artist_name
   FROM Song
   INNER JOIN Songs_artist ON Songs_artist.rank = Song.rank
   WHERE Songs_artist.artist_name = ${artist}
   `;

   const songs = await con.query(songsFromArtist);
   res.send(songs);
});

module.exports = app;
