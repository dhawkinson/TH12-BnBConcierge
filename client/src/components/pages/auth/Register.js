// Register.js
//***************************************************************************
//*****  Client side -- client/frontend/src/pages/Register.js (Public)  *****
//*****  This is the client User Registration Page for the app          *****
//***************************************************************************

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import RegisterIcon from '@material-ui/icons/PersonAdd';

import { RegisterButton } from '../../segments/NavButtons';
import { setAlert } from '../../../redux/actions/alert';
import { register } from '../../../redux/actions/auth';

// Note to self:  setAlert, register, isAuthenticated are destructured versions of:
//                props.setAlert, props.register...
const Register = ({ setAlert, register, isAuthenticated }) => {

  // set initial state (formData) & setFormData updates state
  // Note: to self -- formData same as state = { formData: {...}}
  //                  setFormData same as this.setState({...})
  // this construct works only for functional components - class components use a constructor
  // functional components are required when using hooks such as (useState())
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password2: ''
  });

  // deconstruct formData
  const { username, password, password2 } = formData;

  // change handler - dynamic and useful for each field because we use value
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  // submit handler
  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      // call redux auth action - register()
      register({ username, password });
    }
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/home' />;
  };

  return (
    <div id='page-container'>
      <div id='content-wrap' className='RegisterUser'>
        <h4 className="RegisterHead">Register User (Local)</h4>
        <h6 className="RegisterSubhead">Create Your Account</h6>
        <Form
          className='RegisterForm'
          onSubmit={e => onSubmit(e)}
        >
          <Form.Group controlId='formBasicText' className='auth-entry'>
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={e => onChange(e)}
            />
          </Form.Group>
          <br />
          <Form.Group controlId='formBasicPassword' className='auth-entry'>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={e => onChange(e)}

            />
          </Form.Group>
          <br />
          <Form.Group controlId='formBasicPassword2' className='auth-entry'>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={e => onChange(e)}

            />
          </Form.Group>
          <br />
          <RegisterButton
            className='btn-auth btn-local'
            startIcon={<RegisterIcon />}
            onClick={e => onSubmit(e)}
          >
            Register
          </RegisterButton>
        </Form>
        <p className="LinkToLogin my-3">
          Already Have an Account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  )
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated });

// connect() is added to the export because of redux, 
// passes state as first param (mapStateToProps in this case), an object of any actions to pass as second param (setAlert, register)
export default connect(mapStateToProps, { setAlert, register })(Register);