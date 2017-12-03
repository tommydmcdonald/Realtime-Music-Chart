const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const createDB = require('./createDB');
createDB();

const databaseRoutes = require('./databaseRoutes');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use('/api', databaseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
