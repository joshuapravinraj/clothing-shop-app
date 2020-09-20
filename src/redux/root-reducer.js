import { combineReducers } from 'redux';

// Import reducers
import userReducer from './user/user.reducer';

export default combineReducers ({
    user: userReducer
})

