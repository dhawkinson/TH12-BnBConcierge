// Register.js
//***************************************************************************
//*****  Client side -- client/frontend/src/pages/Register.js (Public)  *****
//*****  This is the client User Registration Page for the app          *****
//***************************************************************************

import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import RegisterIcon from '@material-ui/icons/PersonAdd'

import { RegisterButton } from '../../localStyles/loginButtons'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'
import RegisterImage from '../../assets/icons/user+-black.png'

// NOTE: this format of using the params is an ES6 destructure of props
const Register = ({ setAlert, register, isAuthenticated }) => {

  // set initial state (formData)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  })

  // deconstruct formData
  const { username, email, password, password2 } = formData

  // change handler - dynamic and useful for each field because we use value
  const onChange = e => setFormData(
    {
      ...formData,
      [e.target.name]: e.target.value
    }
  )

  // submit handler
  const onSubmit = async e => {
    e.preventDefault()
    if ( password !== password2 ) {
      setAlert('Passwords do not match', 'danger')
    } else {
      // this is placeholder code that will be removed
      register({ username, email, password })
    }
  }

  // Redirect if logged in
  if ( isAuthenticated ) {
    return <Redirect to='/home' />
  }

  return (
    <div className='page-content'>
      <Container>
        <Row className='register'>
          <Col className='register-content' style={{ textAlign: 'center'}}>
            <h2 className="register-head">Register with Local Credentials</h2>
            <p className="lead"><img className='register-image' src={RegisterImage} alt='register' />Create Your Account</p>
            <Form style={{ textAlign: 'center'}} onSubmit={e => onSubmit(e)}>
              <Form.Group controlId='formBasicText' className='auth-entry'>
                <Form.Control 
                    type="text" 
                    placeholder="Username" 
                    name="username" 
                    value={username}
                    onChange={e => onChange(e)}

                  />
              </Form.Group>
              <Form.Group controlId='formBasicEmail' className='auth-entry'>
                <Form.Control 
                  type="email" 
                  placeholder="Email Address" 
                  name="email" 
                  value={email}
                  onChange={e => onChange(e)} 

                />
                <small className="form-text">
                  <p>We will <strong><em>NEVER</em></strong> send you email you didn't ask for.</p>
                  <p style={{marginTop: '-1rem' }}>We will <strong><em>NEVER</em></strong> sell your email.</p>
                </small>
              </Form.Group>
              <Form.Group controlId='formBasicPassword' className='auth-entry'>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password" 
                    value={password}
                    onChange={e => onChange(e)}

                  />
              </Form.Group>
              <Form.Group controlId='formBasicPassword2' className='auth-entry'>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="password2" 
                  value={password2}
                  onChange={e => onChange(e)}

                />
              </Form.Group>
            </Form>
            <RegisterButton
              className='btn-auth btn-local'
              startIcon={<RegisterIcon />}
              onClick={e => onSubmit(e)}
            >
              Register
            </RegisterButton>
            <p className="my-5">
              Already Have a Local or Social Account? <Link to="/login">Log In</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated })

// connect() is added to the export because of redux, 
// passes state as first param (mapStateToProps in this case), an object of any actions to pass as second param (setAlert, register)
export default connect( mapStateToProps, { setAlert, register } )(Register)