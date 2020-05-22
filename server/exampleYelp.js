// Explore query
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