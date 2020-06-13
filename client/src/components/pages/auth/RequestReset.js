// RequestReset.js
//***************************************************************************
//*****  Client side -- client/src/pages/auth/RequestReset.js           *****
//*****  This is the Request Password Reset Page (a modal) for the app  *****
//***************************************************************************

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { setAlert } from '../../../redux/actions/alert';
import { requestReset } from '../../../redux/actions/auth';
import CancelIcon from '../../../assets/icons/cancel.png';

// NOTE: this format of using the params is an ES6 destructure of props
const RequestReset = ({ setAlert, requestReset, isAuthenticated }) => {

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
    // call redux auth action - requestReset()
    requestReset(username, email);
  };

  return (
    <div className='page-content'>
      <Container>
        <Row className='request-reset'>
          <Col className='request-content' style={{ textAlign: 'center' }}>
            <h3 className='request-head'>Password Reset Request</h3>
            <p className='lead'>User Information</p>
            <Form 
              className='reset-request-form'
              onSubmit={e => onSubmit(e)}
              style={{ textAlign: 'center' }}
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
              <Form.Group controlId="formBasicEmail" className='auth-entry'>
                <Form.Control 
                    type="text" 
                    placeholder="Email address" 
                    name="email" 
                    value={email}
                    onChange={e => onChange(e)}
                  />
              </Form.Group>
              <small className="form-text">
                Only used to send you password reset instructions.
              </small>
              <small className="form-text">
                Email addresses are not stored anywhere.
              </small>
              <small className="form-text">
                Click 'Send...' below then watch email for instructions.
              </small>
              <br />
            </Form>
            <Link to='/login'><img className='cancel-icon' src={CancelIcon} alt='cancel' style={{ width: '3rem' }} />{'   '}</Link>
            <Button
              className='btn btn-request'
              type = 'submit'
              variant= 'success'
              onClick={e => onSubmit(e)}
            >
              Send Reset Instructions
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
};


RequestReset.propTypes = {
  setAlert: PropTypes.func.isRequired,
  requestReset: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated })

// connect() is added to the export because of redux, 
// passes state as first param (mapStateToProps in this case), an object of any actions to pass as second param (setAlert, requestReset)
export default connect( mapStateToProps, { setAlert, requestReset } )(RequestReset)