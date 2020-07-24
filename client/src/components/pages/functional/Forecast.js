// Forecast.js
// ******************************************************************************
// *****  Client side -- client/src/components/pages/functional/Forecast.js *****
// *****  This is the client Weather Page for the app                       *****
// *****  NOTE: Assumes the use of openweathermap.org API                   *****
// *****        All weather unit mesurements are converted to imperial      *****
// ******************************************************************************

// node modules
import React from 'react';

// local modules
import ForecastCurrent from '../../segments/ForecastCurrent';
import ForecastDaily from '../../segments/ForecastDaily';

const Forecast = () => {

  return (
    <div id='page-container weather'>
      <div id='content-wrap' className='Weather'>
        <>
          <h4 className='WeatherHead box mt-3'>Weather Report</h4>
          <ForecastCurrent />
          <ForecastDaily />
        </>
      </div>
    </div>
  );
};

export default (Forecast)
