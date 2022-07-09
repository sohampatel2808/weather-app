const buttonWeatherSearch = document.getElementById('button-weather-search');
const inputWeatherSearch = document.getElementById('input-weather-search');

buttonWeatherSearch.addEventListener('click', () => {
  fetchWeatherDetails(inputWeatherSearch.value);
});

async function fetchWeatherDetails(address) {
  try {
    const message1 = document.getElementById('message-1');
    const message2 = document.getElementById('message-2');
    message1.textContent = 'Loading...';
    message2.textContent = '';

    const requestUrl = '/weather?address=' + address;

    const response = await fetch(requestUrl);
    const weatherData = await response.json();

    if (weatherData.error) {
      message1.textContent = '';
      message2.textContent = weatherData.error;
    } else {
      message1.textContent = weatherData.location;
      message2.textContent = weatherData.forecast;
    }
  } catch (err) {
    console.log(ex);
  }
}
