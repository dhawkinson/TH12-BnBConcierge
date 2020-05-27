// Login.js
/***************************************************************/
/*****  Client side -- client/frontend/src/pages/Login.js (Public)  *****/
/*****  This is the client Login Page for the app          *****/
/***************************************************************/

// node modules
// import React, { useState } from 'react'
import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

// local modules
import { LocalButton } from '../../localStyles/navButtons'
import LoginBlack from '../../assets/icons/login-black.png'
import { loginLocal } from '../../actions/auth'

const Login = ({ loginLocal, isAuthenticated }) => {
  // set initial state
  // const [formData, setFormData] = useState({
  //   email: '',
  //   password: ''
  // })

  // Redirect if logged in
  if ( isAuthenticated ) {
    return <Redirect to='/home' />
  }

  return (
    <div className='page-content'>
      <Container>
        <Row className='login'>
          <Col className='login-content' style={{ textAlign: 'center'}}>
            <h2 className='login-head'>Login</h2>
            <p className='lead'><img className='login-image' src={LoginBlack} alt='login'></img> Login With Local Credentials</p>
            <Form style={{ textAlign: 'center'}}>
              <Form.Group controlId="formBasicEmail" className='auth-entry'>
                <Form.Control type="text" placeholder="Enter Username" />
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className='auth-entry'>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <LocalButton
                className='btn-auth btn-local'
                startIcon={<ExitToAppIcon />}
              >
                Local Credentials
              </LocalButton>
            </Form>
            <p className="my-5">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

Login.propTypes = {
  loginLocal: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated })

export default connect( mapStateToProps, { loginLocal } )(Login)