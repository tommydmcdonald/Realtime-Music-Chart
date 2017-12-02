const csv = require('csvtojson');
const request = require('request');

const chartData = []; //
const URL_CSV = 'https://spotifycharts.com/regional/global/daily/latest/download';

csv()
.fromStream(request.get(URL_CSV))
.on('json',(jsonObj)=>{
   chartData.push(jsonObj);
})
.on('done',(error)=>{
    console.log('chartData = ', chartData);
})
