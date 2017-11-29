const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/test', (req, res) => {
   res.send('working');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT);
