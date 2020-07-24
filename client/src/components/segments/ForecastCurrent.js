// ForecastCurrent.js
//******************************************************************************
//*****  Client side -- client/src/components/segments/ForecastCurrent.js  *****
//*****  This is the current component of the Forecast Page                *****
//******************************************************************************

// node modules
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

// local modules
import { getForecast } from '../../redux/actions/forecast'

const setWindDirection = (windDegrees) => {

  // ***** get wind direction abbreviation for current and daily degrees
  const degrees = [11, 33, 56, 78, 101, 123, 146, 168, 191, 213, 236, 258, 281, 303, 326, 348, 360]
  const abbrev = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N']

  let found = false;
  let i = 0
  while (!found) {
    if (windDegrees > degrees[i]) {
      i++;
    } else {
      found = true;
    }
  }
  return abbrev[i];
}

const ForecastCurrent = ({ getForecast }) => {

  const [forecast, setForecast] = useState( null )

  useEffect(() => {
    var original = Promise.resolve(getForecast);
    var cast = Promise.resolve(original);
    cast.then(function(value) {
      console.log('value: ' + value);
      setForecast(value)
    });
  });

  const baseImgUri = '../../assets/icons/';

  return (
    <div className='ForecastCurrent mt-3 ml-3'>
      <h6 className='current-head'>Current Conditions</h6>
      <section className='CurrentGrid box mt-3'>
        <span>Now</span>
        <span>Summary</span>
        <span>Icon</span>
        <span>Temperature</span>
        <span>Humidity</span>
        <span>Visibility</span>
        <span>Wind Speed</span>
        <span>Direction</span>
        <span><Moment parse='HH:mm'>`${forecast.current.dt}`</Moment></span>
        <span>{forecast.current.weather[0].main}</span>
        <span><img src={`${baseImgUri}/${forecast.current.weather[0].icon}.png`} alt='' /></span>
        <span>{forecast.current.temp}</span>
        <span>{forecast.current.humidity}</span>
        <span>{forecast.current.visibility}</span>
        <span>{forecast.current.wind_speed}</span>
        <span>{setWindDirection(forecast.current.wind_deg)}</span>
      </section>
    </div>
  );
}

const mapStateToProps = state => ({ forecast: state.forecast })

export default connect(mapStateToProps, { getForecast })(ForecastCurrent);