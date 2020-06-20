//Dom References
const homeTeam = document.querySelector('#home_team');
const awayTeam = document.querySelector('#away_team');
let teamsData = null;

const populateHomeTeams = data => {
  data.forEach(item => {
    let html = `
      <option value=${item.key}>${item.value}</option>
    `;
    homeTeam.innerHTML += html;
  });
}

const getTeamsData = () => {
  getTeams().then(data => {
    teamsData = data;
    populateHomeTeams(teamsData);
  }).catch(err => {
    console.log('Error in fetching Teams data ', err);
  })
}

getTeamsData();
