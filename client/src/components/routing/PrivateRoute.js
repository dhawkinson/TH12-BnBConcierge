// PrivateRoute.js -- routing (client-side)
// manages private routing for authenticated users.

import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const PrivateRoute = ({
  component: Component,
  auth: {
    isAuthenticated,
    loading
  },
  ...rest
}) => ( 
  <Route { ...rest }
    render = { props => 
      !isAuthenticated && !loading ? ( 
        <Redirect to = '/login' />      //  not an authenticated user, redirect to login
      ) : ( 
        <Component { ...props } />      //  is an authenticated user, proceed to desired route
      ) 
    } 
  />
)

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)