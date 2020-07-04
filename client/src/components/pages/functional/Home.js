// Landing.js
/*****************************************************************/
/*****  Client side -- client/frontend/src/pages/Landing.js  *****/
/*****  This is the client Landing Page for the app.         *****/
/*****  It is the first page the user sees.                  *****/
/*****************************************************************/

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';

import SeattleWeather from '../../../assets/images/seattleWeather.jpg';
import SeattleRestaurant from '../../../assets/images/seattleRestaurant.jpeg';
import SeattleActivity from '../../../assets/images/hiker.jpeg';
import Favorites from '../../../assets/images/fremont-troll.jpg';

const Home = ({ isAuthenticated }) => {

  // Redirect if not logged in
  if (!isAuthenticated) {
    return <Redirect to='/' />;
  };

  return (
    <div id='page-container'>
      <div id='content-wrap' className='Home'>
        <div className='WeatherImage caption'>
          <img src={SeattleWeather} alt='weather' />
          <div className='text weather'>
            <h2 className='image-head'>Weather</h2>
            <h4 className='image-message'>Dress right for going out!</h4>
          </div>
        </div>
        <div className='DiningImage caption'>
          <img src={SeattleRestaurant} alt='dining' />
          <div className='text dining'>
            <h2 className='image-head'>Dining</h2>
            <h4 className='image-message'>Find a restaurant you will enjoy!</h4>
          </div>
        </div>
        <div className='ActivitiesImage caption'>
          <img src={SeattleActivity} alt='activities' />
          <div className='text activities'>
            <h2 className='image-head'>Activities</h2>
            <h4 className='image-message'>Got any spare time? Have fun!</h4>
          </div>
        </div>
        <div className='FavoritesImage caption'>
          <img src={Favorites} alt='favorites' />
          <div className='text favorites'>
            <h2 className='image-head'>Favorites</h2>
            <h4 className='image-message'>Found something you like? Save it!</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

Home.propTypes = { isAuthenticated: PropTypes.bool, }

const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated })

export default connect(mapStateToProps)(Home)