// authLinks.js
/**********************************************************************/
/*****  Client side -- client/components/navigation/authLinks.js  *****/
/*****  This is the nav-list of options for authenticated users   *****/
/**********************************************************************/

import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
// import { Redirect } from 'react-router-dom';

import HomeIcon from '../../assets/icons/nav-home.png';
import WeatherIcon from '../../assets/icons/nav-weather.png';
import DiningIcon from '../../assets/icons/nav-dining.png';
import AttractionIcon from '../../assets/icons/nav-mountain-bike.png';
import FavoriteIcon from '../../assets/icons/nav-favorites.png';
import AboutIcon from '../../assets/icons/nav-about.png';
import LogoutIcon from '../../assets/icons/nav-logout.png';

// import { logout } from '../../actions/auth';

const  AuthLinks = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className='links auth-links'>
      <Link to='/home'>
        <img className='home' src={HomeIcon} alt='home' style={{ maxWidth: '20px' }} />
        <span className='label login-label hide-sm' color='#f5f5f5'>{' '}Home</span>
      </Link>
      <span>
        {/* <Nav.Link.Toggle>{ MenuIcon }</Nav.Link.Toggle>
        <Nav.Link.Menu>
          <Nav.Link.Item href='/weather'>Weather</Nav.Link.Item>
          <Nav.Link.Item href='/dining'>Dining</Nav.Link.Item>
          <Nav.Link.Item href='/attractions'>Attractions</Nav.Link.Item>
          <Nav.Link.Item href='/favorites'>Favorites</Nav.Link.Item>
          <Nav.Link.Item href='/about'>About</Nav.Link.Item>
        </Nav.Link.Menu> */}
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          startIcon={<MenuIcon />}
        >
          Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>
            <Link to='/weather'>
              <img className='icon weather' src={WeatherIcon} alt='weather' />
              <span className='label weather d-none d-md-inline'>{' '}Weather</span>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to='/dining'>
              <img className='icon dining' src={DiningIcon} alt='dining' />
              <span className='label dining d-none d-md-inline'>{' '}Dining</span>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to='/attractions'>
              <img className='icon attractions' src={AttractionIcon} alt='attractions' />
              <span className='label attractions d-none d-md-inline'>{' '}Attractions</span>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to='/favorites'>
              <img className='icon favorites' src={FavoriteIcon} alt='favorites' />
              <span className='label favorites d-none d-md-inline'>{' '}Favorites</span>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to='/about'>
              <img className='icon about' src={AboutIcon} alt='about' />
              <span className='label about d-none d-md-inline'>{' '}About</span>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to='/logout'>
              <img className='icon logout' src={LogoutIcon} alt='logout' />
              <span className='label logout d-none d-md-inline'>{' '}Logout</span>
            </Link>
          </MenuItem>
        </Menu>
      </span>
    </div>
  )
}

export default AuthLinks;