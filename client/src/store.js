// store.js
// ******************************************************************
// *****  client side - client/src/store.js                     *****
// *****  This is where the redux store is created              *****
// *****  This is an app-level fuction (universally available)  *****
// *****  Breaking it down:                                     *****
// *****    rootReducer: combines all action reducers           *****
// *****    initialState: inialize to an empty object           *****
// *****    middleware: thunk composes the transformations      *****
// *****    createStore() the function that creates the store   *****
// *****    grab all the actions in the app (rootReducer)       *****
// *****    grab the initial state (initialState)               *****
// *****    massage 'em together (composeWithDevTools)          *****
// *****    voila -- you just created the app store             *****
// ******************************************************************

// node modules
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// local modules
import rootReducer from './redux/reducers';

// set the initial state to an empty object
const initialState = {};
// Thunk middleware allows you to write action creators that return a function.
const middleware = [thunk];
// create the redux store for the app (think: pantry for the kitchen, sort of)
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;