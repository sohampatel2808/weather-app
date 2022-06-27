const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const response = require('./utils/response');

const app = express();
const port = process.env.PORT || 3000;

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

// endpoints 
app.get('', (req, res) => {
  res.render('index', response.getDefaultResponse('Weather App'));
});

app.get('/about', (req, res) => {
  res.render('about', response.getDefaultResponse('About'));
});

app.get('/help', (req, res) => {
  res.render('help', response.getDefaultResponse('Help'));
});

app.get('/weather', (req, res) => {
  geocode(req.query.address, (errorMessage, { longitude, latitude, location } = {}) => {
    if (errorMessage) {
      return res.send(response.getErrorResponse(errorMessage));
    }

    forecast(longitude, latitude, (error, responseForecastData) => {
      if (error) {
        return res.send(response.getErrorResponse(errorMessage));
      }
  
      return res.send({
        forecast: responseForecastData,
        location: location
      });
    });
  });
});

app.get('*', (req, res) => {
  res.render('404', response.get404Response());
});

app.listen(port, () => {
  console.log('Server is listening on port ' + port);
});
