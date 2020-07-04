// Routes.js
//********************************************************
//*****  Client side -- client/frontend/src/routing/Routes.js *****
//*****  These are the client routes for the app     *****
//********************************************************

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Landing from '../pages/auth/Landing';
import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
import RequestReset from '../pages/auth/ResetRequest';
import ResetPassword from '../pages/auth/ResetPassword';
import Home from '../pages/functional/Home';
import Weather from '../pages/functional/Weather';
import Dining from '../pages/functional/Dining';
import Activities from '../pages/functional/Activities';
import Favorites from '../pages/functional/Favorites';
import About from '../pages/functional/About';
import NotFound from '../../components/helpers/NotFound';
import Alert from '../../components/helpers/Alert';
import PrivateRoute from './PrivateRoute';

const Routes = () => {
  return (
    <section className='routes' >
      <Alert />
      <Switch >
        <Route exact path='/' component={Landing} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/resetRequest' component={RequestReset} />
        <Route exact path='/resetPassword' component={ResetPassword} />
        <PrivateRoute exact path='/home' component={Home} />
        <PrivateRoute exact path='/weather' component={Weather} />
        <PrivateRoute exact path='/dining' component={Dining} />
        <PrivateRoute exact path='/activities' component={Activities} />
        <PrivateRoute exact path='/favorites' component={Favorites} />
        <PrivateRoute exact path='/about' component={About} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;