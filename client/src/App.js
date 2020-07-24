// App.js
// ****************************************************
// ***** client side - src/App.js                 *****
// ***** This is the App wrapper for the frontend *****
// ****************************************************

// node modules
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css';

// local modules
import store from './store'
import { loadUser } from './redux/actions/auth'
import setHeadersWithAuthToken from './utilities/setHeadersWithAuthToken';

import Header from './components/wrapper/Header';
import Footer from './components/wrapper/Footer';
import Routes from './components/routing/Routes';

import './styling/App.css';
import './styling/Grid.css';
import './styling/Media.css';

require ('dotenv').config();

// check for token in localStorage and bring it back if there
// this is how the app determines if we have an authenticated user or not
if (localStorage.token) {
  // if token found, pass it so it can be updated to axios global headers
  setHeadersWithAuthToken(localStorage.token);
}

const App = () => {
  // run an effect and clean it up only once (on mount and unmount), pass an empty array ([]) as a second argument.
  // this eliminates the need for utilizing the redux connect
  useEffect(() => { store.dispatch(loadUser()) }, []);

  // NOTE to self: <Provider> is the linkage between React and Redux; store is the intersection
  return ( 
    <Provider store={store} >
      <Router >
        <>
          <Header />
          <Route component={Routes} /> 
          <Footer />
        </> 
      </Router>
    </Provider>
  )
}

export default App;