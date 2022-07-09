const openweather = require('./openweather');
const request = require('request');

const forecast = (longitude, latitude) => {
  return new Promise((resolve, reject) => {
    if (longitude === undefined || latitude === undefined) { 
      return reject('Please provide search coordinates!');
    }
  
    const requestUrl = openweather.getCurrentWeatherUrl({ lat: latitude, lon: longitude, units: 'metric' });
  
    request({ url: requestUrl, json: true }, (error, response) => {
      if (error) {
        return reject('Unable to connect to forecast service');
      } else if (response.body.cod !== 200) {
        return reject('Unable to find location');
      }

      const currentWeather = 'It is currently ' + response.body.main.temp + 
        ' degrees out. It feels like ' + response.body.main.feels_like + ' degrees out.';

      return resolve(currentWeather);
    });
  });
}

module.exports = forecast;
