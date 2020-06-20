//Setup express
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const expressPort = 3000;

const teams = require('./data/countries');

app.get('/teams', (req, res) => {
  return res.send(teams);
})

app.listen(expressPort, () => console.log('Server is listening on port ' + expressPort));