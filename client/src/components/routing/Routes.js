// Routes.js
//********************************************************
//*****  Client side -- client/frontend/src/routing/Routes.js *****
//*****  These are the client routes for the app     *****
//********************************************************

import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Landing from '../pages/Landing'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Weather from '../pages/Weather'
import Dining from '../pages/Dining'
import Attractions from '../pages/Attractions'
import Profiles from '../pages/Profiles'
import NotFound from '../pages/helpers/NotFound'
import PrivateRoute from './PrivateRoute'
import Alert from '../pages/helpers/Alert'

const Routes = () => {
  return (
    <section className = 'routes' >
      <Alert />
      <Switch >
        <Route exact path = '/landing' component = { Landing } /> 
        <Route exact path = '/register' component = { Register } /> 
        <Route exact path = '/login' component = { Login } /> 
        <PrivateRoute exact path = '/home' component = { Home } />
        <PrivateRoute exact path = '/weather' component = { Weather } /> 
        <PrivateRoute exact path = '/dining' component = { Dining } /> 
        <PrivateRoute exact path = '/attractions' component = { Attractions } /> 
        <PrivateRoute exact path = '/profiles' component = { Profiles } /> 
        <Route component = { NotFound } />
      </Switch> 
    </section> 
  )
}

export default Routes