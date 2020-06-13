// loginButtons.js
/**************************************************************************/
/*****  Client side -- client/frontend/src/localStyles/loginButtons.js         *****/
/*****  This is local styling for the app (keeps components cleaner)  *****/
/**************************************************************************/

import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

// style the local button
const LocalButton = withStyles({
  root: {
    background: '#5cb85c',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: '3rem',
    padding: '0 2rem',
    boxShadow: '0 3px 5px 2px rgba(195, 185, 180, .3)',
    ariaLabel: 'local credential login',
    variant: 'contained'
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button)

// style the facebook button
const FacebookButton = withStyles({
  root: {
    background: '#3b5998',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: '3rem',
    padding: '0 2rem',
    boxShadow: '0 3px 5px 2px rgba(195, 185, 180, .3)',
    ariaLabel: 'facebook credential login',
    variant: 'contained'
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button)

// style the twitter button
const TwitterButton = withStyles({
  root: {
    background: '#00acee',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: '3rem',
    padding: '0 2rem',
    boxShadow: '0 3px 5px 2px rgba(195, 185, 180, .3)',
    ariaLabel: 'twitter credential login',
    variant: 'contained'
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button)

// style the register button
const RegisterButton = withStyles({
  root: {
    background: '#1DA1F2',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: '3rem',
    padding: '0 2rem',
    boxShadow: '0 3px 5px 2px rgba(195, 185, 180, .3)',
    ariaLabel: 'register user',
    variant: 'contained'
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button)

// style the menu button
const MenuButton = withStyles({
  root: {
    background: '#004d40',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: '3rem',
    padding: '0 2rem',
    ariaLabel: 'nav dropdown menu',
    variant: 'contained'
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button)

export { LocalButton, FacebookButton, TwitterButton, RegisterButton, MenuButton }