import  { combineReducers } from 'redux' ;

import authReducer from './auth' ;
import userReducer from './user' ;
import tokenReducer from './token' ;
import notificationReducer from './notification' ;

export default combineReducers({
    auth : authReducer,
    user : userReducer,
    token : tokenReducer,
    notification : notificationReducer
});