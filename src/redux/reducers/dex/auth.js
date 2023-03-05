import { getCookie, isAuthenticated } from "../../../utils/Helper";
import ActionTypes from "../../actions/dex/actionTypes";

const INITIAL_STATE = {
    isAuthenticated : !isAuthenticated('dex_access_token') ? false : true,
    accessToken : !isAuthenticated('dex_access_token') ? null : getCookie('dex_access_token'),
    error : null ,
}

export default (state=INITIAL_STATE , action) => {
    switch(action.type){
        case ActionTypes.DexSignIn:
            return ({
                ...state,
                isAuthenticated : true,
                accessToken : action.payload.accessToken
            })
        case ActionTypes.DexSignOut : 
            return ({
                ...state,
                isAuthenticated : false ,
                accessToken : null
            })
        default :
            return state ;
    }
}