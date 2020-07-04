// favorite.js
// *******************************************************************
// *****  Client side -- client/src/redux/reducers/favorite.js   *****
// *****  Favorite Reducer - manages state on favorites routes   *****
// *****  Breaking it down:                                      *****
// *****        Set the initialState ( the default )             *****
// *****        Then, for each action dispatched to the reducer  *****
// *****        destucture the action into the;                  *****
// *****        type -- (what is happening)                      *****
// *****        payload -- (the resulting data)                  *****
// *****        then reset the state (for passing as props)      *****
// *******************************************************************

import { 
  GET_FAVORITE,
  UPDATE_FAVORITE,
  CLEAR_FAVORITE,
  FAVORITE_ERROR,
  GET_FAVORITES
 } from '../actions/types'

const initialState = {
  favorite: null,
  favorites: [],
  loading: true,
  error: {}
}

export default function(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_WEATHER:
      return {
        ...state,
        forecast: payload,
        loading: false
      }
    case GET_FAVORITE:
    case UPDATE_FAVORITE:
      return {
        ...state,
        favorite: payload,
        loading: false
      }
    case GET_FAVORITES:
      return {
        ...state,
        favorites: payload,
        loading: false
      }
    case WEATHER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        forecast: null
      }
    case FAVORITE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        favorite: null
      }
    case CLEAR_FAVORITE:
      return {
        ...state,
        favorite: null,
        repos: [],
        loading:false
      }
    default:
      return state
  }
}