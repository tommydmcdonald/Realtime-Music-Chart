const express = require('express');
const app = express.Router();
const _ = require('lodash');
const { createDBCon } = require('./database');

const mysql = require('promise-mysql');

//view all songs with rank, artist name
app.get('/songs', async (req, res) => {
   const songsFromArtist =
   `SELECT Song.song_name, Song.rank, Songs_artist.artist_name
   FROM Song
   INNER JOIN Songs_artist ON Songs_artist.rank = Song.rank`;

   const con = await createDBCon();
   const songs = await con.query(songsFromArtist);
   res.send(songs);
});

//view certain song's play count and artist
app.get('/song/:name', async (req, res) => {
   const name = mysql.escape(req.params.name);

   const songQuery =
   `SELECT Song.song_name, Song.rank, Songs_artist.artist_name
   FROM Song
   INNER JOIN Songs_artist ON Songs_artist.rank = Song.rank
   WHERE Song.song_name = ${name}`;

   const con = await createDBCon();
   const song = await con.query(songQuery);

   res.send(song);
});

//all streams above a certain amount
app.get('/song/count/:amount', async (req, res) => {
   const { amount } = req.params;
   const songsAboveStreamAmt =
   `SELECT Song.song_name, Stream_count.stream_count
   FROM Song
   INNER JOIN Stream_count ON Stream_count.rank = Song.rank
   WHERE Stream_count.stream_count >= ${amount}`

   const con = await createDBCon();
   const songs = await con.query(songsAboveStreamAmt);
   res.send(songs);
})

//view all songs with certain rank with artist name
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
   const songsFromRank =
   `SELECT Song.song_name, Song.rank, Songs_artist.artist_name
   FROM Song
   INNER JOIN Songs_artist ON Songs_artist.rank = Song.rank
   WHERE Song.rank ${symbol} ${rankNumber}`;

   const results = await con.query(songsFromRank);
   res.send(results);
});

//view all artists who have certain amount of songs in top 200
app.get('/artists/songs/:amount', async (req, res) => {
   const { amount } = req.params;
   const con = await createDBCon();

   const allArtists = `SELECT artist_name FROM Artist`;
   const sqlArtists = await con.query(allArtists);

   const artists = [];
   for (obj of sqlArtists) {
      artists.push( obj.artist_name );
   }

   const artistSong = {};
   for (artist of artists) {
      artistSanitized = mysql.escape(artist);

      const songsFromArtist =
      `SELECT Song.song_name, Song.rank
      FROM Song
      INNER JOIN Songs_artist ON Songs_artist.rank = Song.rank
      WHERE Songs_artist.artist_name = ${artistSanitized}`;

      artistSong[artist] = await con.query(songsFromArtist);
   }

   const artistsAboveAmount = [];

   for (artist in artistSong) {
      const songAmt = artistSong[artist].length;
      console.log(songAmt);

      if ( songAmt >= amount) {
         artistsAboveAmount.push( { artist, count: songAmt } )
      }
   }

   const sortedArtists = _.sortBy(artistsAboveAmount, 'amount').reverse();

   res.send(sortedArtists);
});

//all songs from an artist
app.get('/artist/:artist', async (req, res) => {
   const artist = mysql.escape(req.params.artist);

   const con = await createDBCon();

   const songsFromArtist =
   `SELECT Song.song_name, Song.rank, Songs_artist.artist_name
   FROM Song
   INNER JOIN Songs_artist ON Songs_artist.rank = Song.rank
   WHERE Songs_artist.artist_name = ${artist}
   `;

   const songs = await con.query(songsFromArtist);
   res.send(songs);
});

//all songs from all artists posted
app.post('/artists', async (req, res) => {
   const { artists } = req.body;
   const allSongs = [];

   const con = await createDBCon();

   for (artist of artists) {
      artistSanitized = mysql.escape(artist);

      const songsFromArtist =
      `SELECT Song.song_name, Song.rank, Songs_artist.artist_name
      FROM Song
      INNER JOIN Songs_artist ON Songs_artist.rank = Song.rank
      WHERE Songs_artist.artist_name = ${artistSanitized}`;

      const songs = await con.query(songsFromArtist)
      songs.map( song => allSongs.push(song));
   }

   res.send(allSongs);
});

//view all artists
app.get('/all_artists', async (req, res) => {
   const artists = `SELECT artist_name FROM Artist`;
   const con = await createDBCon();
   const allArtists = await con.query(artists);
   const artistsRef = [];
   allArtists.map( artist => artistsRef.push( {artist: artist.artist_name} ));

   res.send(artistsRef);
});

//top X artists by playcount
app.get('/artists/playcount/sort/:amount', async (req, res) => {
   const { amount } = req.params;
   const queryArtistPlayCount =
   `SELECT Songs_artist.artist_name, Stream_count.stream_count
   FROM Songs_artist
   INNER JOIN Stream_count ON Songs_artist.rank = Stream_count.rank`;

   const con = await createDBCon();
   const songPlays = await con.query(queryArtistPlayCount);

   const artistPlaysTotals = {}

   for (song of songPlays) {
      if ( artistPlaysTotals.hasOwnProperty(song.artist_name) ) { //already exists
         artistPlaysTotals[song.artist_name] += song.stream_count;
      }
      else { //add it in
         artistPlaysTotals[song.artist_name] = song.stream_count;
      }
   }

   //sorting
   const keys = Object.keys(artistPlaysTotals);
   keys.sort( (a,b) => {
      return artistPlaysTotals[b] - artistPlaysTotals[a];
   });

   const topArtistsByPlays = keys.slice(0, amount);
   const topArtistsPlayCount = [];

   //adding back artist name
   for (artist of topArtistsByPlays) {
      topArtistsPlayCount.push( { artist, count: artistPlaysTotals[artist] } );
   }

   res.send(topArtistsPlayCount);
});

//all artists above certain total playcount
app.get('/artists/playcount/has/:plays', async (req, res) => {
   const { plays } = req.params;
   const queryArtistPlayCount =
   `SELECT Songs_artist.artist_name, Stream_count.stream_count
   FROM Songs_artist
   INNER JOIN Stream_count ON Songs_artist.rank = Stream_count.rank`;

   const con = await createDBCon();
   const songPlays = await con.query(queryArtistPlayCount);

   const artistPlaysTotals = {}

   for (song of songPlays) {
      if ( artistPlaysTotals.hasOwnProperty(song.artist_name) ) { //already exists
         artistPlaysTotals[song.artist_name] += song.stream_count;
      }
      else { //add it in
         artistPlaysTotals[song.artist_name] = song.stream_count;
      }
   }

   //removing all artists not at threshold
   const threshold = {}
   for (key in artistPlaysTotals)
   {
      if ( artistPlaysTotals[key] >= plays)
         threshold[key] = artistPlaysTotals[key];
   }

   //sorting
   const keys = Object.keys(threshold);
   keys.sort( (a,b) => {
      return artistPlaysTotals[b] - artistPlaysTotals[a];
   });

   const topArtistsPlayCount = [];
   //adding back artist name
   for (artist of keys) {
      topArtistsPlayCount.push( { artist, count: artistPlaysTotals[artist] } );
   }



   res.send(topArtistsPlayCount);
})

module.exports = app;
