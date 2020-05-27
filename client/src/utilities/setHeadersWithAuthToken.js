// setHeadersWithAuthToken.js
// ****************************************************************************
// *****  client side -- client/src/utilities/setHeadersWithAuthToken.js  *****
// *****  Makes persistent an authorized user token during the session    *****
// *****  Utilizes localStorage to persist the token                      *****
// ****************************************************************************

import axios from 'axios'

// token passed from localStorage.token
const setHeadersWithAuthToken = token => {
  if ( token ) {
    axios.defaults.headers.common['x-auth-token'] = token
  } else {
    delete axios.defaults.headers.common['x-auth-token']
  }
}

export default setHeadersWithAuthToken