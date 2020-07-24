// types.js
//  *******************************************************************
//  *****  Client side -- client/frontend/src/actions/types.js    *****
//  *****  This is a of all the possible action types in the app  *****
//  *******************************************************************

// Types related to error alerts (redux/actions/alert.js)
export const SET_ALERT = 'SET_ALERT'
export const REMOVE_ALERT = 'REMOVE_ALERT'
// Types related to authorization/authentication (redux/actions/auth.js)
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAIL = 'REGISTER_FAIL'
export const USER_LOADED = 'USER_LOADED'
export const AUTH_ERROR = 'AUTH_ERROR'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const LOGOUT = 'LOGOUT'
export const RESET_REQUESTED_SUCCESS = 'RESET_REQUESTED_SUCCESS'
export const RESET_REQUESTED_FAIL = 'RESET_REQUESTED_FAIL'
export const RESET_TOKEN_SUCCESS = 'RESET_TOKEN_SUCCESS'
export const RESET_TOKEN_FAIL = 'RESET_TOKEN_FAIL'
export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS'
export const PASSWORD_RESET_FAIL = 'PASSWORD_RESET_FAIL'
// Types related to forecast (redux/actions/forecast.js)
export const GET_FORECAST = 'GET_FORECAST'
export const FORECAST_ERROR = 'FORECAST_ERROR'
// Types related to favorites (redux/actions/favorite.js)
export const CLEAR_FAVORITE = 'CLEAR_FAVORITE'
export const GET_FAVORITE = 'GET_FAVORITE'
export const GET_FAVORITES = 'GET_FAVORITES'
export const UPDATE_FAVORITE = 'UPDATE_FAVORITE'
export const FAVORITE_ERROR = 'FAVORITE_ERROR'
export const ACCOUNT_DELETED = 'ACCOUNT_DELETED'