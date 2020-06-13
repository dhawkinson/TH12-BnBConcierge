// App.js
// ****************************************************
// ***** client side - src/App.js                 *****
// ***** This is the App wrapper for the frontend *****
// ****************************************************

// node modules
import React, { Fragment, useEffect } from 'react'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

// local modules
import store from './store'
import { loadUser } from './redux/actions/auth'
import setHeadersWithAuthToken from './utilities/setHeadersWithAuthToken';

import Navbar from './components/navigation/Navbar';
import Routes from './components/routing/Routes';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// check for token in localStorage and bring it back if there
// this is how the app determines if we have an authenticated user or not
if (localStorage.token) {
  // if token found, pass it so it can be updated to axios global headers
  setHeadersWithAuthToken(localStorage.token);
}

const App = () => {
  // run an effect and clean it up only once (on mount and unmount), pass an empty array ([]) as a second argument.
  useEffect(() => { store.dispatch(loadUser()) }, []);

  // NOTE to self: <Provider> is the linkage between React and Redux; store is the intersection
  return ( 
    <Provider store={store} >
      <Router >
        <Fragment>
          <Navbar />
          <Route component={ Routes } /> 
        </Fragment> 
      </Router>
    </Provider>
  )
}
export default App;