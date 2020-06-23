//Setup express
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const expressPort = 3001;

const teams = require('./data/countries');
const players = require('./data/players');

app.get('/teams', (req, res) => {
  return res.send(teams);
})

app.get('/players/:key', (req, res) => {
  let playerList = players.filter(player => player.key === req.params.key);
  return res.send(playerList[0].players);
})

app.listen(expressPort, () => console.log('Server is listening on port ' + expressPort));