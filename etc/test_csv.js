const csv = require('csvtojson');
const request = require('request');
const _ = require('lodash');
const monthDays = require('month-days');

const download = () => {
   const BASE_URL = 'https://spotifycharts.com/regional/us/daily/2017';
   const month = 10; //nov
   const day = 30
   const URL = `${BASE_URL}-${month+1}-${day}`;

   const chartData = {}
   const month_day = (month+1) + '-' + day;
   downloadURL(chartData, URL, month+1, day);
   return chartData;
}

const downloadURL = async (chartData, URL, month, day) => {
   console.log('URL = ', URL, ' month= ', month, ' day= ', day);
   csv()
   .fromStream( await request.get(URL))
   .on('json',(jsonObj)=>{
      console.log(jsonObj);
      chartData[month + '-' + day].push(jsonObj);
   })
   .on('done',(error)=>{
       console.log('chartData = ', chartData[month + '-' + day]);
   })
}

const data = download();
console.log(data);
