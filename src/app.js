const geocode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast');

geocode('Mumbai', (error, { longitude, latitude, location } = {}) => {
  if (error) {
    console.log(error);
    return;
  }
  
  forecast(longitude, latitude, (error, responseForecastData) => {
    if (error) {
      console.log(error);
      return;
    }

    console.log(responseForecastData);
  });
});
