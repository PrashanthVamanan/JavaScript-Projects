let base = 'http://localhost:3001/';

const getTeams = async () => {
  let route = 'teams';
  const teams = await fetch(base + route);
  const response = teams.json();
  return response;
}

const getTeamPlayers = async teamKey => {
  let route = 'players';
  const players = await fetch(`${base}${route}/${teamKey}`);
  const response = players.json();
  return response;
}