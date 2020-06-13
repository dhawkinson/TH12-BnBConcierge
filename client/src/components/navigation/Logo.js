// Branding.js
/*********************************************************************/
/*****  Client side -- client/components/navigation/Branding.js  *****/
/*****  This is the branding information for the Navbar          *****/
/*********************************************************************/

import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import LogoIcon from '../../assets/icons/hlLogo450.png'

const Logo = ({ auth: { isAuthenticated, loading } }) => {
  return (
    <div className='logo'>
      {!loading &&
        ( isAuthenticated ? <Link to='/home'><img className='logo-icon' src={LogoIcon} alt='logo-icon' /></Link> : <Link to='/'><img className='logo-icon' src={LogoIcon} alt='logo-icon' /></Link> )
      }
     
    </div>
  )
}

Logo.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(Logo)



         