// Navbar.js
/*******************************************************************/
/*****  Client side -- client/components/navigation/Navbar.js  *****/
/*****  This is the main Navbar for the app                    *****/
/*******************************************************************/

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Logo from './Logo'
import Headline from './Headline'
import AuthLinks from './AuthLinks'
import GuestLinks from './GuestLinks'

const Navbar = ({ auth: { isAuthenticated, loading } }) => {

  return (
    <div id='top' className='navbar'>
      <Row style={{ margin: '0', width: '100%' }}>
      <Col xs='auto' className='logo col'>
          <Logo />
        </Col>
        <Col className='headline col'>
          <Headline />
        </Col>
      <Col xs='auto' className='links col'>
          {!loading && (isAuthenticated ? <AuthLinks /> : <GuestLinks />) }
        </Col>
      </Row>
    </div>
  )
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(Navbar)
