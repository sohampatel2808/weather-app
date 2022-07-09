const request = require('request');

const openweather = require('./openweather');
const response = require('./response');

const geocode = (address = '') => {
  return new Promise((resolve, reject) => {
    if (address === null || address.length === 0) {
      return reject('Please provide address!');
    }

    const requestUrl = openweather.getGeoLocationUrl({ q: encodeURIComponent(address) });
  
    request({ url: requestUrl, json: true }, (error, { body } = {}) => {
      if (error) {
        return reject('Unable to connect to geolocation service');
      } else if (body.message || body.length === 0) {
        return reject('Unable to find location, try another search.');
      }

      const { lon: longitude, lat: latitude, name: location } = body[0];

      return resolve({ longitude, latitude, location });
    });
  });
}

module.exports = geocode;
