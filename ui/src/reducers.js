import { authReducer } from './auth/auth-reducer'
import { filterReducer } from './criteria-filter/filter-reducer'
import { combineReducers } from 'redux';

export default combineReducers({
  auth: authReducer,
  criteria: filterReducer 
})