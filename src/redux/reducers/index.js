import  { combineReducers } from 'redux' ;

import exReducer from './ex' ;
import dexReducer from './dex';

export default combineReducers({
    ex : exReducer,
    dex : dexReducer,
});