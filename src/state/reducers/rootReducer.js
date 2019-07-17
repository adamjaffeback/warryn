import { combineReducers } from 'redux';
import repos from './reposReducer';
import ui from './uiReducer';
import user from './userReducer';

export default combineReducers({
  repos,
  ui,
  user,
});
