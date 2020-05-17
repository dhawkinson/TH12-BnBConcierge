// prod.js
// ***************************************************************************
// ***** server side - src/config/prod.js                                *****
// ***** This contains the configuation key values for the prod side app *****
// ***************************************************************************

module.exports = {
  mongoURI: process.env.MONGO_URI,
  sessionSecret: process.env.SESSION_SECRET,
  jwtSecret: process.env.JWT_SECRET,
  facebookAppId: process.env.FACEBOOK_APP_ID,
  facebookAppSecret: process.env.FACEBOOK_APP_SECRET,
  facebookAppToken: process.env.FACEBOOK_APP_TOKEN,
  twitterConsumerKey: process.env.TWITTER_CONSUMER_KEY,
  twitterConsumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  twitterAccessToken: process.env.TWITTER_ACCESS_TOKEN,
  twitterAccessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  googleApiKey: process.env.GOOGLE_API_KEY,
  googlePlaceId: process.env.GOOGLE_PLACE_ID,
  proxyUrl: process.env.PROXY_URL
}