// Map.js
//******************************************************************
//*****  Client side -- client/src/components/segments/Map.js  *****
//*****  This is the map component of the Landing Page         *****
//*****  It is on the first page the user sees.                *****
//******************************************************************

// node modules
import React from 'react';
import ResponsiveEmbed from 'react-responsive-embed';


const mapURL = `https://www.google.com/maps/embed/v1/place?q=place_id:${process.env.REACT_APP_GOOGLE_PLACE_ID}&key=${process.env.REACT_APP_GOOGLE_API_KEY}&zoom=9`;

const MapImage = () => {

  return (
    <div className='Map mt-3 ml-3'>
      <ResponsiveEmbed src={mapURL} />
    </div>
  )
};

export default MapImage;