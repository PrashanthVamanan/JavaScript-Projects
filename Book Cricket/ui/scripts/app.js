//Dom References
const homeTeam = document.querySelector('#home_team');
const awayTeam = document.querySelector('#away_team');
let currentScoreContainer = null;
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

  if (!localStorage.getItem('teams')) {
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
  for (let [key, value] of Object.entries(teamsInfo)) {
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
  if (!localStorage.getItem('teams')) {
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

/**
 * 1. Get all home and away players in an array
 
 * 2. Run a loop for all elements in the array
 
 *      2.1 Generate a random number between 0 and 6 (inclusive)
 
 *      2.2 while random number is not zero
 
 *          2.2.1 Add the score to the current player and update ui
 *                If it is zero break out of the while loop
 * 
 *      Update the total to the current player score
 * 
 *      Read the next player and repeat the process
 */

const startMatch = () => {
  //Enable the live scorer box
  currentScoreContainer.classList.remove('d-none');
  currentScoreContainer.classList.add('d-flex');

  let homeTeamPlayers = document.querySelectorAll('.home-team-players li');
  let awayTeamPlayers = document.querySelectorAll('.away-team-players li');
  let playersList = [...homeTeamPlayers, ...awayTeamPlayers];

  simulateMatch(playersList);
}

const simulateMatch = playerList => {

  const currentPlayerName = document.querySelector('.current-player-name');
  const currentPlayerScore = document.querySelector('.current-player-score');
  const currentPlayerDiv = document.querySelector('.current-player');

  let player = playerList[0];

  // playerList.forEach(player => {
  if (player.innerText != 'Total') {

    let randomScore = Math.floor(Math.random() * 7);
    let text = player.innerText.replace(/ /g, "");
    let playerItem = document.getElementById(text);
    let playerScoreTotal = 0;

    if (randomScore === 0) {
      currentPlayerDiv.textContent = `${playerItem.children[0].innerText} is out !`;
    } else {
      currentPlayerName.textContent = playerItem.children[0].innerText;
      currentPlayerScore.textContent = randomScore;
      playerItem.children[1].innerText = randomScore + playerScoreTotal;
      simulatePlayerScores(currentPlayerScore, currentPlayerName, currentPlayerDiv, playerItem, randomScore);
    }
  }
  // })
}

function simulatePlayerScores(currentPlayerScore, currentPlayerName, currentPlayerDiv, playerItem, randomScore) {
  let totalPlayerScore = randomScore;
  let timer = setInterval(() => {
    randomScore = Math.floor(Math.random() * 7);
    if (randomScore === 0) {
      currentPlayerName.textContent = null;
      currentPlayerScore.textContent = null;
      currentPlayerDiv.textContent = `${playerItem.children[0].innerText} is out !`;
      clearInterval(timer);
    }
    else {
      totalPlayerScore += randomScore;
      playerItem.children[1].innerText = totalPlayerScore;
      currentPlayerScore.textContent = randomScore;
      currentPlayerName.textContent = playerItem.children[0].innerText;
    }
  }, 2000)
}