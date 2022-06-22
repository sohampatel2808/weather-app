const openweather = require('./openweather');
const request = require('request');

const geocode = (address = '', callback) => {
  if (address === null || address.length === 0) {
    console.log('Please provide address!');
    return;
  }

  const queryParams = {
    q: encodeURIComponent(address)
  };
  const requestUrl = openweather.getGeoLocationUrl(queryParams);

  request({ url: requestUrl, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to geolocation service', undefined);
    } else if (body.message || body.length === 0) {
      callback('Unable to find location, try another search.', undefined);
    } else {
      const { lon: longitude, lat: latitude, name: location } = body[0];

      callback(undefined, { longitude, latitude, location });
    }
  });
}

module.exports = geocode;
