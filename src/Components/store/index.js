import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import userReducer from './user';

const reducer = combineReducers({
  // here i am going to add reducers for future scope
})
const store = configureStore({
  reducer: {
    user: userReducer
  }
})
export default store;