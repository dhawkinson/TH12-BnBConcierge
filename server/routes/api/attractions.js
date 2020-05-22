// attractions.js
// *****************************************************************************************
// *****  Server side -- server/routes/api/attractions.js                              *****
// *****  These are the server-side attraction routes for the app                      *****
// *****  NOTE how it works: (not necessarily in the sequence following)               *****
// *****  GET list of candidate attractions:                                           *****
// *****  1. Category and Radius are determined on the Client side by manual entry.    *****
// *****  2. Category and Radius are passed the server side for query.                 *****
// *****  3. API Base URL and API Key are retrieved from keys file.                    *****
// *****  4. Query endpoint is constructed from Base URL, API Key, and passed params.  *****
// *****  5. Query is executed.                                                        *****
// *****  6. Response data (list) is sent back to Client side for presentation.        *****
// *****  7. On the Client side business.id can be used for detail business queries,   *****
// *****     to external URLs.                                                         *****
// *****************************************************************************************

// ***** NOTE: This module assumes and requires that Foursquare is the API consumed. *****

// node modules
const axios = require('axios');
const chalk = require('chalk');

// local modules
const keys = require('./config/keys');

const apiUrl = keys.foursquareBaseUrl;
const queryStr = {
  clientId: keys.foursquareClientId,
  clientSecret: keys.foursquareClientSecret,
  lat: keys.locationLat,
  lng: keys.locationLng,
  queryValue: 'museum',
  version: keys.foursquareVersion,
  limit: 10
}

const url = `${apiUrl}client_id=${queryStr.clientId}&client_secret=${queryStr.clientSecret}&ll=${queryStr.lat},${queryStr.lng}&query=${queryStr.queryValue}&v=${queryStr.version}&limit=${queryStr.limit}`

console.log(chalk.blue('URL ',url))

axios.get(url)
  .then((res) => {
    // success
    console.log(chalk.yellow('RES data ', res.data));
    const data = JSON.stringify(res.data, null, 2);
    console.log(chalk.blue('RES data ', data));
    console.log(chalk.green('RES status ', res.status));
    console.log(chalk.yellow('RES status text ', res.statusText));
    console.log(chalk.green('RES headers ', res.headers));
    console.log(chalk.yellow('RES config ', res.config));
  }, (error) => {
    // error
    console.log(chalk.red('ERR ', error));
  })