// authLinks.js
/**********************************************************************/
/*****  Client side -- client/components/navigation/authLinks.js  *****/
/*****  This is the nav-list of options for authenticated users   *****/
/**********************************************************************/

import React from 'react'
// import { Redirect } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'

import HomeIcon from  '../../assets/icons/nav-home.png'
import MenuIcon from '../../assets/icons/nav-home.png'
import LogoutIcon from  '../../assets/icons/nav-logout.png'

// import { logout } from '../../actions/auth'

export default function AuthLinks() {
  // const [anchorEl, setAnchorEl] = React.useState(null)

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget)
  // }

  // const handleClose = () => {
  //   setAnchorEl(null)
  // }

  return (
    <div className='links auth-links'>
      <a href='/home'>
        <img className='home' src={HomeIcon} alt='home' style={{ maxWidth: '20px' }} />
        <span className='label login-label hide-sm' color='#f5f5f5'>{' '}Home</span>
      </a>
      <span>
        <Nav.Link.Toggle>{ MenuIcon }</Nav.Link.Toggle>
        <Nav.Link.Menu>
          <Nav.Link.Item href='/weather'>Weather</Nav.Link.Item>
          <Nav.Link.Item href='/dining'>Dining</Nav.Link.Item>
          <Nav.Link.Item href='/attractions'>Attractions</Nav.Link.Item>
          <Nav.Link.Item href='/profiles'>Profiles</Nav.Link.Item>
          <Nav.Link.Item href='/about'>About</Nav.Link.Item>
        </Nav.Link.Menu>
      </span>
      <Nav.Link href='/landing'>
        <img className='logout' src={LogoutIcon} alt='logout' style={{ maxWidth: '20px' }} />
        <span className='label logout-label hide-sm' color='#f5f5f5'>{' '}Logout</span>
      </Nav.Link>
    </div>
  )
}
