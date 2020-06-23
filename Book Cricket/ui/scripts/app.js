//Dom References
const homeTeam = document.querySelector('#home_team');
const awayTeam = document.querySelector('#away_team');
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
