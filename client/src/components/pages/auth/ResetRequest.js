// ResetRequest.js
//***************************************************************************
//*****  Client side -- client/src/pages/auth/ResetRequest.js           *****
//*****  This is the Request Password Reset Page (a modal) for the app  *****
//***************************************************************************

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { setAlert } from '../../../redux/actions/alert';
import { resetRequest } from '../../../redux/actions/auth';
import CancelIcon from '../../../assets/icons/cancel.png';

// NOTE: this format of using the params is an ES6 destructure of props
const ResetRequest = ({ setAlert, resetRequest, isAuthenticated }) => {

  // set initial state (formData) & setForData updates state
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  });

  // deconstruct formData
  const { username, email } = formData;

  // change handler - dynamic and useful for each field because we use value
  const onChange = e => setFormData(
    {
      ...formData,
      [e.target.name]: e.target.value
    }
  );

  // submit handler
  const onSubmit = async e => {
    e.preventDefault()
    // call redux auth action - ResetRequest()
    resetRequest(username, email);
  };

  return (
    <div id='page-container'>
      <div id='content-wrap' className='ResetRequest'>
        <h4 className='RequestHead'>Password Reset Request</h4>
        <h6 className='RequestSubhead'>User Information</h6>
        <br />
        <Form 
          className='RequestForm'
          onSubmit={e => onSubmit(e)}
        >
          <small className="form-text">Only used to send password reset instructions.</small>
          <small className="form-text">Email addresses are not stored anywhere.</small>
          <small className="form-text">Click 'Send Email' below then watch for instructions.</small>
          <br/>
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
          <Form.Group controlId="formBasicEmail" className='auth-entry'>
            <Form.Control 
              type="text" 
              placeholder="Email address" 
              name="email" 
              value={email}
              onChange={e => onChange(e)}
            />
          </Form.Group>
          <br/>
        </Form>
        <Link
          to='/login'
          className='CancelRequest'
        >
          <img src={CancelIcon} alt='cancel' style={{ width: '3rem' }} />
        </Link>
        <Button
          className='SendRequest'
          type = 'submit'
          variant= 'success'
          onClick={e => onSubmit(e)}
        >
          Send Email
        </Button>
      </div>
    </div>
  )
};


ResetRequest.propTypes = {
  setAlert: PropTypes.func.isRequired,
  resetRequest: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated });

// connect() is added to the export because of redux, 
// passes state as first param (mapStateToProps in this case), an object of any actions to pass as second param (setAlert, ResetRequest)
export default connect(mapStateToProps, { setAlert, resetRequest })(ResetRequest);