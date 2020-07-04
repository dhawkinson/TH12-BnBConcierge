// Logo.js
/***************************************************************/
/*****  Client side -- client/components/wrappper/Logo.js  *****/
/*****  This is the branding information for the Header    *****/
/***************************************************************/

import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import LogoIcon400 from '../../assets/icons/hlLogo400.png';

const Logo = ({ auth: { isAuthenticated, loading } }) => {

  return (
    <div className='Logo'>
      {!loading &&
        (isAuthenticated ?
        <Link to='/home'>
          <img className='logo-icon' src={LogoIcon400} alt='logo-icon' />
        </Link> :
        <Link to='/'>
          <img className='logo-icon' src={LogoIcon400} alt='logo-icon' />
        </Link>)
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



         