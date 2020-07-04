// authLinks.js
/*********************************************************************/
/*****  Client side -- client/components/wrapper/authLinks.js    *****/
/*****  This is the nav-list of options for authenticated users  *****/
/*********************************************************************/

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import { logout } from '../../redux/actions/auth'
import MenuIcon100 from '../../assets/icons/menu100.png';

// import '../../styling/App.css';

const AuthLinks = ({ auth: { isAuthenticated, loading }, logout }) => {

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
        <nav className="NavAuth">
          <a className="WeatherLink ml-3" href="/weather">Weather</a>
          <a className="DiningLink ml-3" href="/dining">Dining</a>
          <a className="ActivitiesLink ml-3" href="/activities">Activities</a>
          <a className='FavoritesLink ml-3' href="/favorites">Favorites</a>
          <a className="AboutLink ml-3" href="/about">About</a>
          <a href="#!" className="LogoutLink ml-3 mr-3" onClick={ logout }>Logout</a>
        </nav>
      </CSSTransition>
      <button onClick={toggleNav} className="Burger">
        <img className='menu-icon' src={MenuIcon100} alt='menu-icon' />
      </button>
    </>
  )
};

AuthLinks.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps, { logout })(AuthLinks);