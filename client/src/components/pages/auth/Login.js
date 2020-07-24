// Login.js
// *****************************************************************
// *****  Client side -- client/src/pages/auth/Login.js        *****
// *****  This is the client Login Page (wrapper) for the app  *****
// *****************************************************************

// node modules
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Form from 'react-bootstrap/Form';

// local modules
import { LocalButton } from '../../segments/NavButtons';
// import MailIcon from '../../../assets/icons/email@.png';
import { setAlert } from '../../../redux/actions/alert'
import { login } from '../../../redux/actions/auth';

// Note to self:  setAlert, login, isAuthenticated are destructured versions of:
//                props.setAlert, props.login...
const Login = ({ setAlert, login, isAuthenticated }) => {

  // set initial state of the form
  const [formData, setFormData] = useState({ username: '', password: '' });

  // deconstruct formData
  const { username, password } = formData;

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/home' />;
  };

  // change handler - dynamic and useful for each field because we use value
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  // Login submit handler
  const onSubmit = async e => {
    e.preventDefault();
    // call redux auth action - login()
    login(username, password);
  };

  return (
    <div id='page-container'>
      <div id='content-wrap' className='LoginUser'>
        <h4 className='LoginHead'>Login</h4>
        <h6 className='LoginSubhead'>Local Credentials</h6>
        <Form
          className='LoginForm'
          onSubmit={e => onSubmit(e)}
        >
          <Form.Group controlId="formBasicText" className='auth-entry'>
            <Form.Control 
              type="text" 
              placeholder="Username" 
              name="username" 
              value={username}
              onChange={e => onChange(e)}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formBasicPassword" className='auth-entry'>
            <Form.Control
                type="password"
                placeholder="Password"
                name="password" 
                value={password}
                onChange={e => onChange(e)}

              />
          </Form.Group>
          <br />
          <LocalButton
            className='btn btn-local'
            type='submit'
            startIcon={<ExitToAppIcon />}
            onClick={e => onSubmit(e)}
          >
            Local Credentials
          </LocalButton>
        </Form>
        <p className="LinkToRegister my-3">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        <p className="RequestReset my-3">
          Forgot Password?  <Link to="/requestReset">Request Reset</Link>
        </p>
      </div>
    </div>
  );
};

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated })

// connect() is added to the export because of redux, 
// passes state as first param (mapStateToProps in this case), 
// and an object of any actions to pass as second param(setAlert, login)

export default connect( mapStateToProps, { setAlert, login } )(Login)