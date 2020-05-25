// Landing.js
/*****************************************************************/
/*****  Client side -- client/frontend/src/pages/Landing.js (Public)  *****/
/*****  This is the client Landing Page for the app.         *****/
/*****  It is the first page the user sees.                  *****/
/*****************************************************************/

import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Map from '../landing/Map'
import Pitch from '../landing/Pitch'

const Landing = ({ isAuthenticated }) => {
  if ( isAuthenticated ) {
    return <Redirect to='/home' />
  }

  return (
    <div className='page-content'>
      <Row className='landing'>
          <Col xs={12} sm={6}><Map style={{ margin: '0 auto' }} /></Col>
          <Col xs={12} sm={6}><Pitch style={{ margin: '0 auto' }} /></Col>
      </Row>
    </div>
  )
}

Landing.propTypes = { isAuthenticated: PropTypes.bool, }

const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated })

export default connect(mapStateToProps)(Landing)