// ForecastDaily.js
//****************************************************************************
//*****  Client side -- client/src/components/segments/ForecastDaily.js  *****
//*****  This is the eight-day component of the Forecast Page            *****
//****************************************************************************

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

const ForecastDaily = ({ getForecast }) => {

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
    <div className='ForecastDaily mt-3 ml-3'>
      <h6 className='daily-head'>Eight Day Forecast</h6>
      <section className='DailyGrid box mt-3'>
        <span></span>
        <span></span>
        <span>Date</span>
        <span>Summary</span>
        <span>Icon</span>
        <span>Temperature</span>
        <span>Humidity</span>
        <span>Visibility</span>
        <span>Wind Speed</span>
        <span>Direction</span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span>Today</span>
        <span>`${forecast.daily[0].weather[0].main}`</span>
        <span><img src={`${baseImgUri}/${forecast.daily[0].weather[0].icon}.png`} alt='' /></span>
        <span>`${forecast.daily[0].temp}`</span>
        <span>`${forecast.daily[0].humidity}`</span>
        <span>`${forecast.daily[0].visibility}`</span>
        <span>`${forecast.daily[0].wind_speed}`</span>
        <span>{setWindDirection(forecast.daily[0].wind_deg)}</span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span><Moment parse='MM-DD'>`${forecast.daily[1].dt}`</Moment></span>
        <span>`${forecast.daily[1].weather[0].main}`</span>
        <span><img src={`${baseImgUri}/${forecast.daily[1].weather[0].icon}.png`} alt='' /></span>
        <span>`${forecast.daily[1].temp}`</span>
        <span>`${forecast.daily[1].humidity}`</span>
        <span>`${forecast.daily[1].visibility}`</span>
        <span>`${forecast.daily[1].wind_speed}`</span>
        <span>{setWindDirection(forecast.daily[1].wind_deg)}</span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span><Moment parse='MM-DD'>`${forecast.daily[2].dt}`</Moment></span>
        <span>`${forecast.daily[2].weather[0].main}`</span>
        <span><img src={`${baseImgUri}/${forecast.daily[2].weather[0].icon}.png`} alt='' /></span>
        <span>`${forecast.daily[2].temp}`</span>
        <span>`${forecast.daily[2].humidity}`</span>
        <span>`${forecast.daily[2].visibility}`</span>
        <span>`${forecast.daily[2].wind_speed}`</span>
        <span>{setWindDirection(forecast.daily[2].wind_deg)}</span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span><Moment parse='MM-DD'>`${forecast.daily[3].dt}`</Moment></span>
        <span>`${forecast.daily[3].weather[0].main}`</span>
        <span><img src={`${baseImgUri}/${forecast.daily[3].weather[0].icon}.png`} alt='' /></span>
        <span>`${forecast.daily[3].temp}`</span>
        <span>`${forecast.daily[3].humidity}`</span>
        <span>`${forecast.daily[3].visibility}`</span>
        <span>`${forecast.daily[3].wind_speed}`</span>
        <span>{setWindDirection(forecast.daily[3].wind_deg)}</span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span><Moment parse='MM-DD'>`${forecast.daily[4].dt}`</Moment></span>
        <span>`${forecast.daily[4].weather[0].main}`</span>
        <span><img src={`${baseImgUri}/${forecast.daily[4].weather[0].icon}.png`} alt='' /></span>
        <span>`${forecast.daily[4].temp}`</span>
        <span>`${forecast.daily[4].humidity}`</span>
        <span>`${forecast.daily[4].visibility}`</span>
        <span>`${forecast.daily[4].wind_speed}`</span>
        <span>{setWindDirection(forecast.daily[4].wind_deg)}</span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span><Moment parse='MM-DD'>`${forecast.daily[5].dt}`</Moment></span>
        <span>`${forecast.daily[5].weather[0].main}`</span>
        <span><img src={`${baseImgUri}/${forecast.daily[5].weather[0].icon}.png`} alt='' /></span>
        <span>`${forecast.daily[5].temp}`</span>
        <span>`${forecast.daily[5].humidity}`</span>
        <span>`${forecast.daily[5].visibility}`</span>
        <span>`${forecast.daily[5].wind_speed}`</span>
        <span>{setWindDirection(forecast.daily[5].wind_deg)}</span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span><Moment parse='MM-DD'>`${forecast.daily[6].dt}`</Moment></span>
        <span>`${forecast.daily[6].weather[0].main}`</span>
        <span><img src={`${baseImgUri}/${forecast.daily[6].weather[0].icon}.png`} alt='' /></span>
        <span>`${forecast.daily[6].temp}`</span>
        <span>`${forecast.daily[6].humidity}`</span>
        <span>`${forecast.daily[6].visibility}`</span>
        <span>`${forecast.daily[6].wind_speed}`</span>
        <span>{setWindDirection(forecast.daily[6].wind_deg)}</span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span><Moment parse='MM-DD'>`${forecast.daily[7].dt}`</Moment></span>
        <span>`${forecast.daily[7].weather[0].main}`</span>
        <span><img src={`${baseImgUri}/${forecast.daily[7].weather[0].icon}.png`} alt='' /></span>
        <span>`${forecast.daily[7].temp}`</span>
        <span>`${forecast.daily[7].humidity}`</span>
        <span>`${forecast.daily[7].visibility}`</span>
        <span>`${forecast.daily[7].wind_speed}`</span>
        <span>{setWindDirection(forecast.daily[7].wind_deg)}</span>
        <span></span>
        <span></span>
      </section>
    </div>
  );
}

const mapStateToProps = state => ({ forecast: state.forecast })

export default connect(mapStateToProps, { getForecast })(ForecastDaily);