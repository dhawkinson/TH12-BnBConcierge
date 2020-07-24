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

const apiKey = process.env.REACT_APP_YELP_API_KEY;

const queryStr = {
  term: 'restaurants',
  categories: 'italian',
  latitude: process.env.REACT_APP_LOCATION_LAT,
  longitude: process.env.REACT_APP_LOCATION_LNG,
  radius: 8000,
  price: '2,3',
  limit: 10
}

console.log('Query String ', queryStr)

const client = yelp.client(apiKey);

client.search(queryStr)
  .then(res => {
    // success
    const firstRes = res.jsonBody.businesses;
    const prettyJson = JSON.stringify(firstRes, null, 2);
    console.log('RES ', prettyJson);
  })
  // error
  .catch(err => {
    console.log('ERR ', err);
  });