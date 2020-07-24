// activities.js
// *****************************************************************************************
// *****  Server side -- server/routes/api/activities.js                               *****
// *****  These are the server-side attraction routes for the app                      *****
// *****  NOTE how it works: (not necessarily in the sequence following)               *****
// *****  GET list of candidate activities:                                            *****
// *****  1. Category and Radius are specified on the Client side by manual entry.     *****
// *****  2. Category and Radius are passed to the server side for query.              *****
// *****  3. API Base URL and API Key are retrieved from process.env.REACT_APP_...     *****
// *****  4. Query endpoint is constructed from Base URL, API Key, and passed params.  *****
// *****  5. Query is executed.                                                        *****
// *****  6. Response data (list) is sent back to Client side for presentation.        *****
// *****  7. On the Client side business.id can be used for detail business queries,   *****
// *****     to external URLs.                                                         *****
// *****************************************************************************************

// ***** NOTE: This module assumes and requires that Foursquare is the API consumed. *****

// node modules
const axios = require('axios');

const queryStr = {
  queryValue: 'museum',
  limit: 10
}

const url = `${process.env.REACT_APP_FOURSQUARE_BASE_URL}client_id=${process.env.REACT_APP_FOURSQUARE_CLIENT_ID}&client_secret=${process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET}&ll=${process.env.REACT_APP_LOCATION_LAT},${process.env.REACT_APP_LOCATION_LNG}&query=${queryStr.queryValue}&v=${process.env.REACT_APP_FOURSQUARE_VERSION}&limit=${queryStr.limit}`

console.log('URL ',url)

axios.get(url)
  .then((res) => {
    // success
  }, (error) => {
    // error
    console.log('ERR ', error);
  })