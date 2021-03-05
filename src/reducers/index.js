import { combineReducers } from 'redux'
import currentUserReducer from './currentUser'

import goalsReducer from './goals'
import tasksReducer from './tasks'
import songsReducer from './songs'

export default combineReducers({
  currentUser: currentUserReducer,
  goals: goalsReducer,
  tasks: tasksReducer,
  songs: songsReducer
})