// store.js
// ******************************************************************
// *****  client side - client/src/store.js                     *****
// *****  This is where the redux store is created              *****
// *****  This is an app-level fuction (universally available)  *****
// ******************************************************************

// node modules
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// local modules
import rootReducer from './redux/reducers';

// set the initial state to an empty object
const initialState = {};
// Redux Thunk middleware allows you to write action creators that return a function instead of an action.
const middleware = [thunk];
// create the redux store for the app (think: pantry for the kitchen, sort of)
const store = createStore(
  rootReducer,                                          // grab the root reducer (combination of all reducers)
  initialState,                                         // grab the initial state
  composeWithDevTools(applyMiddleware(...middleware))   // put it all together with Thunk
);

export default store;