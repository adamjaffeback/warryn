import { combineReducers } from 'redux';
import issues from './issuesReducer';
import repos from './reposReducer';
import ui from './uiReducer';
import user from './userReducer';

export default combineReducers({
  issues,
  repos,
  ui,
  user,
});
