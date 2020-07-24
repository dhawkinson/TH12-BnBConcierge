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
const auth = require('../../middleware/auth')
const Favorite = require('../../models/Favorite');
const User = require('../../models/User');

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
    const newVenue = {}; //  to prevent undefined
    if (variety) newVenue.variety = variety;
    if (genre) newVenue.genre = genre;
    if (category) newVenue.category = category;
    if (venueId) newVenue.venueId = venueId;
    if (venueName) newVenue.venueName = venueName;
    if (address1) newVenue.address1 = address1;
    if (address2) newVenue.address1 = address1;
    if (city) newVenue.city = city;
    if (state) newVenue.state = state;
    if (zipcode) newVenue.zipcode = zipcode;
    if (country) newVenue.country = country;
    if (apiUrl) newVenue.apiUrl = apiUrl;
    if (visited) newVenue.visited = visited;
    if (liked) newVenue.liked = liked;
    if (dateAdded) newVenue.dateAdded = dateAdded;

    try {
      let favorite = await Favorite.findOne({
        user: req.user.id
      });

      if (favorite) {
        // Update
        // insert the favorite line
        if (newVenue) {
          favorite.venues.push(newVenue);
          await favorite.save();
        }
        // send favorite to front end
        return res.json(favorite);
      }
      // Create - NOTE to self: favorite is the instance, Favorite is the model
      favorite = new Favorite(favoriteFields);
    
      // favoriteLine built, push to venues
      if (newVenue) favorite.venues.push(newVenue);

      await favorite.save();
      // send favorite to front end
      res.json(favorite);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error - posting favorite');
    }
  }
);

// ****************************************************
// *****  route: GET to /api/favorite             *****
// *****  desc: Get all favorites          *****
// *****  access: Public                          *****
// *****  matches to: TBD on the client side  *****
// ****************************************************
router.get('/', async (req, res) => {
  try {
    const favorites = await Favorite.find().populate('user', ['username']);
    // send favorites to front end
    res.json(favorites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error - getting all favorites');
  }
});

// ****************************************************
// *****  route: GET to /api/favorite/user/:user_id  *****
// *****  desc: Get favorites by user_id             *****
// *****  access: Public                          *****
// *****  matches to: TBD on the client side  *****
// ****************************************************
router.get('/user/:user_id', async (req, res) => {
  try {
    const newLocal = 'username';
    const favorite = await Favorite.findOne({ user: req.params.user_id }).populate('user', [newLocal]);

    if (!favorite) return res.status(400).json({ msg: 'There is no profile for this user' });

    // send favorites to front end
    res.json(favorite);
  } catch (err) {
    console.error(err.message);
    // error for invalid ObjectId
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.status(500).send('Server Error - getting favorite by User Id');
  }
});

// ****************************************************
// *****  route: DELETE to /api/favorite          *****
// *****  desc: Delete favorite & user          *****
// *****  access: Private                          *****
// *****  matches to: TBD on the client side  *****
// ****************************************************
router.delete('/', auth, async (req, res) => {
  try {
    // Remove favorite
    await Favorite.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });
    // send message to front end
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error - deleting user & favorite');
  }
});

// ****************************************************
// *****  route: DELETE to /api/favorite/venue/:venue_id  *****
// *****  desc: Delete venue from favorite          *****
// *****  access: Private                          *****
// *****  matches to: TBD on the client side  *****
// ****************************************************
router.delete('/venue/:venue_id', auth, async (req, res) => {
  try {
    // find favorite
    const favorite = await Favorite.findOne({ user: req.user.id });
    // Remove venue
    const removeIndex = favorite.venues.map(item => item.id).indexOf(req.params.venue_id)
    favorite.venues.splice(removeIndex, 1);
    await favorite.save();
    // send message to front end
    res.json({ msg: 'Venue deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error - deleting venue');
  }
});

// ****************************************************
// *****  route: PUT to /api/favorite/venue/:venue_id  *****
// *****  desc: like a venue in favorite s         *****
// *****  access: Private                          *****
// *****  matches to: TBD on the client side  *****
// ****************************************************
router.put('/venue/:venue_id', auth, async (req, res) => {
  try {
    // find favorite
    const favorite = await Favorite.findOne({ user: req.user.id });
    // Like venue
    const likeIndex = favorite.venues.map(item => item.id).indexOf(req.params.venue_id)
    favorite.venues.liked = !favorite.venues.liked;
    await favorite.save();
    // send message to front end
    res.json({ msg: 'Venue deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error - deleting venue');
  }
});

module.exports = router;