const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'jpyfT_!=k6Ch',
  database: 'rtc'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

});
