

// node modules
const axios = require('axios');
const chalk = require('chalk');

// local modules
const keys = require('./config/keys');

const apiUrl = keys.darkskyBaseUrl;
const queryStr = {
  apiKey: keys.darkskyApiKey,
  lat: keys.locationLat,
  lng: keys.locationLng
}

const url = `${apiUrl}${queryStr.apiKey}/${queryStr.lat},${queryStr.lng}`

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