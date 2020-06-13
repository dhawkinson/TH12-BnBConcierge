// favorite.js
//**********************************************************************
//*****  Client side - client/src/actions/favorite.js              *****
//*****  Defines what actions can be performed on favorite routes  *****
//**********************************************************************

// node modules
import axios from 'axios';

// local modules
import { setAlert } from './alert';
import {
  CLEAR_FAVORITE,
  GET_FAVORITE,
  GET_FAVORITES,
  UPDATE_FAVORITE,
  FAVORITE_ERROR,
  ACCOUNT_DELETED
} from './types';

// borrow from MERNStack profiles
