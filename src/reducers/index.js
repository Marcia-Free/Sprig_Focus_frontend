import { combineReducers } from 'redux'
import currentUserReducer from './currentUser'
import goalsReducer from './goals'

export default combineReducers({
  currentUser: currentUserReducer,
  goals: goalsReducer
})