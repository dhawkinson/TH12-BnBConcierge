// auth.js
// ***************************************************************
// *****  Client side -- client/src/reducers/auth.js         *****
// *****  Auth Reducers - manages state on auth/user routes  *****
// ***************************************************************

// ********************************************************************
// *****  NOTE to self: re persistence of token via localStorage  *****
// *****                                                          *****
// *****  initialization: get value from localStorage if there    *****
// *****  USER_LOADED and default: no effect on localStorage      *****
// *****  REGISTER_SUCCESS: reset localStorge token from payload  *****
// *****  LOGIN_SUCCESS: same as REGISTER_SUCCESS                 *****
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
  LOGOUT,
  ACCOUNT_DELETED
} from '../actions/types'

// initialize state for register process
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
}

export default function(state = initialState, action) {
  // destructure 'action'
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
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      }
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      }
    default:
    // no action -- return state as is
    return state
  }
}
