// Header.js
/****************************************************************/
/*****  Client side -- client/components/wrapper/Header.js  *****/
/*****  This is the main Header for the app                 *****/
/****************************************************************/

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Logo from './Logo';
import Title from './Title';
import AuthLinks from './AuthLinks';
import GuestLinks from './GuestLinks';

// import '../../styling/App.css';

const Header = ({ auth: { isAuthenticated, loading } }) => {

  return (
    <header id='header' className='HeadBar'>
      <Logo />
      <Title />
      {!loading && (isAuthenticated ? <AuthLinks /> : <GuestLinks />)}
    </header>
  );
}

Header.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(Header)
