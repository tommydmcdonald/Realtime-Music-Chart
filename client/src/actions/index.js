import axios from 'axios';

export const search = (input, view) => async dispatch => {
   let route, reqBody = null;

   switch(view) {
      case 'all_songs': //All songs
         route = '/songs';
         break;
      case 'song': //A song
         route = `/song/${input}`;
         break;
      case 'songs_streams': //Songs with at least this many streams
         route = `/song/count/${input}`;
         break;
      case 'songs_rank': //Songs above this rank
         //fix need 2 inputs
         const inputs = input.split(' ');
         route = `/rank/${inputs[0]}/${inputs[1]}`;
         break;
      case 'artists_songs_top200': //Artists with this many songs in the top 200
         route = `/artists/songs/${input}`;
         break;
      case 'songs_artist': //All songs from an artist
         route = `/artist/${input}`;
         break;
      case 'songs_artists': //All songs from artists
         const artists = input.split(', ');
         reqBody = { artists };
         route = `/artists`;
         break;
      case 'artists': //All artists
         route = `/all_artists`;
         break;
      case 'artists_rank': //This many top artists ranked by playcount
         route = `/artists/playcount/sort/${input}`;
         break;
      case 'artists_streams': //All artists above this total playcount
         route = `/artists/playcount/has/${input}`;
         break;
   }

   let res;
   if (view == 'songs_artists')
      res = await axios.post(`/api${route}`, reqBody);
   else
      res = await axios.get(`/api${route}`);


   // const res = await axios.get(route);

   dispatch({ type: 'NEW_VIEW', payload: res.data});
}
