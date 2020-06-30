//Dom References
const homeTeam = document.querySelector('#home_team');
const awayTeam = document.querySelector('#away_team');

//Variables
let currentScoreContainer = null;
let homePlayersList = null;
let awayPlayersList = null;
let currentPlayerDiv = null;
let currentPlayerScore = null;
let currentPlayerName = null;
let teamsData = null;
let currentPlayerIndex = 0;
let totalPlayersIndex = 0;
let playersList = null;
let homeTeamTotal = 0;
let awayTeamTotal = 0;
let teamsObj = {};
let home = null;
let away = null;
let restartButton = null;

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

const startMatch = () => {
  //Enable the live scorer box
  currentScoreContainer.classList.remove('d-none');
  currentScoreContainer.classList.add('d-flex');

  simulateMatch();
}

const simulateMatch = (isHomeTeamCompleted = false) => {
  //Dom References
  currentPlayerName = document.querySelector('.current-player-name');
  currentPlayerScore = document.querySelector('.current-player-score');
  currentPlayerDiv = document.querySelector('.current-player-out');
  restartButton = document.querySelector('.restart-button');

  let homeTeamPlayer = homePlayersList.children[currentPlayerIndex];

  if(!isHomeTeamCompleted)
    simulatePlayerScores(homeTeamPlayer, homePlayersList);
  if(isHomeTeamCompleted){
    let awayTeamPlayer = awayPlayersList.children[currentPlayerIndex];
    simulatePlayerScores(awayTeamPlayer, awayPlayersList);
  }
}

function simulatePlayerScores(player, container) {
  teamsObj = JSON.parse(localStorage.getItem('teams'));
  home = teamsObj.home;
  away = teamsObj.away;

  let totalPlayerScore = 0;
  let randomScore = Math.floor(Math.random() * 7);
  let text = player.innerText.replace(/ /g, "");
  let playerItem = document.getElementById(text);

  if (totalPlayersIndex === 11) {
    currentPlayerIndex = 0;
    totalPlayersIndex++;
    simulateMatch(true);
  } else if (totalPlayersIndex === 23) {
    updateAwayTeamResults(home, away);
    return;
  }

  if (playerItem != null) {
    updateCurrentPlayerItem(playerItem, randomScore);

    let timer = setInterval(() => {
      if (player.innerText != 'Total') {
        playerItem.children[1].innerText = totalPlayerScore;
        updateCurrentPlayerItem(playerItem, randomScore);

        if (randomScore === 0) {
          currentPlayerDiv.textContent = `${playerItem.children[0].innerText} is out !`;
          clearInterval(timer);

          totalPlayersIndex += 1;
          currentPlayerIndex += 1;

          if (totalPlayersIndex === 11) {
            updateHomeTeamResults(home, away);
          }

          simulatePlayerScores(container.children[currentPlayerIndex], container);
        }
        else {
          totalPlayerScore += randomScore;
          homeTeamTotal = totalPlayersIndex < 11 ? homeTeamTotal + randomScore : homeTeamTotal;
          awayTeamTotal = totalPlayersIndex > 11 ? awayTeamTotal + randomScore : awayTeamTotal;
        }
        if (awayTeamTotal > homeTeamTotal) {
          updateAwayTeamResults(home, away, true);
          clearInterval(timer);
          return;
        }
        randomScore = Math.floor(Math.random() * 7);
      }
    }, 1200)
  }
}

const updateCurrentPlayerItem = (playerItem, randomScore) => {
  currentPlayerScore.textContent = randomScore;
  currentPlayerName.textContent = playerItem.children[0].innerText;
  document.getElementById(`Total${home}`).textContent = homeTeamTotal;
  if(totalPlayersIndex > 11 )  document.getElementById(`Total${away}`).textContent = awayTeamTotal;
}

const updateHomeTeamResults = (home, away) => {
  currentPlayerDiv.textContent = `${home} innings is Over!, Starting ${away} Innings...`;
}

const updateAwayTeamResults = (home, away, isCrossed = false) => {
  document.querySelector('.current-player').textContent = '';
  currentPlayerDiv.textContent = isCrossed ? `${away} Win!` : `${home} Win`;
  restartButton.classList.add('d-flex');
}

const reloadPage = () => location.reload();