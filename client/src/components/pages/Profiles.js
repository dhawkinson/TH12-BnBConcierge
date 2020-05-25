// Profiles.js
//*******************************************************************
//*****  Client side -- client/frontend/src/pages/Profiles.js (Provate)  *****
//*****  This is the client Profiles Page for the app           *****
//*******************************************************************

import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import ErrorIcon from '../../assets/icons/error.png'

const Profiles = () => {
  return (
    <div className='page-content'>
      <Container>
        <Row>
          <Col style={{ textAlign: 'center', marginTop: '5rem' }}>
          <h3 className="text-danger">
            <img src={ ErrorIcon } alt='error' style={{ width: '2rem' }} /> Profiles is a Placeholder Page For Now <img src={ ErrorIcon } alt='error' style={{ width: '2rem' }} />
          </h3>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Profiles