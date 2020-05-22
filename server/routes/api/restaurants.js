// restaurants.js
// *****************************************************************************************
// *****  Server side -- server/routes/api/restaurants.js                              *****
// *****  These are the server-side restaurant routes for the app                      *****
// *****  NOTE how it works: (not necessarily in the sequence following)               *****
// *****  GET list of candidate restaurants:                                           *****
// *****  1. Category and Radius are determined on the Client side by manual entry.    *****
// *****  2. Category and Radius are passed the server side for query.                 *****
// *****  3. API Base URL and API Key are retrieved from keys file.                    *****
// *****  4. Query endpoint is constructed from Base URL, API Key, and passed params.  *****
// *****  5. Query is executed.                                                        *****
// *****  6. Response data (list) is sent back to Client side for presentation.        *****
// *****  7. On the Client side business.id can be used for detail business queries,   *****
// *****     to external URLs.                                                         *****
// *****************************************************************************************

// ***** NOTE: This module assumes and requires that Yelp-Fusion is the API consumed. *****

// node modules
const axios = require('axios');
const yelp = require('yelp-fusion');
const chalk = require('chalk');

// local modules
const keys = require('./config/keys');
const authKey = keys.yelpApiKey;

const params = {
  lat: keys.locationLat,
  lng: keys.locationLng,
  term: 'restaurants',
  categories: 'italian',
  radius: 8000,
  price: '2,3',
  limit: 10
}

const queryStr = {
  term: 'restaurants',
  categories: 'italian',
  latitude: keys.locationLat,
  longitude: keys.locationLng,
  radius: 8000,
  price: '2,3',
  limit: 10
}

console.log(chalk.blue('Query String ', queryStr))

const client = yelp.client(authKey);

client.search(queryStr)
  .then(res => {
    // success
    const firstRes = res.jsonBody.businesses;
    const prettyJson = JSON.stringify(firstRes, null, 2);
    console.log(chalk.green('RES ', prettyJson));
  })
  // error
  .catch(err => {
    console.log(chalk.red('ERR ', err));
  });