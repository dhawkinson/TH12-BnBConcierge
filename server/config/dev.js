// dev.js
//*******************************************************************************************
//*****  Server side -- src/config/dev.js === DO NOT COMMIT THIS FILE ===               *****
//*****  A file containing the values used for interfaces keys, to be used in dev only  *****
//*******************************************************************************************

module.exports = {
  mongoURI: 'mongodb+srv://dougDbAdmin:fsMongoGuy0!745@concierge-db-qxdnh.mongodb.net/test?retryWrites=true&w=majority',
  sessionSecret: 'needToKnow',
  jwtSecret: 'hieronymousBosch',
  googleApiKey: 'AIzaSyCILrHmEBcVZC4JTIeQqPYhkYF0d6jACM0',
  googlePlaceId: 'ChIJM8X8FjdXkFQRk7O6hXaL__0',
  locationLat: 47.33352,
  locationLng: -122.36043,
  darkskyApiKey: 'bbc3e991ce177448225408b1f7fd0b98',
  darkskyBaseUrl: 'https://api.darksky.net/forecast/',
  foursquareClientId: 'SVQV0QNGDTC0XOGFZOIRJNFJDZYNBNKKJSQYYAHSS05ZISDY',
  foursquareClientSecret: 'R1IWJHDP3XPLG3ZQPVA103QQ1XFXFSYRNYBDN1JBLR1A4V1G',
  foursquareBaseUrl: 'https://api.foursquare.com/v2/venues/search?',
  foursquareVersion: '20180323',
  yelpClientId: 'Ae-togPN2oN8uGNQ9DPiyA',
  yelpApiKey: '-FfvKPPdMbpQ0uizInXSmPnLGAOtc3EaGCjBITjnqD2wIOPwioaJV5V4lbN-rKkYAqBzJRrq3l9jvU8syIdH_9LJvISl_4P46em-FdcvLGcR6D5x62OIuCn0w-zCXnYx',
  yelpBaseUrl: 'https://api.yelp.com/v3/businesses/search?',
  proxyUrl: 'http://localhost:5000'
}