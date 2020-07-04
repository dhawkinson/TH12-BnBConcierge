// Footer.js
/****************************************************************/
/*****  Client side -- client/components/wrapper/Footer.js  *****/
/*****  This is the main Footer for the app                 *****/
/****************************************************************/

import React from 'react';

import Copyright from './Copyright';
import Credits from './Credits';

const Footer = () => {

  return (
    <footer id='footer' className='FootBar'>
      <Copyright />
      <Credits />
    </footer>
  );
};

export default Footer;
