// weather.js
// *************************************************************************
// *****  Client side - client/src/actions/weather.js                  *****
// *****  Defines what actions can be performed on weather routes      *****
// *****  Note: there is only one weather action creator (getWeather)  *****
// *****        It will dispatch one of two actions (type/payload):    *****
// *****        Success: type = GET_FORECAST, payload = res.data       *****
// *****        Fail: type = FORECAST_ERROR, payload not required      *****
// *************************************************************************

// node modules
import axios from 'axios';
import chalk from 'chalk';

// local modules
import {
  GET_FORECAST,
  FORECAST_ERROR
} from './types';

// Action Creator
// *********************************************************************
// *****  getWeather  -- retrieve and load forecast data.          *****
// *****  matches to: server/routes/api/forecast GET api/forecast  *****
// *****              & src/reducers/forecast.js/GET_FORECAST      *****
// *********************************************************************
export const getWeather = () => async dispatch => {
  try {
    // get weather forecast
    const res = await axios.get(`/api/weather`);

    console.log(chalk.yellow('action creator getWeather ', res));
    
    // SUCCESS - set the action -- type = GET_WEATHER & payload = res.data (the forecast)
    dispatch({
      type: GET_FORECAST,
      payload: res.data
    });
  } catch (err) {
    // FAIL - set the action FORECAST_ERROR, no payload to pass
    dispatch({
      type: FORECAST_ERROR
    });
  };
};