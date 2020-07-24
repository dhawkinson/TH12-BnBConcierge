// index.js -- reducers (client-side)
// ****************************************************************************************
// *****  client side -- client/src/redux/reducers/index.js                           *****
// *****  Combine all reducers here, master control for reducers                      *****
// *****  Note that any reducer not added here will not show in the Redux devtools    *****
// *****  DEVELOPER NOTE: The order of module creation could be:                      *****
// *****     1. Add the "genre" reducer (alert, etc.) to root reducer (index.js)      *****
// *****     2. Add the appropriate action(s) to the redux actions folder by "genre"  *****
// *****     3. Add the required component(s) that call the redux actions             *****
// ****************************************************************************************

import { combineReducers } from 'redux'

import alert from './alert'
import auth from './auth'
import forecast from './forecast'

export default combineReducers({
  alert,
  auth,
  forecast
})
