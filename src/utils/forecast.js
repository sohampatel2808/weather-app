const openweather = require('./openweather');
const request = require('request');

const forecast = (longitude, latitude, callback) => {
  if (longitude === undefined || latitude === undefined) { 
    callback('Please provide search coordinates!');
  }

  const queryParams = {
    lat: latitude,
    lon: longitude,
    units: 'metric',
  };
  const requestUrl = openweather.getCurrentWeatherUrl(queryParams);

  request({ url: requestUrl, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to forecast service');
    } else if (response.body.cod !== 200) {
      callback('Unable to find location');
    } else {
      callback(undefined, 'It is currently ' + response.body.main.temp + ' degrees out. It feels like ' + response.body.main.feels_like + ' degrees out.');
    }
  });
}

module.exports = forecast;
