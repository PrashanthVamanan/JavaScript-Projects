//Dom References
const homeTeam = document.querySelector('#home_team');
const awayTeam = document.querySelector('#away_team');
let currentScoreContainer = null;
let homePlayersList = null;
let awayPlayersList = null;
let counter = 0;

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

  if(!localStorage.getItem('teams')) {
    setLocalStorage(); 
  }

  let teamsInfo = JSON.parse(localStorage.getItem('teams'));
  currentScoreContainer = document.querySelector('.current-score');


  //Set home and away team names
  const homeTeamName = document.querySelector('.home-team-name');
  const awayTeamName = document.querySelector('.away-team-name');

  homeTeamName.textContent = teamsInfo.home;
  homeTeamName.classList.add(teamsInfo.home);
  awayTeamName.textContent = teamsInfo.away;
  awayTeamName.classList.add(teamsInfo.away);

  homePlayersList = document.querySelector('.home-team-players .players-list');
  awayPlayersList = document.querySelector('.away-team-players .players-list');


  //Get playersList for home and away teams
  for (let [key,value] of Object.entries(teamsInfo)) {
    getTeamPlayers(value)
      .then(data => {
        let container = key === 'home' ? homePlayersList : awayPlayersList;
        populatePlayersList(data, container, value);
      })
      .catch(err => {
        console.log("Error in fetching players data ", err);
      })
  }
}

const populatePlayersList = (playerList, container, className) => {

  container.innerHTML = '';

  playerList.forEach(player => {
    let html = `
      <li class=${className} id=${player.replace(/ /g, "")}>
        <span>${player}</span>
        <span></span>
      </li>
    `
    container.innerHTML += html;
  })

  let totalHtml = `
    <li class=${className}>
      <span>Total</span>
      <span id=Total${className}></span>
    </li>
  `
  container.innerHTML += totalHtml;
}

const redirectToMatch = () => {
  if(!localStorage.getItem('teams')) {
    setLocalStorage();
  }
  window.location.href = 'match.html';
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

/** Start Match */ 

const startMatch = () => {
  //Enable the live scorer box
  currentScoreContainer.classList.remove('d-none');
  currentScoreContainer.classList.add('d-flex');

  let homeTeamPlayers = document.querySelectorAll('.home-team-players li');

  homeTeamPlayers.forEach(player => {
    if(player.innerText != 'Total') {
      let text = player.innerText.replace(/ /g, "");
      let playerItem = document.getElementById(text);
    }
  })
}