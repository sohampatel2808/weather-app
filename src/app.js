const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// setup path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    authorName: 'Soham Patel'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    authorName: 'Soham Patel'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    authorName: 'Soham Patel'
  });
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
