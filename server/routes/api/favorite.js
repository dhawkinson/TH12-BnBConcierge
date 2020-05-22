// favorites.js
// **************************************************************************
// *****  Server side -- server/routes/api/profile.js                   *****
// *****  The route for all things pertaining to user profiles          *****
// *****  NOTE to self: These are recognized as profile routes because  *****
// *****       of the path -- server/routes/api/profile.js              *****
// **************************************************************************

// node modules
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// local modules
const keys = require('../../config/keys');
const auth = require('../../middleware/auth')
const Favorite = require('../../models/Favorite');
const User = require('../../models/User');

// ****************************************************
// *****  route: GET to /api/favorite             *****
// *****  desc: really just a test route          *****
// *****  access: Public                          *****
// *****  matches to: NOTHING on the client side  *****
// ****************************************************
router.get('/', (req, res) => res.send('Favorite route'));    // use with POSTMAN

// ****************************************************
// *****  route: GET to /api/favorite/me          *****
// *****  desc: get current user favorite         *****
// *****  access: Private                         *****
// *****  matches to: TBD on the client side  *****
// ****************************************************
router.get('/me', auth, async (req, res) => {
  try {
    //  locate the user and populate the username
    const favorite = await Favorite.findOne({ user: req.user.id }).populate('user', 'username');
    //  if no favorite
    if (!favorite) {
      return res.status(400).json({
        msg: 'There is no favorite document for this user'
      });
    }
    //  else return favorite as a json object to front end
    res.json(favorite);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error - getting favorite');
  }
});

// **************************************************
// *****  route: POST to /api/favorite          *****
// *****  desc: create or update user favorite  *****
// *****  access: Private                       *****
// *****  matches to: TBD on the client side    *****
// **************************************************
const checks = [
  check('variety', 'Variety is required').not().isEmpty(),
  check('category', 'Category is required').not().isEmpty(),
  check('venueId', 'VenueId is required').not().isEmpty(),
  check('venueName', 'Venue Name is required').not().isEmpty(),
  check('address1', 'Address1 is required').not().isEmpty(),
  check('city', 'City is required').not().isEmpty(),
  check('state', 'State is required').not().isEmpty(),
  check('zipcode', 'Zipcode is required').not().isEmpty(),
  check('apiUrl', 'API URL is required').not().isEmpty(),
];
router.post('/', [auth, checks], async (req, res) =>
  {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // deconstruct req.body
    const {
      variety,
      genre,
      category,
      venueId,
      venueName,
      address1,
      address2,
      city,
      state,
      zipcode,
      country,
      apiUrl,
      visited,
      liked,
      dateAdded
    } = req.body;

    // Build favorite object
    const favoriteFields = {}
    favoriteFields.user = req.user.id;
    favoriteFields.venues = [];
  
    // build the favorite line to be pushed onto the favorite document
    const favoriteLine = {}; //  to prevent undefined
    if (variety) favoriteLine.variety = variety;
    if (genre) favoriteLine.genre = genre;
    if (category) favoriteLine.category = category;
    if (venueId) favoriteLine.venueId = venueId;
    if (venueName) favoriteLine.venueName = venueName;
    if (address1) favoriteLine.address1 = address1;
    if (address2) favoriteLine.address1 = address1;
    if (city) favoriteLine.city = city;
    if (state) favoriteLine.state = state;
    if (zipcode) favoriteLine.zipcode = zipcode;
    if (country) favoriteLine.country = country;
    if (apiUrl) favoriteLine.apiUrl = apiUrl;
    if (visited) favoriteLine.visited = visited;
    if (liked) favoriteLine.liked = liked;
    if (dateAdded) favoriteLine.dateAdded = dateAdded;

    try {
      let favorite = await Favorite.findOne({
        user: req.user.id
      });

      if (favorite) {
        // Update
        // insert the favorite line
        if (favoriteLine) {
          favorite.venues.push(favoriteLine);
          await favorite.save();
        }
        // send favorite to front end
        return res.json(favorite);
      }
      // Create
      favorite = new Favorite(favoriteFields);
    
      // favoriteLine built, push to venues
      if (favoriteLine) favorite.venues.push(favoriteLine);

      await favorite.save();
      // send favorite to front end
      res.json(favorite);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error - posting favorite');
    }
  }
);

module.exports = router;