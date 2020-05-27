// App.js
// ****************************************************
// ***** client side - src/App.js                 *****
// ***** This is the App wrapper for the frontend *****
// ****************************************************

// node modules
import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

// local modules
import store from './store'
import { loadUser } from './actions/auth'
// import setHeadersWithAuthToken from './utilities/setHeadersWithAuthToken'
import Navbar from './components/navigation/Navbar'
import Landing from './components/pages/Landing'
import Routes from './components/routing/Routes'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// check for token in localStorage and bring it back if there
// this is how the app determines if we have an authenticated user or not
// if (localStorage.token) {
//   setHeadersWithAuthToken(localStorage.token)
// }

const App = () => {
  // run an effect and clean it up only once (on mount and unmount), pass an empty array ([]) as a second argument.
  useEffect(() => { store.dispatch(loadUser()) }, [])

  return ( 
    <Provider store={store} >
      <Router >
        <Fragment>
          <Navbar />
            <Switch>
              <Route exact path = '/' component = { Landing } /> 
              <Route component={ Routes } />
            </Switch>
        </Fragment> 
      </Router>
    </Provider>
  )
}
export default App