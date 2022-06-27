const request = require('request');

const openweather = require('./openweather');
const response = require('./response');

const geocode = (address = '', callback) => {
  if (address === null || address.length === 0) {
    return callback('Please provide address!');
  }

  const queryParams = {
    q: encodeURIComponent(address)
  };
  const requestUrl = openweather.getGeoLocationUrl(queryParams);

  request({ url: requestUrl, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to geolocation service');
    } else if (body.message || body.length === 0) {
      callback('Unable to find location, try another search.');
    } else {
      const { lon: longitude, lat: latitude, name: location } = body[0];

      callback(undefined, { longitude, latitude, location });
    }
  });
}

module.exports = geocode;
