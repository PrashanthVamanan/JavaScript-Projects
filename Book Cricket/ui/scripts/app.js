//Dom References
const homeTeam = document.querySelector('#home_team');
const awayTeam = document.querySelector('#away_team');
let homePlayersList = null;
let awayPlayersList = null;

//Variables
let teamsData = null;

const populateTeamsList = (data, container) => {
  container.innerHTML = '';

  data.forEach(item => {
    let html = `
      <option value=${item.key}>${item.value}</option>
    `;
    container.innerHTML += html;
  });
}

const getTeamsData = () => {
  getTeams().then(data => {
    teamsData = data;
    populateTeamsList(teamsData, homeTeam);
    let awayTeamsList = teamsData.filter(team => team.key !== homeTeam.value);
    populateTeamsList(awayTeamsList, awayTeam);
    setLocalStorage();
  }).catch(err => {
    console.log('Error in fetching Teams data ', err);
  })
}

const updateTeamsList = team => {
  let teamsList = null;

  if (team === 'home') {
    teamsList = teamsData.filter(team => team.key !== homeTeam.value);
    if (homeTeam.value === awayTeam.value)
      populateTeamsList(teamsList, awayTeam);
  } else {
    teamsList = teamsData.filter(team => team.key !== awayTeam.value);
    if (awayTeam.value === homeTeam.value)
      populateTeamsList(teamsList, homeTeam);
  }

  setLocalStorage();
}

const setTeamsInformation = () => {

  let teamsInfo = JSON.parse(localStorage.getItem('teams'));

  //Set home and away team names
  document.querySelector('.home-team-name').textContent = teamsInfo.home;
  document.querySelector('.away-team-name').textContent = teamsInfo.away;

  homePlayersList = document.querySelector('.home-team-players .players-list');
  awayPlayersList = document.querySelector('.away-team-players .players-list');


  //Get playersList for home and away teams
  for (let [key,value] of Object.entries(teamsInfo)) {
    getTeamPlayers(value)
      .then(data => {
        let container = key === 'home' ? homePlayersList : awayPlayersList;
        populatePlayersList(data, container);
      })
      .catch(err => {
        console.log("Error in fetching players data ", err);
      })
  }
}

const populatePlayersList = (playerList, container) => {

  container.innerHTML = '';

  playerList.forEach(player => {
    let html = `
      <li style="background: maroon;">
        <span>${player}</span>
        <span>-</span>
        <span id=${player}></span>
      </li>
    `
    container.innerHTML += html;
  })
}

const setLocalStorage = () => {
  localStorage.setItem('teams',
    JSON.stringify({
      'home': homeTeam.value,
      'away': awayTeam.value
    })
  )
}

if (!location.pathname.includes("match"))
  getTeamsData();
