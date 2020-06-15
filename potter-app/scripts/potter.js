const baseUrl = 'https://www.potterapi.com/v1/'
const apiKey = '$2a$10$niiMnAem6zrymVKhBg6DKuTED6oGCXJ5ZRJgk5AVgkPB0FMhhQ7QG';

const getSpells = async () => {
  const apiEndPoint = `${baseUrl}spells?key=${apiKey}`;
  const response = await fetch(apiEndPoint);
  const data = await response.json();
  return data;
}

const getCharacterOrWandDetails = async () => {
  const apiEndPoint = `${baseUrl}characters?key=${apiKey}`;
  const response = await fetch(apiEndPoint);
  const data = await response.json();
  return data;
}