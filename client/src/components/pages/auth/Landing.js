// Landing.js
/*****************************************************************/
/*****  Client side -- client/frontend/src/pages/Landing.js  *****/
/*****  This is the client Landing Page for the app.         *****/
/*****  It is the first page the user sees.                  *****/
/*****************************************************************/

import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MapImage from '../../segments/MapImage';
import MapText from '../../segments/MapText';

const Landing = ({ isAuthenticated }) => {

  // Redirect if not logged in
  if (isAuthenticated) {
    return <Redirect to='/home' />;
  };

  return (
    <div id='page-container'>
      <div id='content-wrap' className='Landing'>
          <MapImage />
          <MapText />
      </div>
    </div>
  )
};

Landing.propTypes = { isAuthenticated: PropTypes.bool, };

const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated });

export default connect(mapStateToProps)(Landing);