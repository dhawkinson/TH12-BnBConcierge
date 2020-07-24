// forecast.js
//**********************************************************************
//*****  Client side - client/src/actions/forecast.js              *****
//*****  Defines what actions can be performed on forecast routes  *****
//**********************************************************************

// node modules
import axios from 'axios';

// local modules
import {
  GET_FORECAST,
  FORECAST_ERROR
} from './types';

export const getForecast = () => async dispatch => {
  try {
    // get the forecast
    const res = await axios.get(`/api/forecast`);
    // SUCCESS - set the action type to USER_LOADED & pass the payload
    dispatch({
      type: GET_FORECAST,
      payload: res.data
    });
  } catch (err) {
    // FAIL - set the action type to FORECAST_FAIL, no payload to pass
    dispatch({
      type: FORECAST_ERROR
    });
  };
};