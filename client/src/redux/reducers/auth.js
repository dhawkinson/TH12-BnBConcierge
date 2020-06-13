// auth.js
// ***************************************************************
// *****  Client side -- client/src/redux/reducers/auth.js   *****
// *****  Auth Reducers - manages state on auth/user routes  *****
// ***************************************************************

// ********************************************************************
// *****  NOTE to self: re persistence of token via localStorage  *****
// *****                                                          *****
// *****  initialization: get value from localStorage if there    *****
// *****  USER_LOADED and default: no effect on localStorage      *****
// *****  REGISTER_SUCCESS: reset localStorge token from payload  *****
// *****  LOGIN_SUCCESS: same as REGISTER_SUCCESS                 *****
// *****  PASSWORD_RESET_SUCCESS: same as REGISTER_SUCCESS        *****
// *****  ALL other action types: remove token from localStorage  *****
// *****                                                          *****
// *****  This ensures: token is available to authenticate users  *****
// *****  and that no token lingers from a previous auth user     *****
// ********************************************************************

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
  ACCOUNT_DELETED
} from '../actions/types'

// initial state for authentication processes
// token = jsonwebtoken (persisted in localStorage)
// isAuthenticated = boolean flag reflecting whether or not the current user is authenticated
// loading = boolean flag reflecting whether or not a process is loading
// user = the current user (all the fields)
// emailuser = user requesting pw reset instructions (same as user but separated instance for clarity)
// pwEmailAddr = the email address to which password instructions will be sent
// pwEmailSent = boolean flag reflecting whether or not the password email has been sent

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  emailuser: null,
  pwEmailAddr: '',
  pwEmailSent: null
}

  // bring in the initial state then return the updated state 
  // (based on the action type)
export default (state = initialState, action) => {
  // destructure 'action': type = action type 
  // & payload = the the state change value
  const { type, payload } = action
  switch(type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case PASSWORD_RESET_SUCCESS:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      }
    case RESET_REQUESTED_SUCCESS:
      return {
        ...state,
        emailuser: payload.emailuser,
        pwEmailAddr: payload.email
      }
    case RESET_TOKEN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        pwEmailAddr: ''
      }
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case RESET_REQUESTED_FAIL:
    case RESET_TOKEN_FAIL:
    case PASSWORD_RESET_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        emailuser: null,
        pwEmailAddr: '',
        pwEmailSent: null
      }
    default:
    // no action -- return state as is
    return state
  }
}
