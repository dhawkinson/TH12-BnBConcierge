// alert.js
// *******************************************************************
// *****  Client side -- client/src/redux/reducers/alert.js      *****
// *****  Alert Reducers - manages state on alerts               *****
// *****  Breaking it down:                                      *****
// *****        Set the initialState ( the default )             *****
// *****        Then, for each action dispatched to the reducer  *****
// *****        destucture the action into the;                  *****
// *****        type -- (what is happening)                      *****
// *****        payload -- (the resulting data)                  *****
// *****        then reset the state (for passing as props)      *****
// *******************************************************************

import { SET_ALERT, REMOVE_ALERT } from '../actions/types'

// set initial state for alerts
// the empty array indicates no alerts
const initialState = []

export default (state = initialState, action) => {
  // destructure the action -- 'type' is the type, 'payload' is the data (in this case the id of the alert)
  const { type, payload } = action
  
  // evaluate the type
  switch(type) {
    case SET_ALERT:
      // add the alert to the existing state
      return [...state, payload]
      case REMOVE_ALERT:
        // remove an alert of the specific id
        return state.filter(alert => alert.id !== payload)
      default:
        // no action -- return state as is
        return state
    
  }
}