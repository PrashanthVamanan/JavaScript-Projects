let base = 'http://localhost:3000/';

const getTeams = async () => {
  let route = 'teams';
  const teams = await fetch(base + route);
  const response = teams.json();
  return response;
}