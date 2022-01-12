import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
  player: playerReducer,
  error: errorReducer,
  auth: authReducer

});