// ResetPassword.js
//*******************************************************************
//*****  Client side -- client/src/pages/auth/ResetPassword.js  *****
//*****  This is the Password Reset Page (a modal) for the app  *****
//*******************************************************************

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { setAlert } from '../../../redux/actions/alert';
import { resetPassword } from '../../../redux/actions/auth';
import CancelIcon from '../../../assets/icons/cancel.png';

// NOTE: this format of using the params is an ES6 destructure of props
const ResetPassword = ({ setAlert, resetPassword, isAuthenticated }) => {

  // Redirect if not Authenticated user
  // if (!isAuthenticated) {
  //   return <Redirect to='/login' />
  // };

  // set initial state (formData) & setForData updates state
  const [formData, setFormData] = useState({
    username: '',   // this is not right -- I should be passing it in
    password: '',
    password2: ''
  })

  // deconstruct formData
  const { username, password, password2 } = formData

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
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger')
    } else {
      // go to home page
      return <Link to='/home' />;
    }
  }

  return (
    <div id='page-container'>
      <div id='content-wrap' className='ResetPassword'>
        <h4 className='ResetHead'>Reset Password - { username }</h4>
        <h6 className='ResetSubhead'>Enter New Password</h6>
        <Form
          className='ResetForm'
          onSubmit={e => onSubmit(e)}
        >
          <Form.Group controlId='formBasicPassword' className='auth-entry'>
            <Form.Control
              type="password"
              placeholder="New Password"
              name="password"
              value={password}
              onChange={e => onChange(e)}
            />
          </Form.Group>
          <br/>
          <Form.Group controlId='formBasicPassword2' className='auth-entry'>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={e => onChange(e)}
            />
          </Form.Group>
          <br/>
        </Form>
        <Link
          to='/login'
          className='CancelReset'
        >
          <img src={CancelIcon} alt='cancel' style={{ width: '3rem' }}/>
        </Link>
        <Button
          className='ResetPassword'
          type = 'submit'
          variant = 'success'
          onClick={e => onSubmit(e)}
        >
          Reset Password
        </Button>
      </div>
    </div>
  )
};


ResetPassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated });

// connect() is added to the export because of redux, 
// passes state as first param (mapStateToProps in this case), an object of any actions to pass as second param (setAlert, register)
export default connect(mapStateToProps, { setAlert, resetPassword })(ResetPassword);