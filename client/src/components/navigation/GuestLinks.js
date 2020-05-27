// guestLinks.js
/***********************************************************************/
/*****  Client side -- client/components/navigation/guestLinks.js  *****/
/*****  This is the nav-list of options for guest users            *****/
/***********************************************************************/

import React from 'react';
import { Link } from 'react-router-dom';

import LoginIcon from '../../assets/icons/login.png';
import RegisterIcon from '../../assets/icons/user+.png';

const GuestLinks = () => {

  return (
    <ul className='links guest-links'>
      <li className='link-item'>
        <Link to='/login'>
          <img className='icon login' src={LoginIcon} alt='login' />
          <span className='label login d-none d-md-inline'>{' '}Login</span>
        </Link>
      </li>
      <li className='link-item'>
        <Link to='/register'>
          <img className='icon register' src={RegisterIcon} alt='register' />
          <span className='label register d-none d-md-inline'>{' '}Register</span>
        </Link>
      </li>
    </ul>
  )
};

export default GuestLinks