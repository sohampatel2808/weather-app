const geocode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast');
const express = require('express');
const app = express();

app.get('', (req, res) => {
  res.send('Hello World!');
});

app.get('/weather', (req, res) => {
  geocode('Mumbai', (error, { longitude, latitude, location } = {}) => {
    if (error) return res.send(error);

    forecast(longitude, latitude, (error, responseForecastData) => {
      if (error) return res.send(error);
  
      return res.send(responseForecastData);
    });
  });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
