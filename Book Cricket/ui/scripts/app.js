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
  }).catch(err => {
    console.log('Error in fetching Teams data ', err);
  })
}

const populateAwayTeams = () => {
  let homeTeamSelection = homeTeam.value;
  let awayTeamsList = teamsData.filter(team => team.key !== homeTeamSelection);
  populateTeamsList(awayTeamsList, awayTeam);
}

getTeamsData();
