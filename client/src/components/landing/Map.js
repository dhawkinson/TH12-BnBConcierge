// Map.js
//*******************************************************************
//*****  Client side -- frontend/src/components/landing/Map.js  *****
//*****  This is the map component of the Landing Page          *****
//*****  It is on the first page the user sees.                 *****
//*******************************************************************

// node modules
import React from 'react'
import ResponsiveEmbed from 'react-responsive-embed'

// local modules
const keys   = require('../../config/keys')  // require the config file pointer

const apiKey = keys.googleApiKey
const placeId = keys.googlePlaceId
const mapURL = `https://www.google.com/maps/embed/v1/place?q=place_id:${placeId}&key=${apiKey}&zoom=10`

const Map = () => {

  return (
    <ResponsiveEmbed className='map' src={mapURL} />
  )
}

export default Map