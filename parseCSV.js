const csv = require('csvtojson');
const request = require('request');
const mysql = require('mysql');
const _ = require('lodash');

const URL_CSV = 'https://spotifycharts.com/regional/us/daily/latest/download';

const sanitizeJSON = (chartData) => {
   sanitizedChartData = [];
   _.forEach(chartData, (song) => {
      const sanitiziedSong = {};
      for (key in song) {
         sanitiziedSong[key] = mysql.escape(song[key]);
      }
      sanitizedChartData.push(sanitiziedSong);
   });
   return sanitizedChartData;
}

module.exports = {
   fetchJSON: () => {
      return new Promise( (resolve, reject) => {
         const chartData = [];
         csv()
        .fromStream(request.get(URL_CSV))
        .on('json', (data) => {
           chartData.push(data);
        })
        .on('done', (error) => {
           if (error)
           reject(error);
           else
           resolve(sanitizeJSON(chartData));
        })
     });
   }


}
