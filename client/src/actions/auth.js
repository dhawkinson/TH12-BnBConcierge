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
  LOGOUT,
  CLEAR_FAVORITE
} from './types';
// import auth from '../config/auth';
// import setHeadersWithAuthToken from '../utilities/setHeadersWithAuthToken';
import keys from '../config/keys';

// if NOT production set value for proxy URL else ''
let proxyUrl;
process.env.NODE_ENV !== 'production' ? proxyUrl = keys.proxyUrl : proxyUrl = '';
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
  // if (localStorage.token) {
  //   // if token found, pass it
  //   setHeadersWithAuthToken(localStorage.token);
  // };

  try {
    // get the user
    const res = await axios.get(`${proxyUrl}/api/auth`);
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
    const res = await axios.post(`${proxyUrl}/api/users`, body, heads);
    // set the SUCCESS action & place the data (token) in the payload
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser())
  } catch (err) {
    // alert if errors
    console.log('ERR ', err)
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
export const loginLocal = (email, password) => async dispatch => {
  // body contains the form input
  const body = JSON.stringify({ email, password });

  try {
    // post the data to the DB
    const res = await axios.post(`/api/auth/login`, body, heads);
    // set the SUCCESS action & place the data in the payload
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser())
  } catch (err) {
    // alert is errors
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

// ******************************************************************************
// ***** Logout User - Clear Profile for the next user                      *****
// *****              matches to: server/routes/api/router.delete('/auth')  *****
// *****              & client/src/reducers/auth.js, case  LOGOUT           *****
// ******************************************************************************
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_FAVORITE });
  dispatch({ type: LOGOUT });
};