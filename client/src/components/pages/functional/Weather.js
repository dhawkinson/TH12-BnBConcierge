// Weather.js
//******************************************************************************
//*****  Client side -- client/src/components/pages/functional/Weather.js  *****
//*****  This is the client Weather Page for the app                       *****
//******************************************************************************

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import Spinner from '../../helpers/Spinner'
import { getWeather } from '../../../redux/actions/weather'

const Weather = ({ getWeather, weather: { forecast, loading } }) => {

  // upon load - excute useEffect() only once -- loads forecast into state
  useEffect(() => { getWeather(); }, [getWeather])
  
  return (
    <div id='page-container'>
      <div id='content-wrap' className='Weather'>
        { loading ?
          <Spinner /> :
          <>
            <div className='WeatherHead box mt-3'>
              <h4 className='report-head'>Weather Report</h4>
            </div>
            {/* Current Weather Conditions */}
            <h6 className='current-head'>Current Conditions</h6>
            <section className='CurrentlyGrid box mt-3'>
              <span>Now</span>
              <span>Summary</span>
              <span>Icon</span>
              <span>Precip</span>
              <span>Temp</span>
              <span>Humid</span>
              <span>Visblty</span>
              <span>Wind Spd</span>
              <span><Moment parse='HH:mm'>`${forecast.currently.time}`</Moment></span>
              <span>`${forecast.currently.summary}`</span>
              <span>`${forecast.currently.icon}`</span>
              <span>`${forecast.currently.precipProbability}`</span>
              <span>`${forecast.currently.temperature}`</span>
              <span>`${forecast.currently.humidity}`</span>
              <span>`${forecast.currently.visibility}`</span>
              <span>`${forecast.currently.windSpeed}`</span>
            </section>
            {/* Eight Day Forecast */}
            <h6 className='daily-head'>Eight Day Forecast</h6>
            <section className='DailyGrid box mt-3'>
              <span>Date</span>
              <span>Summary</span>
              <span>Icon</span>
              <span>Precip</span>
              <span>Temp</span>
              <span>Humid</span>
              <span>Visblty</span>
              <span>Wind Spd</span>
              <span><Moment parse='MM-DD'>`${forecast.daily.data[0].time}`</Moment></span>
              <span>`${forecast.daily[0].summary}`</span>
              <span>`${forecast.daily[0].icon}`</span>
              <span>`${forecast.daily[0].precipProbability}`</span>
              <span>`${forecast.daily[0].temperature}`</span>
              <span>`${forecast.daily[0].humidity}`</span>
              <span>`${forecast.daily[0].visibility}`</span>
              <span>`${forecast.daily[0].windSpeed}`</span>
              <span><Moment parse='MM-DD'>`${forecast.daily[1].time}`</Moment></span>
              <span>`${forecast.daily[1].summary}`</span>
              <span>`${forecast.daily[1].icon}`</span>
              <span>`${forecast.daily[1].precipProbability}`</span>
              <span>`${forecast.daily[1].temperature}`</span>
              <span>`${forecast.daily[1].humidity}`</span>
              <span>`${forecast.daily[1].visibility}`</span>
              <span>`${forecast.daily[1].windSpeed}`</span>
              <span><Moment parse='MM-DD'>`${forecast.daily[2].time}`</Moment></span>
              <span>`${forecast.daily[2].summary}`</span>
              <span>`${forecast.daily[2].icon}`</span>
              <span>`${forecast.daily[2].precipProbability}`</span>
              <span>`${forecast.daily[2].temperature}`</span>
              <span>`${forecast.daily[2].humidity}`</span>
              <span>`${forecast.daily[2].visibility}`</span>
              <span>`${forecast.daily[2].windSpeed}`</span>
              <span><Moment parse='MM-DD'>`${forecast.daily[3].time}`</Moment></span>
              <span>`${forecast.daily[3].summary}`</span>
              <span>`${forecast.daily[3].icon}`</span>
              <span>`${forecast.daily[3].precipProbability}`</span>
              <span>`${forecast.daily[3].temperature}`</span>
              <span>`${forecast.daily[3].humidity}`</span>
              <span>`${forecast.daily[3].visibility}`</span>
              <span>`${forecast.daily[3].windSpeed}`</span>
              <span><Moment parse='MM-DD'>`${forecast.daily[4].time}`</Moment></span>
              <span>`${forecast.daily[4].summary}`</span>
              <span>`${forecast.daily[4].icon}`</span>
              <span>`${forecast.daily[4].precipProbability}`</span>
              <span>`${forecast.daily[4].temperature}`</span>
              <span>`${forecast.daily[4].humidity}`</span>
              <span>`${forecast.daily[4].visibility}`</span>
              <span>`${forecast.daily[4].windSpeed}`</span>
              <span><Moment parse='MM-DD'>`${forecast.daily[5].time}`</Moment></span>
              <span>`${forecast.daily[5].summary}`</span>
              <span>`${forecast.daily[5].icon}`</span>
              <span>`${forecast.daily[5].precipProbability}`</span>
              <span>`${forecast.daily[5].temperature}`</span>
              <span>`${forecast.daily[5].humidity}`</span>
              <span>`${forecast.daily[5].visibility}`</span>
              <span>`${forecast.daily[5].windSpeed}`</span>
              <span><Moment parse='MM-DD'>`${forecast.daily[6].time}`</Moment></span>
              <span>`${forecast.daily[6].summary}`</span>
              <span>`${forecast.daily[6].icon}`</span>
              <span>`${forecast.daily[6].precipProbability}`</span>
              <span>`${forecast.daily[6].temperature}`</span>
              <span>`${forecast.daily[6].humidity}`</span>
              <span>`${forecast.daily[6].visibility}`</span>
              <span>`${forecast.daily[6].windSpeed}`</span>
              <span><Moment parse='MM-DD'>`${forecast.daily[7].time}`</Moment></span>
              <span>`${forecast.daily[7].summary}`</span>
              <span>`${forecast.daily[7].icon}`</span>
              <span>`${forecast.daily[7].precipProbability}`</span>
              <span>`${forecast.daily[7].temperature}`</span>
              <span>`${forecast.daily[7].humidity}`</span>
              <span>`${forecast.daily[7].visibility}`</span>
              <span>`${forecast.daily[7].windSpeed}`</span>
            </section>
          </>
        }
      </div>
    </div>
  );
};

Weather.propTypes = {
  getWeather: PropTypes.func.isRequired,
  weather: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ forecast: state.forecast });

export default connect( mapStateToProps, { getWeather } )(Weather);