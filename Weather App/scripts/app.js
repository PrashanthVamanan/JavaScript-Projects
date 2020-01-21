const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUI = data => {

  //destructure properties
  const { cityDetails, weather } = data;

  //update details template
  details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>    
    </div> 
  `;

  //update the night/day & icon images
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`
  icon.setAttribute('src', iconSrc);


  let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';

  time.setAttribute('src', timeSrc);

  //remove the d-none class if present
  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }

};

cityForm.addEventListener('submit', e => {
  //prevent default action
  e.preventDefault();

  //get city value
  const city = cityForm.city.value.trim();
  localStorage.setItem('city', city);
  cityForm.reset();

  //update the ui with the new city
  forecast.updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

});

if (localStorage.getItem('city')) {
  const city = localStorage.getItem('city');
  forecast.updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}