// MapText.js
//**********************************************************************
//*****  Client side -- client/src/components/segments/MapText.js  *****
//*****  This is the text component of the Landing Page            *****
//*****  It is on the first page the user sees.                    *****
//**********************************************************************

// node modules
import React from 'react';

const MapText = () => {

  return (
    <div className='MapText mt-3 ml-3'>
      <h4>Convenient, yet set apart!</h4>
      <h6>Some nearby venues and activities:</h6>
      <ul>
        <li>12 min to Federal Way Transit Center (Light Rail soon)</li>
        <li>26 min SW of SeaTac Airport, away from the flight path</li>
        <li>23 min to Southcenter Mall</li>
        <li>27 min to Chihuly Bridge of Glass (Tacoma)</li>
        <li>30 min to Washington State Fairgrounds (Puyallup)</li>
        <li>35 min (or less) to entertainment venues:</li>
        <ul className='ml-4'>
          <li>Emerald Downs Racetrack</li>
          <li>Showare Center</li>
          <li>Tacoma Dome</li>
          <li>Muckleshoot & Emerald Queen Casinos</li>
          <li>White River Amphitheater</li>
          <li>Century Link Field/T-Mobile Park</li>
        </ul>
        <li>45 min to the following:</li>
        <ul className='ml-4'>
          <li>Pike Place Market (Downtown Seattle)</li>
          <li>South Lake Union (Amazon, Facebook, Google)</li>
          <li>Microsoft, Redmond Way (off hour times)</li>
        </ul>
        <li>60 min to Northwest Trek Wildlife Park</li>
        <li>65 min to Snoqualmie Pass Ski Area</li>
        <li>85 min to Mt. Rainier National Park</li>
        <li>102 min to Crystal Mountain Ski Area</li>
        <li>180 min to Olympic National Park (Kalaloch Lodge)</li>
      </ul>
      <h6>And, so much more!</h6>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
    </div>
  )
}

export default MapText