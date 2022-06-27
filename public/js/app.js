const buttonWeatherSearch = document.getElementById('button-weather-search');
const inputWeatherSearch = document.getElementById('input-weather-search');
const message1 = document.getElementById('message-1');
const message2 = document.getElementById('message-2');

buttonWeatherSearch.addEventListener('click', () => {
  message1.textContent = 'Loading...';
  message2.textContent = '';

  const location = inputWeatherSearch.value;

  const requestUrl = 'http://localhost:3000/weather?address=' + location;

  fetch(requestUrl)
    .then(response => {
      response.json()
        .then(weatherData => {
          if (weatherData.error) {
            message1.textContent = '';
            message2.textContent = weatherData.error;
          } else {
            message1.textContent = weatherData.location;
            message2.textContent = weatherData.forecast;
          }
        });
    })
    .catch(ex => {
      console.log(ex);
    })
});
