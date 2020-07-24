// forecast.js
// *******************************************************************
// *****  Client side -- client/src/redux/reducers/forecast.js   *****
// *****  Forecast Reducers - manages state on forecast routes   *****
// *****  Breaking it down:                                      *****
// *****        Set the initialState ( the default )             *****
// *****        Then, for each action dispatched to the reducer  *****
// *****        destucture the action into the;                  *****
// *****        type -- (what is happening)                      *****
// *****        payload -- (the resulting data)                  *****
// *****        then reset the state (for passing as props)      *****
// *******************************************************************

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
  GET_FORECAST, 
  FORECAST_ERROR
} from '../actions/types'

const initialState = {
  forecast: null
}

// bring in the initial state then return the updated state 
// (based on the action type)
export default (state = initialState, action) => {
  // destructure 'action': type = action type 
  // & payload = the the state change value
  const { type, payload } = action
  switch(type) {
    case GET_FORECAST:
      return {
        ...state,
        forecast: payload
      }
    case FORECAST_ERROR:
      return {
        ...state,
        forecast: null
      }
    default:
    // no action -- return state as is
    return state
  }
}
