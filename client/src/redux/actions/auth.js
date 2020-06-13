// auth.js
//******************************************************************
//*****  Client side - client/src/actions/auth.js              *****
//*****  Defines what actions can be performed on auth routes  *****
//******************************************************************

// node modules
import axios from 'axios';

// local modules
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  RESET_REQUESTED_SUCCESS,
  RESET_REQUESTED_FAIL,
  RESET_TOKEN_SUCCESS,
  RESET_TOKEN_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  LOGOUT,
  CLEAR_FAVORITE
} from './types';
import setHeadersWithAuthToken from '../../utilities/setHeadersWithAuthToken';

// heads defines the headers for axios posts
const heads = {
  headers: {
    'Content-Type': 'application/json'
  }
};

// *******************************************************************
// *****  Load User -- validate that we have an authorized user  *****
// *****  matches to: server/routes/api/auth GET api/auth        *****
// *****              & src/reducers/auth.js/USER_LOADED         *****
// *******************************************************************
export const loadUser = () => async dispatch => {
  // check for token in localStorage
  if (localStorage.token) {
    // if token found, pass it so it can be updated to axios global headers
    setHeadersWithAuthToken(localStorage.token);
  };

  try {
    // get the user
    const res = await axios.get(`/api/auth`);
    // SUCCESS - set the action to USER_LOADED & pass the payload
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    // FAIL - set the action AUTH_ERROR, no payload to pass
    // NOTE: this also fails on the very first pass of starting the app
    //       this is because there is no user yet so USER_LOADED will fail
    dispatch({
      type: AUTH_ERROR
    });
  };
};

// **********************************************************************************
// *****  Register User -- create (not login) a user that may be authenticated  *****
// *****  matches to: server/routes/api/users, POST api/users                   *****
// *****       & client/src/reducers/auth.js, case REGISTER_SUCCESS             *****
// **********************************************************************************
export const register = ({ username, password }) => async dispatch => {
  // body contains the form input
  const body = JSON.stringify({ username, password });
  try {
    // post the data to the DB
    const res = await axios.post(`/api/users`, body, heads);
    // set the SUCCESS action & place the data (token) in the payload
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser())
  } catch (err) {
    // alert if errors
    const errors = err.response.data.errors;
    // const errors = err
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    };
    // set the FAIL action (we have no payload)
    dispatch({
      type: REGISTER_FAIL
    });
  };
};

// **********************************************************************************
// *****  Login User, local -- login (not create) an eligible user              *****
// *****              matches to: server/routes/api/auth/router.post('/local')  *****
// *****              & client/src/reducers/auth.js, case LOGIN_SUCCESS         *****
// **********************************************************************************
export const login = (username, password) => async dispatch => {
  // body contains the form input
  const body = JSON.stringify({ username, password });

  try {
    // post the data to the DB
    const res = await axios.post(`/api/auth`, body, heads);
    // set the SUCCESS action & place the data in the payload
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser())
  } catch (err) {
    // alert if errors
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    };
    // set the FAIL action (we have no payload)
    dispatch({
      type: LOGIN_FAIL
    });
  };
};

// *************************************************************************************
// *****  Request Reset -- request password reset & send reset email               *****
// *****              matches to: server/routes/api/auth/router.get('/forgot')     *****
// *****              & client/src/reducers/auth.js, case RESET_REQUESTED_SUCCESS  *****
// *************************************************************************************
export const requestReset = (username, email) => async dispatch => {
  // body contains the form input
  const body = JSON.stringify({ username, email });
  try {
    // post the data to the DB
    const res = await axios.post(`/api/auth/requestReset`, body, heads);
    console.log('RESET REQUEST ACTION res ', res);
    // set the SUCCESS action & place the data in the payload
    dispatch({
      type: RESET_REQUESTED_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser())
  } catch (err) {
    // alert if errors
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    };
    // set the FAIL action (we have no payload)
    dispatch({
      type: RESET_REQUESTED_FAIL
    });
  };
};

// *********************************************************************************
// *****  Validate Token, instructions returned, validate token                *****
// *****              matches to: server/routes/api/auth/validateToken/:token  *****
// *****              & client/src/reducers/auth.js, case RESET_TOKEN_SUCCESS  *****
// *********************************************************************************
export const validateToken = (token) => async dispatch => {
  // body contains the form input
  const body = JSON.stringify({ token });

  try {
    // post the data to the DB
    const res = await axios.get(`/api/auth/validateToken/:token`, body, heads);
    // set the SUCCESS action & place the data in the payload
    dispatch({
      type: RESET_TOKEN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser())
  } catch (err) {
    // alert if errors
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    };
    // set the FAIL action (we have no payload)
    dispatch({
      type: RESET_TOKEN_FAIL
    });
  };
};

// auth.js
// *************************************************************************************
// *****  Reset Password, token validated enter and put reset password             *****
// *****              matches to: server/routes/api/auth/router.put/resetPassword  *****
// *****              & client/src/reducers/auth.js, case LOGIN_SUCCESS            *****
// *************************************************************************************
export const resetPassword = (username, password) => async dispatch => {
  // body contains the form input
  const body = JSON.stringify({ username, password });

  try {
    // put the reset password to the DB
    const res = await axios.put(`/api/auth/resetPassword`, body, heads);
    // set the SUCCESS action & place the data in the payload
    dispatch({
      type: PASSWORD_RESET_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser())
  } catch (err) {
    // alert if errors
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    };
    // set the FAIL action (we have no payload)
    dispatch({
      type: PASSWORD_RESET_FAIL
    });
  };
};

// ******************************************************************************
// ***** Logout User - Clear Profile for the next user                      *****
// *****              matches to: server/routes/api/router.delete('/auth')  *****
// *****              & client/src/reducers/auth.js, case  LOGOUT           *****
// ******************************************************************************
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_FAVORITE });
  dispatch({ type: LOGOUT });
};