// prod.js
// ***************************************************************************
// ***** server side - src/config/prod.js                                *****
// ***** This contains the configuation key values for the prod side app *****
// ***************************************************************************

module.exports = {
  mongoURI: process.env.MONGO_URI,
  sessionSecret: process.env.SESSION_SECRET,
  jwtSecret: process.env.JWT_SECRET,
  googleApiKey: process.env.GOOGLE_API_KEY,
  googlePlaceId: process.env.GOOGLE_PLACE_ID,
  locationLat: process.env.LOCATION_LAT,
  locationLng: process.env.LOCATION_LNG,
  darkskyApiKey: process.env.DARKSKY_API_KEY,
  darkskyBaseUrl: process.env.DARKSKY_BASE_URL,
  foursquareClientId: process.env.FOURSQUARE_CLIENT_ID,
  foursquareClientSecret: process.env.FOURSQUARE_CLIENT_SECRET,
  foursquareBaseUrl: process.env.FOURSQUARE_BASE_URL,
  foursquareVersion: process.env.FOURSQUARE_VERSION,
  yelpClientId: process.env.YELP_CLIENT_ID,
  yelpApiKey: process.env.YELP_API_KEY,
  yelpBaseUrl: process.env.YELP_BASE_URL,
  proxyUrl: process.env.PROXY_URL
}