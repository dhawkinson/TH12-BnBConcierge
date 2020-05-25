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

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

import MailIcon from '@material-ui/icons/Mail'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'

// local modules
import { LocalButton, FacebookButton, TwitterButton } from '../../localStyles/loginButtons'
import LoginImage from '../../assets/icons/login-black.png'
import { loginLocal } from '../../actions/auth'
import { loginFacebook } from '../../actions/auth'
import { loginTwitter } from '../../actions/auth'

const Login = ({ loginLocal, loginFacebook, loginTwitter, isAuthenticated }) => {
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
            <p className='lead'><img className='login-image' src={LoginImage} alt='login'></img> Login With Local Credentials</p>
            <Form style={{ textAlign: 'center'}}>
              <Form.Group controlId="formBasicEmail" className='auth-entry'>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className='auth-entry'>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <LocalButton
                className='btn-auth btn-local'
                startIcon={<MailIcon />}
              >
                Local Credentials
              </LocalButton>
            </Form>
            <br />
            <p className='lead'><img className='login-image' src={ LoginImage } alt='login'></img> Login With Social Credentials</p>
            <ul>
              <li>
                <FacebookButton
                  className='btn-auth btn-facebook'
                  startIcon={<FacebookIcon />}
                >
                  Facebook Credentials
                </FacebookButton>
              </li>
              <li><p> </p></li>
              <li>
                <TwitterButton
                  className='btn-auth btn-twitter'
                  startIcon={<TwitterIcon />}
                >
                  Twitter Credentials
                </TwitterButton>
              </li>
            </ul>
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
  loginFacebook: PropTypes.func.isRequired,
  loginTwitter: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated })

export default connect( mapStateToProps, { loginLocal, loginFacebook, loginTwitter } )(Login)