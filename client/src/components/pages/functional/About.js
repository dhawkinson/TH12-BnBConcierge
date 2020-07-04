// About.js
// ****************************************************************
// *****  Client side -- client/components/src/pages/About.js *****
// *****  This is the client About Page for the app           *****
// ****************************************************************

import React from 'react'

const About = () => {
  return (
    <div id='page-container'>
      <div id='content-wrap' className='About'>
        <h2 className='AboutHead'>About</h2>
        <h4 className='AboutSubhead'>Reservations</h4>
        <div className='AboutContent'>
          <p>Hawk's Landing BnB has two accomodations available to reserve with views of Poverty Bay on South Puget Sound:</p>
          <ul>
            <li>
              <strong><em>The Suite - </em></strong><span>A full suite that includes:</span>
              <p>Living Room with sleeper sofa, Kitchenette, Private Bedroom with gas fireplace, TV/Internet, Full Bath with Steam Shower. Sleeps four. Separate entrance.</p>
            </li>
            <li>
              <strong><em>The Room - </em></strong><span>A cozy bedroom with:</span>
              <p>TV/Internet, Microwave and Coffee maker, Full Bath with Shower. Sleeps two. Separate entrance.</p>
              <p>Both accomodations have access to a large deck overlooking Poverty Bay. The deck includes a propane grill and a large hot tub.</p>
              <p>To book either (or both) accomodations, click on <a href='https://www.airbnb.com/' target='_blank' rel='noopener noreferrer'>airbnb.com here.</a></p>
            </li>
          </ul>
          <br />
          <hr />
          <br />
          <h4>App Information</h4>
          <p>This app was designed and built by <a href='http://www.webandappfactory.com/' target='_blank' rel='noopener noreferrer'>Web and App Factory.</a></p>
          <p>Need help with websites or apps?</p><p>Contact Doug Hawkinson.</p>
          <p>By phone:<a href="tel:2069103655"> (206)910-3655</a> or email: doug@webandappfactory.com</p>
        </div>
      </div>
    </div>
  );
};

export default About;