// Title.js
/***************************************************************/
/*****  Client side -- client/components/wrapper/Title.js  *****/
/*****  This is the header text for the Navbar             *****/
/***************************************************************/

import React from 'react';
// import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Title = ({ auth: { isAuthenticated, loading } }) => {
  
  return (
    <>
      <h3 className='Title'>Hawk's Landing Concierge</h3>
    </>
  );
}

Title.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(Title)