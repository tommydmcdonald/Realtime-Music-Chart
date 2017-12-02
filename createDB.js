const { initializeDB, createDBCon } = require('./database');
const { fetchJSON } = require('./parseCSV');
const _ = require('lodash');
const mysql = require('promise-mysql');

const run = async () => {
   const json = await fetchJSON();
   await initializeDB();
   const con = await createDBCon();
   // console.log(json);

   _.forEach(json, async (song) => {
      const { Artist, Streams, Position, URL } = song;
      const TrackName = song['Track Name'];

      //Song
      const insertSong = `INSERT INTO Song (rank, song_name, url) VALUES (${Position}, ${TrackName}, ${URL})`;
      try { await con.query(insertSong) } catch(err) {}

      //Artist
      const insertArtist = `INSERT INTO Artist (artist_name) VALUES (${Artist})`;
      try { await con.query(insertArtist) } catch(err) {}

      //Songs_artist
      const insertSongsArtist = `INSERT INTO Songs_artist (rank, artist_name) VALUES (${Position}, ${Artist})`;
      try { await con.query(insertSongsArtist) } catch(err) {}

      //Stream_count
      const insertStreamCount = `INSERT INTO Stream_count (rank, stream_count) VALUES (${Position}, ${Streams})`;
      try { await con.query(insertStreamCount) } catch(err) {}
   });

}

run();
