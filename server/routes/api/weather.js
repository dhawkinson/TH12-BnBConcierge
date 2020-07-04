// weather.js
// **************************************************************************
// *****  Server side -- server/routes/api/weather.js                   *****
// *****  This is the server-side weather route (only one) for the app  *****
// **************************************************************************

// *****  NOTE: Assumes/requires that darksky.net is the API consumed.  *****

// node modules
const express = require('express');
const axios = require('axios');
const chalk = require('chalk');

const router = express.Router();

// *********************************************************************
// *****  route: GET to /api/weather                               *****
// *****  desc: Return api weather data                            *****
// *****  access: Private                                          *****
// *****  matches to: client/src/actions/weather.js, getWeather()  *****
// *****       & client/src/reducers/weather.js, case GET_WEATHER  *****
// *********************************************************************
router.get('/weather', async (req, res) => {
  try {
    // build url to weather api
    const keys = require('../../../client/src/config/keys');
  
    const baseUrl = keys.darkskyBaseUrl;
    const apiKey = keys.darkskyApiKey;
    const lat = keys.locationLat;
    const lng = keys.locationLng;
    const url = `${baseUrl}${apiKey}/${lat},${lng}`

    const res = await axios.get(url);
    
    // forecast -- strip down res, only using currently{} & daily{}
    const forecast = {
      currently: res.data.currently,
      daily: res.data.daily.data
    };

    console.log(chalk.yellow('SERVER SIDE FORECAST ', forecast));

    // return forecast
    res.json({ forecast });

  } catch (error) {
    console.error(chalk.red('ERR ',error.message));
    res.status(500).send('Server Error');
  }
});

module.exports = router;