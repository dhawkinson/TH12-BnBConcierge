// Dining.js
//*****************************************************************
//*****  Client side -- client/frontend/src/pages/Dining.js (Private)  *****
//*****  This is the client Dining Page for the app           *****
//*****************************************************************

import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import ErrorIcon from '../../../assets/icons/error.png'

const Dining = () => {
  return (
    <div id='page-container'>
      <div id='content-wrap'>
        <Container>
          <Row>
            <Col>
            <h3 className="text-danger">
              <img src={ ErrorIcon } alt='error' style={{ width: '2rem' }} /> Dining is a Placeholder Page For Now <img src={ ErrorIcon } alt='error' style={{ width: '2rem' }} />
            </h3>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Dining