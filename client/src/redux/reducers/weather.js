// weather.js
// *******************************************************************
// *****  Client side -- client/src/redux/reducers/weather.js    *****
// *****  Functional Reducers - manages state on weather routes  *****
// *****  Breaking it down:                                      *****
// *****        Set the initialState ( the default )             *****
// *****        Then, for each action dispatched to the reducer  *****
// *****        destucture the action into the;                  *****
// *****        type -- (what is happening)                      *****
// *****        payload -- (the resulting data)                  *****
// *****        then reset the state (for passing as props)      *****
// *******************************************************************

import { 
  GET_FORECAST,
  FORECAST_ERROR,
 } from '../actions/types'

const initialState = {
  forecast: null,
  loading: true
}

export default (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_FORECAST:
      return {
        ...state,
        forecast: payload,
        loading: false
      }
    case FORECAST_ERROR:
      return {
        ...state,
        forecast: null,
        loading: false
      }
    default:
      return state
  }
}