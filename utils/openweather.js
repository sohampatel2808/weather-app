require('dotenv').config();
const url = require('url');

const getGeoLocationUrl = (queryParams) => {
  const urlObject = createUrlObject(queryParams);
  urlObject.pathname = process.env.PATHNAME_GEOLOCATION;

  return url.format(urlObject);
}

const getCurrentWeatherUrl = (queryParams) => {
  const urlObject = createUrlObject(queryParams);
  urlObject.pathname = process.env.PATHNAME_CURRENT_WEATHER;

  return url.format(urlObject);
}

const createUrlObject = (queryParams) => {
  return {
    protocol: process.env.PROTOCOL_HTTPS,
    hostname: process.env.HOSTNAME_OPENWEATHER,
    pathname: '',
    query: {
      appid: encodeURIComponent(process.env.API_KEY_OPENWEATHER),
      ...queryParams
    }
  }    
}

module.exports = {
  getGeoLocationUrl: getGeoLocationUrl,
  getCurrentWeatherUrl: getCurrentWeatherUrl
}
