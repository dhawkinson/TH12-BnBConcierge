// NotFound.js -- components/layout (client-side)
// component for handling not found errors.

import React  from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import ErrorIcon from '../../../assets/icons/error.png'

const NotFound = () => {
  return (
    <div className='page-content'>
      <Container>
        <Row>
          <Col style={{ textAlign: 'center', marginTop: '5rem' }}>
          <h3 className="text-danger">
            <img src={ ErrorIcon } alt='error' style={{ width: '2rem' }} /> Page Not Found <img src={ ErrorIcon } alt='error' style={{ width: '2rem' }} />
          </h3>
        <p>Sorry, this page does not exist!</p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default NotFound


