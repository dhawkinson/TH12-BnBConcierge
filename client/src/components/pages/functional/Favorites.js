// Favorites.js
//********************************************************************
//*****  Client side -- client/src/pages/Favorites.js (Private)  *****
//*****  This is the client Profiles Page for the app            *****
//********************************************************************

import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import ErrorIcon from '../../../assets/icons/error.png'

const Favorites = () => {
  return (
    <div id='page-container'>
      <div id='content-wrap'>
        <Container>
          <Row>
            <Col>
            <h3 className="text-danger">
              <img src={ ErrorIcon } alt='error' style={{ width: '2rem' }} /> Favorites is a Placeholder Page For Now <img src={ ErrorIcon } alt='error' style={{ width: '2rem' }} />
            </h3>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Favorites