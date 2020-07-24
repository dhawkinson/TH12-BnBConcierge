// forecast.js
// **************************************************************************
// *****  Server side -- server/routes/api/forecast.js                  *****
// *****  This is the server-side weather route (only one) for the app  *****
// **************************************************************************

// *****  NOTE: Requires that openweathermap.org is the API consumed.   *****

// node modules
const express = require('express');
const axios = require('axios');
const chalk = require('chalk');

const router = express.Router();

// **********************************************************************
// *****  route: GET to /api/forecast                               *****
// *****  desc: Return api weather forecast data                    *****
// *****  access: Private                                           *****
// *****  matches to: client/src/actions/forecast.js, getWeather()  *****
// *****       & client/src/reducers/forecast.js, case GET_WEATHER  *****
// **********************************************************************
router.get('/', async (req, res) => {
  const exclude = 'minutely,hourly';
  const uri = `${process.env.REACT_APP_OWM_BASE_URL}lat=${process.env.REACT_APP_LOCATION_LAT}&lon=${process.env.REACT_APP_LOCATION_LNG}&exclude=${exclude}&appid=${process.env.REACT_APP_OWM_API_KEY}`;
  try {
    // ***** get the weather data
    const res = await axios.get(uri);

    // return res.data (forecast) as the payload for action creator getWeatherData()
    console.log('res ', res)
    res.json( res.data );

  } catch (error) {
    console.error(chalk.red('ERR ',error.message));
    res.status(500).send('Server Error');
  }
});

module.exports = router;