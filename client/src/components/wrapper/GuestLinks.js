// guestLinks.js
/********************************************************************/
/*****  Client side -- client/components/wrapper/guestLinks.js  *****/
/*****  This is the nav-list of options for guest users         *****/
/********************************************************************/

import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import MenuIcon100 from '../../assets/icons/menu100.png';

// import '../../styling/App.css';

const GuestLinks = () => {

  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 575px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <>
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav NavGuest">
          <a className="Login ml-3" href="/login">Login</a>
          <a className="Register ml-3" href="/register">Register</a>
        </nav>
      </CSSTransition>
      <button onClick={toggleNav} className="Burger">
        <img className='menu-icon' src={MenuIcon100} alt='menu-icon' />
      </button>
    </>
  )
};

export default GuestLinks